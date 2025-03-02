"use client"
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import React, { useState } from 'react'
import { appContext } from '../Contexts/AppContext';

interface EventCardProps {
    card_data: {
        name: string
        profile_image: string;
        location: string
        interests: string[]
        group_id: number
    }
}

export default function EventCard({ card_data }: EventCardProps) {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const context = React.useContext(appContext);
    if (!context) {
        throw new Error("appContext must be used within a AppProvider");
    }
    const { setLoading } = context;
    const { profile_image, location, name, interests, group_id } = card_data
    return (
        <div className=' rounded-lg '>
            {/* //WHEN IMAGE IS NOT UPLOADED */}
            {!imageLoaded && (
                <div className=" rounded-lg bg-[#131315]">
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
            )}
            {/* //LEARNED A NEW THING FOR IMAGE THAT IS ONLOAD FUNCTION */}

            <img src={profile_image}
                alt={`${name}'s profile image`}
                width={500} // Specify the width of the image
                height={300} // Specify the height of the ima
                className='rounded-xl'
                onLoad={() => { setImageLoaded(true) }} />

            

            {imageLoaded &&
                <div className="py-4 px-1">
                    <div className="flex flex-col">
                        <p className='text-white text-lg'>{name}</p>
                        <p className='text-zinc-400 text-sm'>{location}</p>
                        <div className="grid grid-cols-3">
                            {interests.map((e, index) => {
                                return <p key={index} className='text-xs text-white mr-2 my-2 bg-[#575759] py-[4px] px-[6px] rounded-xl'>{e}</p>
                            })}
                        </div>
                    </div>

                    <Link href={`funcircle/eventTicket/${group_id}`} onClick={()=>{
                        setLoading(true)
                    }}  >
                        <button className='bg-black my-2 w-full font-bold p-4 text-white rounded-lg border border-zinc-700'>See upcoming meets</button>
                    </Link>
                </div>}
        </div>
    )
}
