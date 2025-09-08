"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Share2, Check } from "lucide-react"

interface GroupInvitePopupProps {
  groupName?: string
  inviteLink?: string
}

export function GroupInvitePopup({
  groupName = "Theater Group",
  inviteLink = "https://app.example.com/invite/abc123xyz",
}: GroupInvitePopupProps) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join ${groupName}`,
          text: `You're invited to join ${groupName}!`,
          url: inviteLink,
        })
      } catch (err) {
        console.error("Failed to share:", err)
      }
    } else {
      // Fallback to copy
      handleCopy()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button  className="text-white hover:opacity-90 w-full border border-zinc-700 transition-opacity">
          <Share2 className="w-4 h-4 mr-2" />
          Share Invite Link
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        style={{
          backgroundColor: "#000000",
          borderColor: "#333333",
          color: "#F9F9F9",
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: "#F9F9F9" }}>Invite to {groupName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm" style={{ color: "#F9F9F9" }}>
            Share this link with friends to invite them to your group:
          </p>

          <div className="flex items-center space-x-2">
            <Input
              value={inviteLink}
              readOnly
              className="flex-1"
              style={{
                backgroundColor: "#1a1a1a",
                borderColor: "#333333",
                color: "#F9F9F9",
              }}
            />
            <Button
              size="sm"
              onClick={handleCopy}
              style={{
                backgroundColor: copied ? "#22c55e" : "#8A36EB",
                color: "#F9F9F9",
              }}
              className="hover:opacity-90 transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleShare}
              className="flex-1"
              style={{
                backgroundColor: "#F26610",
                color: "#F9F9F9",
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
              style={{
                borderColor: "#333333",
                color: "#F9F9F9",
                backgroundColor: "transparent",
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
