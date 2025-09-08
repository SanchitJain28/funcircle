import { useVenueGames } from "@/hooks/useVenueInfo"
import type React from "react"
import { forwardRef, type HTMLAttributes } from "react"

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
)

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/60 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
    {...props}
  />
))
Card.displayName = "Card"

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-4 sm:p-6 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"

interface ChatRoomVenueGamesProps {
  params: { id: string }
}

export default function ChatRoomVenueGames({ params }: ChatRoomVenueGamesProps) {
  const { data: venueGamesData, isPending } = useVenueGames(params.id)

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
    return new Date(dateString).toLocaleString("en-US", options)
  }

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "soldout":
        return {
          badge: "bg-red-500/20 text-red-400 border-red-500/30",
          button: "bg-gray-700 text-gray-400 cursor-not-allowed",
          buttonText: "Sold Out",
        }
      case "closed":
        return {
          badge: "bg-gray-500/20 text-gray-400 border-gray-500/30",
          button: "bg-gray-800 text-gray-500 cursor-not-allowed",
          buttonText: "Closed",
        }
      default: // 'live'
        return {
          badge: "bg-green-500/20 text-green-400 border-green-500/30",
          button: "bg-[#8A36EB] hover:bg-[#7828d1] transition-colors",
          buttonText: "Book Now",
        }
    }
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-6 sm:p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#8A36EB] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-neutral-400 font-medium">Loading games...</p>
        </div>
      </div>
    )
  }

  if (!isPending && venueGamesData?.length == 0) {
    return null
  }

  return (
    <div className="bg-gradient-to-br from-neutral-900/80 to-black/90 backdrop-blur-sm antialiased text-neutral-300 p-4 sm:p-6 lg:p-8 border border-neutral-800/60 rounded-2xl my-4 shadow-2xl">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
            Now Playing
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            Check out the latest games and events happening at our venue.
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4 lg:gap-5">
          {venueGamesData?.map((game) => {
            const status = getStatusStyles(game.ticketstatus)
            return (
              <Card
                key={game.id}
                className="group hover:border-[#8A36EB]/50 hover:bg-neutral-800/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-5 lg:p-6 gap-3 sm:gap-4">
                  {/* Left content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 group-hover:text-[#F26610] transition-colors duration-300 line-clamp-2">
                      {game.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400">
                      <CalendarIcon className="w-4 h-4 flex-shrink-0 text-[#8A36EB]" />
                      <span className="font-medium">{formatDate(game.startdatetime)}</span>
                    </div>
                  </div>

                  {/* Right content - price and status */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 lg:gap-6">
                    <div className="text-right">
                      <p className="text-lg sm:text-xl font-bold text-white">
                        ₹{Number.parseFloat(game.price).toFixed(2)}
                      </p>
                      <p className="text-xs text-neutral-500">per person</p>
                    </div>

                    <span
                      className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border backdrop-blur-sm ${status.badge} transition-all duration-300`}
                    >
                      {game.ticketstatus.charAt(0).toUpperCase() + game.ticketstatus.slice(1)}
                    </span>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
