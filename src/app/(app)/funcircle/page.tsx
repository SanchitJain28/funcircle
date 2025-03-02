"use client"
import React, { useCallback, useContext, useEffect, useState } from 'react'

import axios, { AxiosError } from 'axios';
import { toast } from "sonner"
import EventCard from '@/app/components/EventCard';
import { useDebounce } from "@uidotdev/usehooks";
import { X } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { appContext } from '../../Contexts/AppContext';
interface Event {
    name: string
    profile_image: string;
    location: string
    interests: string[]
    group_id: number
}
interface Tabs {
    active: boolean,
    value: string,
    label?: string
    activeImage?: string
    inactiveImage?: string
    activeColor?: string,
    inactiveColor?: string
    activeBorderColor?: string
}
export default function FunCircle() {
    const [tabs, setTabs] = useState<Tabs[] | []>([
        {
            active: false,
            value: "Events",
            label: "Events",
            activeImage: "guitar_white.svg",
            inactiveImage: "guitar.svg",
            activeColor: "#2D187D",
            activeBorderColor: "#A496E3"
        },
        {
            active: true,
            value: "Outdoor",
            label: "Outdoor",
            activeImage: "cricket_white.svg",
            inactiveImage: "cricket_correct.svg",
            activeColor: "#0B4076",
            activeBorderColor: "#627CA1"
        },
        {
            active: false,
            value: "Meetup",
            label: "Meetup",
            activeImage: "compass_white.svg",
            inactiveImage: "compass_correct.svg",
            activeColor: "#645C14",
            activeBorderColor: "#B1AC72"
        },
        {
            active: false,
            value: "Party",
            label: "Party",
            activeImage: "disco-ball_white.svg",
            inactiveImage: "disco-ball.svg",
            activeColor: "#710E2A",
            activeBorderColor: "#DA869E"
        }
    ])
    const [data, setData] = useState<Event[] | []>([])
    const [search, setSearch] = useState<string>("")
    const [event, setEvents] = useState<Event[] | []>([])
    const [group_type, setGroupType] = useState<string>("Outdoor")
    const [loading, SetLoading] = useState<boolean>(true)
    const { loading: allLoading } = useContext(appContext) || { loading: false };
    // const [touchStart, setTouchStart] = useState<number | null>(null);
    // const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const debouncedSearchTerm = useDebounce(search, 300);

    const fetchEventsByGroupType = useCallback(async (group_type: string) => {
        SetLoading(true)
        try {
            const response = await axios.post("/api/FetchEvents", {
                group_type: group_type
            })
            // console.log(response.data.data)
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
            // console.log(filteredEvents)
            // console.log(data)
            return
        }
        setEvents(data)
    }, [debouncedSearchTerm])
    useEffect(()=>{

    },[allLoading])

    const handleTabChange = (index: number) => {
        const updatedTabs = tabs.map((e, tabIndex) => {
            if (tabIndex === index) {
                return { ...e, active: true }
            }
            return { ...e, active: false }
        })
        SetLoading(true)
        setTabs(updatedTabs)
    }

    return (
        // onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
        <div className='bg-[#131315] min-h-screen py-6 overflow-hidden' >
            {/* //SEARCH BAR */}
            <div id="searchBar " className='flex flex-row p-4 '>
                <div className="flex w-full bg-[#303030]  py-2 px-2 mx-2 rounded-lg">
                    <input value={search} type="text" className=" w-full focus:outline-none bg-[#303030]" placeholder="Search for events or city ..." onChange={(e) => {
                        setSearch(e.target.value)
                    }} />
                    {debouncedSearchTerm && <button onClick={() => {
                        setSearch("")
                    }}><X /></button>}
                </div>
            </div>

            <div className="flex px-4 ">
                {tabs.map((tab, index) => {
                    return <div 
                    className={`flex flex-col align-center justify-center items-center mx-1 px-4 py-2 rounded-xl`} 
                    key={index}
                    onClick={() => {
                        setGroupType(tab.value)
                        handleTabChange(index)
                    }}
                    style={{ 
                        backgroundColor: tab.active ? tab.activeColor : "transparent",
                        border:tab.active?`1px solid ${tab.activeBorderColor}`:"" }} 
>
                        {tab.active ?
                            <img src={tab.activeImage} className='w-10 font-bold' />
                            :
                            <img src={tab.inactiveImage} className='w-10 font-bold' />}
                        <button className='text-zinc-200 text-lg '>{tab.value}</button>
                    </div>
                })}

            </div>

            <div>
                {loading ||allLoading?
                    <div className="px-4 rounded-lg bg-[#131315]">
                        <div className="flex flex-col px-2 py-4 space-y-3 bg-[#131315]">
                            <Skeleton className="h-[125px] w-full rounded-xl bg-[#1a1a1c]" />
                            <div className="space-y-2 bg-[#1a1a1c]">
                                <Skeleton className="h-4 w-[250px] bg-[#3a3a3d]" />
                                <Skeleton className="h-4 w-[200px] bg-[#3a3a3d]" />
                            </div>
                        </div>
                        <div className="flex flex-col px-2 py-4 space-y-3 bg-[#131315]">
                            <Skeleton className="h-[125px] w-full rounded-xl bg-[#1a1a1c]" />
                            <div className="space-y-2 bg-[#1a1a1c]">
                                <Skeleton className="h-4 w-[250px] bg-[#3a3a3d]" />
                                <Skeleton className="h-4 w-[200px] bg-[#3a3a3d]" />
                            </div>
                        </div>
                        <div className="flex flex-col px-2 py-4 space-y-3 bg-[#131315]">
                            <Skeleton className="h-[125px] w-full rounded-xl bg-[#1a1a1c]" />
                            <div className="space-y-2 bg-[#1a1a1c]">
                                <Skeleton className="h-4 w-[250px] bg-[#3a3a3d]" />
                                <Skeleton className="h-4 w-[200px] bg-[#3a3a3d]" />
                            </div>
                        </div>
                    </div>
                    :
                    <div className="px-6 overflow-hidden bg-[#131315] min-h-screen">
                        {event.length == 0 && !loading ?
                            <div className='flex flex-col'>
                                <p className='text-zinc-600 text-3xl font-sans text-center mt-20 mb-4 '>No events currently</p>
                                <p className='text-zinc-600 text-xl font-sans text-center underline '>Events coming soon</p>
                            </div> :
                            <div className='lg:grid lg:grid-cols-3 lg:mx-4'>
                                {event.map((e, index) => {
                                    return <div className="lg:mx-4 my-4" key={index}>
                                        <EventCard card_data={e} />
                                    </div>
                                })}
                            </div>}
                    </div>}
            </div>
        </div>
    )
}
