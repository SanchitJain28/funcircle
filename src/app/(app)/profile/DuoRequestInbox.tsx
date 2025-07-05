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
import { Skeleton } from "@/components/ui/skeleton";
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

interface DuoRequest {
  id: string;
  sender_name: string;
  sender_avatar?: string;
  sender_email: string;
  message?: string;
  created_at: string;
  status: "pending" | "accepted" | "rejected";
  profiles: {
    first_name: string;
  };
}

export default function DuoRequestInbox() {
  const { user, requests: initialRequest } = useAuth();
  const [loading, setLoading] = useState(initialRequest ? false : true);
  const [requests, setRequests] = useState<DuoRequest[]>(
    initialRequest ? initialRequest : []
  );
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!initialRequest) {
      const checkForDuoRequests = async () => {
        if (!user?.uid) return;

        try {
          const { data } = await axios.post("/api/check-duo-requests", {
            user_id: user.uid,
          });
          setRequests(data.data || []);
        } catch (error) {
          console.error("Failed to fetch duo requests:", error);
        } finally {
          setLoading(false);
        }
      };

      checkForDuoRequests();
    }
  }, [user?.uid]);

  useEffect(() => {
    if (searchParams.get("isopmod")) {
      setOpen(true);
    }
  }, []);

  const handleRequestAction = async (
    requestId: string,
    action: "accept" | "reject"
  ) => {
    setActionLoading(requestId);
    try {
      await axios.post("/api/handle-duo-request", {
        request_id: requestId,
        action,
        user_id: user?.uid,
      });

      // Update the request status locally
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId
            ? { ...req, status: action === "accept" ? "accepted" : "rejected" }
            : req
        )
      );
    } catch (error) {
      console.error(`Failed to ${action} request:`, error);
    } finally {
      setActionLoading(null);
    }
  };

  const pendingRequests = requests.filter((req) => req.status === "pending");
  const hasRequests = requests.length > 0;
  const hasPendingRequests = pendingRequests.length > 0;

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
        <Skeleton className="h-10 w-32 bg-gray-700" />
      </div>
    );
  }

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
            requests.map((request) => (
              <Card
                key={request.id}
                className="relative bg-gray-50 border-gray-200"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          {request.profiles.first_name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">
                          {request.profiles.first_name}
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

                {/* {request.message && (
                  <CardContent className="pt-0 pb-3">
                    <p className="text-sm text-muted-foreground">
                      "{request.message}"
                    </p>
                  </CardContent>
                )} */}

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
                          onClick={() =>
                            handleRequestAction(request.id, "reject")
                          }
                          disabled={actionLoading === request.id}
                          className="h-8 border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Decline
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleRequestAction(request.id, "accept")
                          }
                          disabled={actionLoading === request.id}
                          className="h-8 bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Accept
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
