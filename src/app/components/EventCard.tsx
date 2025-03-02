"use client"
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import React, { useState } from 'react'
import { appContext } from '../(app)/Contexts/AppContext/page';

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
                <div id="location" className='absolute text-xs flex -mt-12 mx-4 bg-white text-black p-2 z-10 rounded-2xl'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                    {/* <p className='font-sans'>{location}</p> */}
                </div>}

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
                        <button className='bg-black my-2 w-full p-4 text-white rounded-lg '>see upcoming meets</button>
                    </Link>
                </div>}
        </div>
    )
}
