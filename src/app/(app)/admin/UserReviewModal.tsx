"use client";

import React, { useState } from "react";
import { Copy, Check, Share2, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface UserReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewLink?: string;
}

export function UserReviewModal({
  isOpen,
  onClose,
  reviewLink,
}: UserReviewModalProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Example review link - in a real app, this would be dynamic

  const copyToClipboard = async () => {
    try {
      if (!reviewLink) throw new Error("No review link provided");
      await navigator.clipboard.writeText(reviewLink);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The review link has been copied to your clipboard.",
      });

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const openInNewTab = () => {
    window.open(reviewLink, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Review Link
          </DialogTitle>
          <DialogDescription>
            Share this link with others so they can leave reviews about your
            experience.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input value={reviewLink} readOnly className="flex-1" />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={copyToClipboard}
              className="px-3"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={copyToClipboard}
              className="flex-1"
              variant={copied ? "secondary" : "default"}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>

            <Button
              onClick={openInNewTab}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Link
            </Button>
          </div>

          <div className="text-sm text-muted-foreground text-center pt-2">
            Anyone with this link can leave a review about your experience
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
