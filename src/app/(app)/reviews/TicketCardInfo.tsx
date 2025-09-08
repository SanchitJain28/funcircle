import { Calendar, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"
import { TicketInfo } from "@/app/types"

interface TicketCardProps {
  ticketInfo: TicketInfo 
}

export function TicketCard({ ticketInfo }: TicketCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <Card className="w-full max-w-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-balance leading-tight">{ticketInfo.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {/* Date and Time - Combined into one line */}
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span>
            {formatDate(ticketInfo.startdatetime)} • {formatTime(ticketInfo.startdatetime)}
          </span>
        </div>

        {/* Location */}
        {(ticketInfo.location) && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1 truncate">{ticketInfo.location || ticketInfo.venue?.venue_name}</div>
          </div>
        )}

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Until {formatTime(ticketInfo.enddatetime)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
