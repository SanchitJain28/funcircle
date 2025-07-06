"use client";

import { createClient } from "@/app/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calendar,
  MapPin,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";

const supabase = createClient();

export interface Subscription {
  id: string;
  user_id: string;
  venue_id: number;
  playing_date_and_time: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export default function SuccessSubscriptionPage() {
  const searchParams = useSearchParams();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubscription = async () => {
    try {
      setLoading(true);
      setError(null);

      const subscriptionId = searchParams.get("id");
      if (!subscriptionId) {
        setError("No subscription ID provided");
        return;
      }

      const { data, error: supabaseError } = await supabase
        .from("subscription")
        .select("*")
        .eq("id", subscriptionId)
        .single();

      if (supabaseError) {
        setError(supabaseError.message);
        return;
      }

      setSubscription(data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch subscription details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubscription();
  }, [searchParams]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP 'at' p");
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-32" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={handleSubscription} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No subscription found with the provided ID.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Subscription Details</CardTitle>
              <CardDescription>
                View your subscription information and status
              </CardDescription>
            </div>
            <Badge className={getStatusColor(subscription.type)}>
              {subscription.type.charAt(0).toUpperCase() +
                subscription.type.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <User className="h-4 w-4" />
                Subscription ID
              </div>
              <p className="font-mono text-sm bg-muted p-2 rounded">
                {subscription.id}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Venue ID
              </div>
              <p className="text-lg font-semibold">#{subscription.venue_id}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Playing Date & Time
              </div>
              <p className="text-lg font-semibold">
                {formatDate(subscription.playing_date_and_time)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CheckCircle className="h-4 w-4" />
                Status
              </div>
              <Badge
                className={getStatusColor(subscription.type)}
                variant="outline"
              >
                {subscription.type.charAt(0).toUpperCase() +
                  subscription.type.slice(1)}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Clock className="h-4 w-4" />
                Created
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(subscription.created_at)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Clock className="h-4 w-4" />
                Last Updated
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(subscription.updated_at)}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t">
            <div className="flex gap-3">
              <Button className="flex-1">Modify Subscription</Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Cancel Subscription
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
