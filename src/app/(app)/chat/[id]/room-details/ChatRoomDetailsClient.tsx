"use client"

import type { ChatRoom } from "@/app/types"
import CustomHeader from "@/components/header-footers/CustomHeader"
import { useChatRoomDetails } from "@/hooks/useChat"
import { generateAvatarUrl } from "@/utils/AvatarUrlMaker"
import { AlertTriangle, ArrowLeft, Bell, Calendar, Hash, Info, LogOut,  Users } from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import ChatRoomMembers from "./ChatRoomMembers"
import ChatRoomVenueGames from "./ChatRoomVenueGames"
import { GroupInvitePopup } from "./GroupInvitePopup"

export default function ChatRoomDetailsClient({
  params,
}: {
  params: { id: string }
}) {
  const { data: chatRoomDetails, isError, isPending } = useChatRoomDetails(params.id)

  const LoadingSkeleton = () => (
    <div className="w-full max-w-4xl mx-auto animate-pulse p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center space-y-6 sm:space-y-8">
        <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-neutral-700 rounded-full"></div>
        <div className="space-y-3 w-full max-w-md text-center">
          <div className="h-6 sm:h-8 bg-neutral-700 rounded-lg w-3/4 mx-auto"></div>
          <div className="h-4 bg-neutral-700 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-neutral-700 rounded w-2/3 mx-auto"></div>
        </div>
      </div>
      <div className="mt-8 sm:mt-12 space-y-4">
        <div className="h-5 bg-neutral-700 rounded w-full"></div>
        <div className="h-5 bg-neutral-700 rounded w-5/6"></div>
        <div className="h-5 bg-neutral-700 rounded w-4/5"></div>
      </div>
      <div className="mt-8 sm:mt-12 grid gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 sm:h-20 bg-neutral-700 rounded-xl w-full"></div>
        ))}
      </div>
    </div>
  )

  const ErrorDisplay = () => (
    <div className="text-center p-6 sm:p-8 lg:p-12 bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-neutral-800/60 flex flex-col items-center gap-6 max-w-md mx-auto">
      <AlertTriangle className="w-16 h-16 sm:w-20 sm:h-20 text-red-500" />
      <div className="space-y-3">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-100">Oops! Something went wrong.</h2>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          We couldn&apos;t load the chat room details. Please try again later.
        </p>
      </div>
    </div>
  )

  return (
    <>
      <CustomHeader />
      <div className="bg-gradient-to-br from-black via-neutral-950 to-black min-h-screen text-white font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {isPending && <LoadingSkeleton />}
          {isError && <ErrorDisplay />}
          {chatRoomDetails && !isPending && !isError && <DetailCard chatRoom={chatRoomDetails} />}
        </div>
      </div>
    </>
  )
}

interface DetailCardProps {
  chatRoom: ChatRoom
}

interface ActionItemProps {
  icon: React.ReactNode
  text: string
  color: string
  hoverColor: string
  isDestructive?: boolean
}

