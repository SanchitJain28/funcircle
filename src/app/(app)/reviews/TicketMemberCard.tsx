"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users } from "lucide-react"
import { StarRating } from "./StarRating"
import { TicketMemberNew } from "@/app/types"



interface TicketMemberCardProps {
  member: TicketMemberNew
  onMakeDuo?: (memberId: string) => void
  onRatingChange?: (memberId: string, rating: number) => void
}

export function TicketMemberCard({ member, onMakeDuo, onRatingChange }: TicketMemberCardProps) {
  const [currentRating, setCurrentRating] = useState(0)
  const [isDuoLoading, setIsDuoLoading] = useState(false)

  const handleMakeDuo = async () => {
    setIsDuoLoading(true)
    try {
      await onMakeDuo?.(member.user_id)
    } finally {
      setIsDuoLoading(false)
    }
  }

  const handleRatingChange = (rating: number) => {
    setCurrentRating(rating)
    onRatingChange?.(member.user_id, rating)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

//   const getLevelColor = (level: string) => {
//     const levelLower = level.toLowerCase()
//     if (levelLower.includes("admin") || levelLower.includes("high")) {
//       return "bg-red-100 text-red-800 border-red-200"
//     }
//     if (levelLower.includes("mod") || levelLower.includes("medium")) {
//       return "bg-yellow-100 text-yellow-800 border-yellow-200"
//     }
//     return "bg-green-100 text-green-800 border-green-200"
//   }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-[#8A36EB]/20 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-[#8A36EB]/20">
              <AvatarFallback className="bg-[#8A36EB]/10 text-[#8A36EB] font-semibold">
                {getInitials(member.first_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#8A36EB] transition-colors">
                {member.first_name}
              </h3>
              
            </div>
          </div>
          {member.tag && (
            <Badge variant="secondary" className="bg-[#8A36EB]/10 text-[#8A36EB] border-[#8A36EB]/20">
              {member.tag}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* User Levels */}
        <div className="">
          {/* <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">User Level:</span>
            <Badge className={cn("text-xs", getLevelColor(member.usersetlevel))}>{member.usersetlevel}</Badge>
          </div> */}
          {/* {member.adminsetlevel && (
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Admin Level:</span>
              <Badge className={cn("text-xs", getLevelColor(member.adminsetlevel))}>{member.adminsetlevel}</Badge>
            </div>
          )} */}
        </div>

        {/* Rating Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Rate this member:</label>
          <StarRating initialRating={currentRating} onRatingChange={handleRatingChange} size="md" />
          {currentRating > 0 && (
            <p className="text-xs text-gray-500">
              You rated {currentRating} star{currentRating !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Action Button */}
        <Button
          onClick={handleMakeDuo}
          disabled={isDuoLoading}
          className="w-full bg-[#8A36EB] hover:bg-[#8A36EB]/90 text-white font-medium transition-all duration-200 hover:shadow-md"
        >
          <Users className="w-4 h-4 mr-2" />
          {isDuoLoading ? "Creating Duo..." : "Make Duo"}
        </Button>
      </CardContent>
    </Card>
  )
}
