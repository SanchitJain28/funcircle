"use client";
import { useTicketmembers } from "@/hooks/useTicketInfo";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Crown, Shield, User } from "lucide-react";
import { formatLevelByName } from "@/utils/formatLevelBynumber";

interface Member {
  name: string;
  image: string | null;
  user_id: string;
  adminsetlevel: string;
}

export default function TicketMembers({
  params,
}: {
  params: { ticket_id: number };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isError, isPending } = useTicketmembers(params.ticket_id);

  const getAdminIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "admin":
        return <Crown className="w-3 h-3" />;
      case "moderator":
        return <Shield className="w-3 h-3" />;
      default:
        return <User className="w-3 h-3" />;
    }
  };

  const getAdminColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "admin":
        return "bg-[#F26610] text-[#F9F9F9] hover:bg-[#FFD580]";
      case "moderator":
        return "bg-[#8A36EB] text-[#F9F9F9] hover:bg-[#B58CF4]";
      default:
        return "bg-gray-600 text-[#F9F9F9] hover:bg-gray-500";
    }
  };

  if (isError) {
    return (
      <div className="p-4 rounded-lg bg-[#E74C3C] text-[#F9F9F9]">
        <p>Something went wrong loading members</p>
      </div>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {data && data.length> 1 && <SheetTrigger asChild>
        <div className="pr-12">
          <Button
            variant="outline"
            className="bg-[#F26610] mx-6 mb-3  w-full text-[#F9F9F9] border-[#F26610] hover:bg-[#FFD580] hover:text-[#000000] transition-colors"
          >
            <Users className="w-4 h-4 mr-2" />
            View Members
            {data && (
              <Badge className="ml-2 bg-[#8A36EB] text-[#F9F9F9]">
                {data.length}
              </Badge>
            )}
          </Button>
        </div>
      </SheetTrigger>}

      <SheetContent
        side="bottom"
        className="bg-[#000000] border-t border-[#8A36EB] text-[#F9F9F9] max-h-[80vh] overflow-y-auto"
      >
        <SheetHeader className="pb-6">
          <SheetTitle className="text-[#F9F9F9] text-xl font-semibold">
            Ticket Members
          </SheetTitle>
          <SheetDescription className="text-[#F9F9F9]/70">
            {isPending
              ? "Loading members..."
              : `${data?.length || 0} members in this ticket`}
          </SheetDescription>
        </SheetHeader>

        {isPending ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F26610]"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {data?.map((member: Member) => (
              <div
                key={member.user_id}
                className="flex items-center space-x-4 p-4 rounded-lg bg-[#000000] border border-[#8A36EB]/20 hover:border-[#8A36EB]/40 transition-colors"
              >
                <Avatar className="h-12 w-12 border-2 border-[#F26610]">
                  <AvatarImage
                    src={member.image || undefined}
                    alt={member.name}
                  />
                  <AvatarFallback className="bg-[#8A36EB] text-[#F9F9F9] font-semibold">
                    {member.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <h3 className="text-[#F9F9F9] font-medium truncate">
                    {member.name}
                  </h3>
                  
                </div>

                <Badge
                  className={`${getAdminColor(member.adminsetlevel)} flex items-center gap-1 px-3 py-1`}
                >
                  {getAdminIcon(member.adminsetlevel)}
                  {formatLevelByName(member.adminsetlevel)}
                </Badge>
              </div>
            ))}

            {data?.length === 0 && (
              <div className="text-center py-8 text-[#F9F9F9]/60">
                <Users className="w-12 h-12 mx-auto mb-4 text-[#8A36EB]" />
                <p>No members found in this ticket</p>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
