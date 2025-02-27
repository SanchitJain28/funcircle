"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios, { AxiosError } from 'axios';
import { toast } from "sonner"
import EventCard from '@/app/components/EventCard';
import { useDebounce } from "@uidotdev/usehooks";
import { X } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
// const tabValues = ["Outdoor", "Meetup", "social"];
interface Event {
    name: string
    profile_image: string;
    location: string
    interests: string[]
    group_id: number
}
export default function FunCircle() {
    const [data, setData] = useState<Event[] | []>([])
    const [search, setSearch] = useState<string>("")
    const [event, setEvents] = useState<Event[] | []>([])
    const [group_type, setGroupType] = useState<string>("Outdoor")
    const [loading, SetLoading] = useState<boolean>(true)
    // const [touchStart, setTouchStart] = useState<number | null>(null);
    // const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const debouncedSearchTerm = useDebounce(search, 300);
    // const [searchEvents, setSearchEvents] = useState<Event[] | []>([])

    const fetchEventsByGroupType = useCallback(async (group_type: string) => {
        console.log("RUN")
        SetLoading(true)
        try {
            const response = await axios.post("/api/FetchEvents", {
                group_type: group_type
            })
            console.log(response.data.data)
            setEvents(response.data.data)
            setData(response.data.data)
        } catch (error) {
            const axiosError = error as AxiosError
            toast("Sorry events cannot be fetched", {
                description: "Sorry an unexpected error occured " + axiosError.response?.data
            })
        }
        finally {
            SetLoading(false)
        }
    }, [group_type])
    useEffect(() => {
        fetchEventsByGroupType(group_type)
    }, [group_type])
    useEffect(() => {
        if (debouncedSearchTerm) {
            const filteredEvents = data.filter((e) => {
                return e.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                    e.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            })
            setEvents(filteredEvents)
            console.log(filteredEvents)
            console.log(data)
            return
        }
        console.log("debounced search term is null")
        setEvents(data)
    }, [debouncedSearchTerm])

    // const handleTouchStart = (e: React.TouchEvent) => {
    //     setTouchStart(e.touches[0].clientX);
    // };

    // const handleTouchEnd = (e: React.TouchEvent) => {
    //     setTouchEnd(e.changedTouches[0].clientX);
    //     handleSwipe();
    // };

    // const handleSwipe = () => {
    //     if (touchStart === null || touchEnd === null) return;

    //     const swipeDistance = touchStart - touchEnd;
    //     const swipeThreshold = 100; // Minimum swipe distance

    //     if (swipeDistance > swipeThreshold) {
    //         // Swipe left (next tab)
    //         const currentIndex = tabValues.indexOf(group_type);
    //         if (currentIndex < tabValues.length - 1) {
    //             setGroupType(tabValues[currentIndex + 1]);
    //         }
    //     } else if (swipeDistance < -swipeThreshold) {
    //         // Swipe right (previous tab)
    //         const currentIndex = tabValues.indexOf(group_type);
    //         if (currentIndex > 0) {
    //             setGroupType(tabValues[currentIndex - 1]);
    //         }
    //     }

    //     // Reset touch positions
    //     setTouchStart(null);
    //     setTouchEnd(null);
    // };
    return (
        // onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
        <div className=' ' >
            {/* //SEARCH BAR */}
            <div id="searchBar " className='flex flex-row p-4'>
                <div className="flex w-full border border-zinc-200 py-2 px-2 mx-2 rounded-lg">
                    <input value={search} type="text" className=" w-full focus:outline-none" placeholder="Search for events or city ..." onChange={(e) => {
                        setSearch(e.target.value)
                    }} />
                    {debouncedSearchTerm && <button onClick={()=>{
                        setSearch("")
                        
                    }}><X /></button>}
                </div>

                <button className="py-2 px-4 bg-violet-700 text-white rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg></button>
            </div>
            <Tabs defaultValue="Outdoor" value={group_type} className="w-full bg-white p-2" onValueChange={(e) => {
                setGroupType(e)
                console.log(e)
            }}>
                <TabsList className='w-full bg-white '>
                    <TabsTrigger value="Outdoor" className='text-lg m-1 px-4 py-2 data-[state=active]:bg-violet-700 data-[state=active]:text-white'>Sports</TabsTrigger>
                    <TabsTrigger value="Meetup" className='text-lg m-1 px-4 py-2 data-[state=active]:bg-violet-700 data-[state=active]:text-white'>Meetup</TabsTrigger>
                    <TabsTrigger value="social" className='text-lg m-1 px-4 py-2 data-[state=active]:bg-violet-700 data-[state=active]:text-white'>Social</TabsTrigger>
                </TabsList>
                <TabsContent value={group_type}>
                    {loading ?
                        <div className="">
                            <div className="flex flex-col p-2 space-y-3">
                                <Skeleton className="h-[125px] w-full rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                            <div className="flex flex-col p-2 space-y-3">
                                <Skeleton className="h-[125px] w-full rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                            <div className="flex flex-col p-2 space-y-3">
                                <Skeleton className="h-[125px] w-full rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                        </div>
                        :
                        <div className="p-2 overflow-hidden">
                            {event.length == 0 && !loading ?
                                <div className='flex flex-col'>
                                    <p className='text-zinc-600 text-3xl font-sans text-center mt-20 mb-4 '>No events currently</p>
                                    <p className='text-zinc-600 text-xl font-sans text-center underline '>Events coming soon</p>
                                </div> :
                                <div className='lg:grid lg:grid-cols-3 lg:mx-4'>
                                    {event.map((e, index) => {
                                        return <div className="lg:mx-4" key={index}>
                                            <EventCard card_data={e} />
                                        </div>
                                    })}
                                </div>}
                        </div>}
                </TabsContent>
            </Tabs>
        </div>
    )
}
