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
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import CustomHeader from "@/components/header-footers/CustomHeader";

const supabase = createClient();

export interface Subscription {
  id: string;
  user_id: string;
  venue_id: number;
  playing_date_and_time: {
    playingDays: string[];
    playingTime: string;
  };
  type: string;
  created_at: string;
  updated_at: string;
  venues: Venue;
}

export interface Venue {
  id: number;
  created_at: string;
  venue_name: string;
  images: string[];
  maps_link: string;
  description: string;
  location: string;
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
        .select(
          `
          *,
          venues (
            *
          )
        `
        )
        .eq("id", subscriptionId)
        .single();

      if (supabaseError) {
        setError(supabaseError.message);
        return;
      }

      setSubscription(data);
    } catch (err) {
      console.error(err);
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
      return format(new Date(dateString), "MMM dd, yyyy 'at' h:mm a");
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button
            onClick={handleSubscription}
            variant="outline"
            className="w-full"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No subscription found with the provided ID.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <CustomHeader />
      <div className="max-w-2xl mx-auto space-y-6 p-4">
        {/* Success Header */}
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Subscription Confirmed!
          </h1>
          <p className="text-gray-600">
            Your subscription has been successfully created.
          </p>
        </div>

        {/* Subscription Status */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Subscription Status</CardTitle>
                <CardDescription>Current subscription details</CardDescription>
              </div>
              <Badge
                className={getStatusColor(subscription.type)}
                variant="outline"
              >
                {subscription.type.charAt(0).toUpperCase() +
                  subscription.type.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="h-4 w-4" />
                  Subscription ID
                </div>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded text-gray-800">
                  {subscription.id.slice(0, 8)}...
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  Created
                </div>
                <p className="text-sm font-medium">
                  {formatDate(subscription.created_at)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Venue Information */}
        {subscription.venues && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Venue Details</CardTitle>
              <CardDescription>Where you will be playing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {subscription.venues.venue_name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">
                      {subscription.venues.location}
                    </span>
                  </div>
                </div>

                {subscription.venues.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {subscription.venues.description}
                  </p>
                )}

                {subscription.venues.maps_link && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    asChild
                  >
                    <a
                      href={subscription.venues.maps_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      View on Maps
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Playing Schedule */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Playing Schedule</CardTitle>
            <CardDescription>Your selected days and time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  Playing Days
                </div>
                <div className="flex flex-wrap gap-2">
                  {subscription.playing_date_and_time.playingDays.map((day) => (
                    <Badge
                      key={day}
                      variant="secondary"
                      className="bg-blue-50 text-blue-700"
                    >
                      {day}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  Playing Time
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {subscription.playing_date_and_time.playingTime}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-6 text-sm text-gray-500">
          <p>Need help? Contact our support team for assistance.</p>
        </div>
      </div>
    </div>
  );
}
