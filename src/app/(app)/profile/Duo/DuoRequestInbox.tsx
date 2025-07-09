"use client";

import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Check, X, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { DuoRequest } from "@/app/types";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetUserWithDuosResponse } from "@/app/Contexts/AuthContext";

export interface MinimalUserProfile {
  user_id: string;
  first_name: string | null;
  email: string | null;
  usersetlevel: string | null;
  adminsetlevel: string | null;
}

export default function DuoRequestInbox({
  onAccept,
}: {
  onAccept: (change: boolean) => void;
}) {
  const { user, requests: initialRequest } = useAuth();
  const [requests, setRequests] = useState<DuoRequest[]>(
    initialRequest ? initialRequest : []
  );
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  //
  const [partner, setPartner] = useState<DuoRequest | null>(null);

  // Mutation for handling duo requests
  const handleRequestMutation = useMutation({
    mutationFn: async ({
      requestId,
      action,
      userId,
    }: {
      requestId: string;
      action: "accepted" | "declined";
      userId: string;
    }) => {
      const { data } = await axios.post("/api/handle-duo-invites", {
        status: action,
        user_id: userId,
        duo_id: requestId,
      });

      console.log(data);
      return { data, action, requestId };
    },
    onMutate: async ({ requestId, action }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ["duo-requests", user?.uid],
      });

      // Snapshot the previous value
      const previousRequests = requests;

      // Optimistically update the UI
      setRequests((prev) =>
        prev.map((req) =>
          req.duo_id === requestId
            ? {
                ...req,
                status: action === "accepted" ? "accepted" : "declined",
              }
            : req
        )
      );

      return { previousRequests };
    },
    onSuccess: ({ action, requestId }) => {
      if (action === "accepted") {
        toast.success("Request accepted!");
        setOpen(false);
        onAccept(true);

        // Update any cached duo-related data
        // queryClient.invalidateQueries({ queryKey: ["duo-partner", user?.uid] });
        // queryClient.invalidateQueries({
        //   queryKey: ["user-profile", user?.uid],
        // });
      } else {
        toast.success("Request declined");
      }

      // Update the requests cache if you're using React Query for requests
      queryClient.setQueryData(
        ["userExp", user?.uid],
        (oldData: GetUserWithDuosResponse) => {
          const updatedDuos =
            oldData?.duos.map((req) =>
              req.duo_id === requestId
                ? {
                    ...req,
                    status: action === "accepted" ? "accepted" : "declined",
                  }
                : req
            ) || [];
          return {
            profile: oldData.profile,
            duos: updatedDuos,
            current_duo: action === "accepted" ? partner : null,
          };
        }
      );
      const data = queryClient.getQueryData(["userExp", user?.uid]);
      console.log("queryData", data);
    },
    onError: (error, { action }, context) => {
      // Rollback optimistic update
      if (context?.previousRequests) {
        setRequests(context.previousRequests);
      }

      console.error(`Failed to ${action} request:`, error);
      toast.error(`Failed to ${action} request. Please try again.`);
    },
  });

  // Enhanced request handler using mutation
  const handleRequestAction = (
    requestId: string,
    action: "accepted" | "declined"
  ) => {
    if (!user?.uid) return;

    handleRequestMutation.mutate({
      requestId,
      action,
      userId: user.uid,
    });
  };

  useEffect(() => {
    setRequests(initialRequest);
  }, [user?.uid, initialRequest]);

  useEffect(() => {
    if (searchParams.get("isopmod")) {
      setOpen(true);
    }
  }, []);

  if (!user) return;

  const pendingRequests = requests.filter((req) => req.status === "pending");
  const hasRequests = requests.length > 0;
  const hasPendingRequests = pendingRequests.length > 0;

  if (!requests || requests.length === 0) return;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative w-full mb-2 bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:border-purple-500"
        >
          <Bell className="h-4 w-4 mr-2" />
          Duo Requests
          {hasPendingRequests && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500"
            >
              {pendingRequests.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white border-gray-700">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <Users className="h-5 w-5 text-purple-600" />
            Duo Requests
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {hasRequests
              ? `You have ${requests.length} duo request${requests.length === 1 ? "" : "s"}`
              : "No duo requests at the moment"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!hasRequests ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50 text-gray-400" />
              <p className="text-gray-700">No duo requests yet</p>
              <p className="text-sm text-gray-500">
                When someone sends you a duo request, it will appear here.
              </p>
            </div>
          ) : (
            requests.map((request, index: number) => (
              <Card key={index} className="relative bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {request.other_user.first_name
                            ?.charAt(0)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">
                          {request.other_user.first_name}
                        </CardTitle>
                        <CardDescription>
                          Wants to be your duo partner
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={
                        request.status === "pending"
                          ? "secondary"
                          : request.status === "accepted"
                            ? "default"
                            : "destructive"
                      }
                      className={
                        request.status === "pending"
                          ? "bg-purple-100 text-purple-800 border-purple-200"
                          : request.status === "accepted"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-red-100 text-red-800 border-red-200"
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {new Date(request.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>

                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            handleRequestAction(request.duo_id, "declined");
                            setPartner(request);
                          }}
                          disabled={handleRequestMutation.isPending}
                          className="h-8 border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Decline
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            handleRequestAction(request.duo_id, "accepted");
                            setPartner(request);
                          }}
                          disabled={handleRequestMutation.isPending}
                          className="h-8 bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          {handleRequestMutation.isPending
                            ? "Processing..."
                            : "Accept"}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
