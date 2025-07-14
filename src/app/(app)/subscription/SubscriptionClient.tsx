'use client'

import { useAuth, useSubscription } from '@/hooks/useAuth'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Crown, Settings, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react'
import CustomHeader from '@/components/header-footers/CustomHeader'

export default function SubscriptionClient() {
  const { user } = useAuth()
  const router = useRouter()
  const { data, isError, isPending } = useSubscription({
    user_id: user?.uid ?? "",
    enabled: !!user?.uid,
  })

  useEffect(() => {
    if (!isPending && !data) {
      router.replace('/subscription/plans')
    }
  }, [isPending, data, router])

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <Skeleton className="h-8 w-3/4 bg-slate-700/50 mx-auto rounded-lg" />
              <Skeleton className="h-4 w-1/2 bg-slate-700/50 mx-auto mt-3 rounded-lg" />
            </CardHeader>
            <CardContent className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-slate-700/30 rounded-lg">
                  <Skeleton className="h-4 w-1/3 bg-slate-600/50 rounded" />
                  <Skeleton className="h-6 w-1/2 bg-slate-600/50 rounded" />
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-8">
              <Skeleton className="h-12 w-full bg-slate-700/50 rounded-lg" />
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-red-950/50 backdrop-blur-sm border-red-800/50 shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <CardTitle className="text-red-400 text-xl">Something went wrong</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-slate-300">
              There was an error fetching your subscription details. Please try again later.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="w-full border-red-600 text-red-400 hover:bg-red-500/10"
            >
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (!data) {
    return null
  }

  const { type, playing_date_and_time, end_date } = data
  const isActive = new Date(end_date) > new Date()
  const daysUntilExpiry = Math.ceil((new Date(end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const getSubscriptionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'premium':
        return <Crown className="w-5 h-5 text-yellow-400" />
      case 'pro':
        return <Sparkles className="w-5 h-5 text-purple-400" />
      default:
        return <CheckCircle2 className="w-5 h-5 text-green-400" />
    }
  }

  const getSubscriptionColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'premium':
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
      case 'pro':
        return 'from-purple-500/20 to-pink-500/20 border-purple-500/30'
      default:
        return 'from-green-500/20 to-blue-500/20 border-green-500/30'
    }
  }

  return (
    <>
    <CustomHeader/>
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className={`bg-gradient-to-br ${getSubscriptionColor(type)} backdrop-blur-sm shadow-2xl border-2 overflow-hidden`}>
          <div className="absolute inset-0 bg-slate-800/80 backdrop-blur-sm" />
          <div className="relative">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-6 border border-purple-500/30">
                {getSubscriptionIcon(type)}
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Your Subscription
              </CardTitle>
              <CardDescription className="text-slate-400 text-lg mt-2">
                Manage your active subscription details
              </CardDescription>
              <div className="flex justify-center mt-4">
                <Badge 
                  variant={isActive ? "default" : "destructive"}
                  className={`px-4 py-1 text-sm font-medium ${
                    isActive 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border-red-500/30'
                  }`}
                >
                  {isActive ? 'Active' : 'Expired'}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:bg-slate-700/40 transition-colors">
                  <div className="flex items-center gap-3">
                    {getSubscriptionIcon(type)}
                    <span className="font-medium text-slate-300">Plan Type</span>
                  </div>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30 capitalize font-semibold">
                    {type}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:bg-slate-700/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <span className="font-medium text-slate-300">Playing Days</span>
                  </div>
                  <div className="text-right">
                    <div className="flex flex-wrap gap-1 justify-end">
                      {playing_date_and_time.playingDays.map((day: string) => (
                        <Badge key={day} variant="outline" className="text-xs border-slate-500 text-slate-300">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:bg-slate-700/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-green-400" />
                    <span className="font-medium text-slate-300">Playing Time</span>
                  </div>
                  <span className="font-semibold text-white bg-slate-600/50 px-3 py-1 rounded-lg">
                    {playing_date_and_time.playingTime}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:bg-slate-700/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-orange-400" />
                    <span className="font-medium text-slate-300">Valid Until</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-white">
                      {new Date(end_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    {isActive && (
                      <div className="text-sm text-slate-400">
                        {daysUntilExpiry} days remaining
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-8 space-y-3">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                <Settings className="w-4 h-4 mr-2" />
                Manage Subscription
              </Button>
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>
    </>
  )
}
