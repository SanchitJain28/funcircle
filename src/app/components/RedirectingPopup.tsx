"use client"

import React from "react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface RedirectPopupProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  ticketUrl: string
  title?: string
  description?: string
  buttonText?: string
}

export function RedirectPopup({
  isOpen = false,
  onOpenChange,
  ticketUrl = "/tickets",
  title = "Booking Confirmed!",
  description = "GO to your booked ticket",
  buttonText = "View Ticket",
}: RedirectPopupProps) {
  const router = useRouter()

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange?.(newOpen)
  }

  const handleRedirect = () => {
    router.push(ticketUrl)
    handleOpenChange(false)
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-lg font-medium pt-2">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center mt-4">
          <AlertDialogAction asChild>
            <a href="amazon.com" onClick={handleRedirect} className="w-full">
              {buttonText}
            </a>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