const ActionItem: React.FC<ActionItemProps> = ({ icon, text, color, hoverColor, isDestructive = false }) => (
  <li>
    <button
      className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300 ${color} ${hoverColor} hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm border border-transparent hover:border-neutral-700/50`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className={`font-semibold text-sm sm:text-base ${isDestructive ? "" : "text-neutral-200"}`}>{text}</span>
    </button>
  </li>
)

const DetailCard: React.FC<DetailCardProps> = ({ chatRoom }) => {
  const { name, sport_type, member_count, description, created_by, created_at, id, venue_id } = chatRoom

  const router = useRouter()
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const size = 128
  const src = generateAvatarUrl(name ?? "", { size, rounded: true })

  return (
    <div className="w-full max-w-5xl mx-auto">
      <button
        onClick={() => router.push(`/chat/${id}`)}
        className="flex items-center py-3 sm:py-4 px-2 gap-2 text-neutral-400 hover:text-white transition-all duration-300 text-sm sm:text-base font-medium group mb-4 sm:mb-6"
      >
        <ArrowLeft size={18} className="sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Back to Chat</span>
      </button>

      <div className="bg-gradient-to-br from-neutral-900/80 to-black/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-neutral-800/60 overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-12">
          <header className="flex flex-col items-center text-center">
            <div className="relative mb-6 sm:mb-8">
              <img
                src={src || "/placeholder.svg"}
                alt={`${name} avatar`}
                className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full border-4 border-[#F26610] object-cover shadow-2xl transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.onerror = null
                  target.src = `https://placehold.co/128x128/1A1A1A/F9F9F9?text=ERR`
                }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#F26610]/20 to-[#8A36EB]/20 blur-xl -z-10"></div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-neutral-50 tracking-tight mb-4 sm:mb-6 text-balance">
              {name}
            </h1>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-neutral-400 text-sm sm:text-base">
              {sport_type && (
                <div className="flex items-center gap-2 bg-[#8A36EB]/20 text-[#B58CF4] px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold backdrop-blur-sm border border-[#8A36EB]/30">
                  <Hash size={16} className="sm:w-5 sm:h-5" />
                  <span>{sport_type}</span>
                </div>
              )}
              {member_count && (
                <div className="flex items-center gap-2 bg-neutral-800/50 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold backdrop-blur-sm border border-neutral-700/50">
                  <Users size={16} className="sm:w-5 sm:h-5" />
                  <span>{member_count} Members</span>
                </div>
              )}
            </div>
          </header>

          <section className="mt-8 sm:mt-12 text-center px-2 sm:px-4 lg:px-8">
            <h2 className="text-xs sm:text-sm font-bold uppercase text-neutral-500 tracking-wider mb-3 sm:mb-4">
              About this group
            </h2>
            <p className="text-neutral-300 leading-relaxed text-sm sm:text-base lg:text-lg max-w-3xl mx-auto text-pretty">
              {description}
            </p>
          </section>

          <section className="mt-8 sm:mt-12 text-xs sm:text-sm text-neutral-400 bg-black/40 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-neutral-800/50">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-2 sm:gap-3">
                <Info size={16} className="text-[#8A36EB] flex-shrink-0" />
                <span className="text-center sm:text-left">
                  Created by <strong className="font-semibold text-neutral-200">{created_by.first_name}</strong>
                </span>
              </div>
              <div className="hidden sm:block border-l border-neutral-700 h-6"></div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Calendar size={16} className="text-[#8A36EB] flex-shrink-0" />
                <span className="text-center sm:text-left">
                  Created on <strong className="font-semibold text-neutral-200">{formattedDate}</strong>
                </span>
              </div>
            </div>
          </section>
        </div>

        <footer className="bg-black/60 backdrop-blur-sm p-4 sm:p-6 lg:p-8 border-t border-neutral-800/50">
          <ul className="space-y-3 sm:space-y-4 max-w-md mx-auto">
            
            <GroupInvitePopup inviteLink={`${process.env.NEXT_PUBLIC_BASE_URL}/chat/${id}`}/>
            <ActionItem
              icon={<Bell size={20} />}
              text="Mute Notifications"
              color="text-yellow-400"
              hoverColor="hover:bg-yellow-400/10"
            />
            <ActionItem
              icon={<LogOut size={20} />}
              text="Leave Group"
              color="text-red-500"
              hoverColor="hover:bg-red-500/10"
              isDestructive={true}
            />
          </ul>
        </footer>

        <div className="space-y-6 sm:space-y-8">
          {/* Members list */}
          <div className="px-4 sm:px-8 lg:px-12">
            <ChatRoomMembers params={{ id }} />
          </div>

          {/* Venue games list */}
          <div className="px-4 sm:px-8 lg:px-12">
            <ChatRoomVenueGames params={{ id: String(venue_id) }} />
          </div>
        </div>

        
      </div>
    </div>
  )
}
