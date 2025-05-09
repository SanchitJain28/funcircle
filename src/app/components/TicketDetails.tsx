import React from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { CalendarIcon, Clock, MapPin, Ticket } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import { Separator } from "@/components/ui/separator"
  import { Badge } from "@/components/ui/badge"
  
  interface TicketDetailsProp {
    title: string
    description: string
    price: string
    startdatetime: string | Date |null
    location: string
    maps_link: string
    venue_name: string
  }
  
  export default function TicketDetails({
    title,
    
    price,
    startdatetime,
    location,
    maps_link,
    venue_name,
  }: TicketDetailsProp) {
    // Format the date and time
    const formatDate = (dateTime: string | Date) => {
      const date = new Date(dateTime)
      return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    }
  
    const formatTime = (dateTime: string | Date) => {
      const date = new Date(dateTime)
      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(date)
    }
  
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <p className="text-purple-400 text-sm font-medium flex items-center hover:text-purple-300 transition-colors cursor-pointer">
            View Details
          </p>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-md md:max-w-lg bg-zinc-900 border-zinc-700">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 -mx-6 -mt-6 p-6 rounded-t-lg">
            <AlertDialogHeader className="text-left">
              <Badge className="bg-white/20 text-white hover:bg-white/30 mb-2 backdrop-blur-sm">
                <Ticket className="w-3 h-3 mr-1" />
                Event Ticket
              </Badge>
              <AlertDialogTitle className="text-white text-2xl font-bold">{title}</AlertDialogTitle>
            </AlertDialogHeader>
          </div>
  
          <div className="py-4 space-y-4">
  
            <div className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
              <div className="flex items-start">
                <div className="bg-purple-600/20 p-2 rounded-full mr-3">
                  <CalendarIcon className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-zinc-400 text-xs">Date</p>
                  <p className="text-white font-medium">{startdatetime ? formatDate(startdatetime) : "N/A"}</p>
                </div>
              </div>
  
              <div className="flex items-start">
                <div className="bg-purple-600/20 p-2 rounded-full mr-3">
                  <Clock className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-zinc-400 text-xs">Time</p>
                  <p className="text-white font-medium">{startdatetime ? formatTime(startdatetime) : "N/A"}</p>
                </div>
              </div>
  
              <div className="flex items-start">
                <div className="bg-purple-600/20 p-2 rounded-full mr-3">
                  <MapPin className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-zinc-400 text-xs">Venue</p>
                  <p className="text-white font-medium">{venue_name}</p>
                  <p className="text-zinc-400 text-sm">{location}</p>
                </div>
              </div>
            </div>
  
            <div className="flex justify-between items-center">
              <div>
                <p className="text-zinc-400 text-xs">Price</p>
                <p className="text-white text-2xl font-bold">₹{price} <span className="text-sm text-zinc-500">Per ticket</span></p>
              </div>
              <a href={maps_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                <Button
                  variant="outline"
                  className="border-purple-600 text-purple-400 hover:bg-purple-600/20 hover:text-purple-300"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  View on Map
                </Button>
              </a>
            </div>
          </div>
  
          <Separator className="bg-zinc-800" />
  
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700">
              Close
            </AlertDialogCancel>
            <AlertDialogAction className="bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700">
              Book Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  