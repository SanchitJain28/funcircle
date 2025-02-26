"use client"
import { Skeleton } from '@/components/ui/skeleton';
import React, { useState } from 'react'

interface EventCardProps {
    card_data: {
        name: string
        profile_image: string;
        location: string
        interests: string[]
    }
}

export default function EventCard({ card_data }: EventCardProps) {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    const { profile_image, location, name, interests } = card_data
    return (
        <div className=' rounded-lg shadow-xl shadow-zinc-200'>
            {/* //WHEN IMAGE IS NOT UPLOADED */}
            {!imageLoaded && (
                <div className="flex flex-col p-2 space-y-3 shadow-lg shadow-white">
                    <Skeleton className="h-[125px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            )}
            {/* //LEARNED A NEW THING FOR IMAGE THAT IS ONLOAD FUNCTION */}

            <img src={profile_image}
                className='rounded-xl'
                onLoad={() => { setImageLoaded(true) }} />

            {imageLoaded &&
                <div id="location" className='absolute text-xs flex -mt-12 mx-4 bg-white text-black p-2 z-10 rounded-2xl'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                    <p className='font-sans'>{location}</p>
                </div>}

            {imageLoaded &&
                <div className="p-4">
                    <p className='text-black text-lg my-2'>{name}</p>
                    <div className="flex my-2">
                        {interests.map((e, index) => {
                            return <p key={index} className='text-sm text-gray-600 mr-2 bg-zinc-200 py-[2px] px-[6px] rounded-xl'>{e}</p>
                        })}
                    </div>
                    <button className='bg-black px-4 py-2 text-white font-sans my-2 rounded-lg w-full'>See upcoming meets</button>
                </div>}
        </div>
    )
}
