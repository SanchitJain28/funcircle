import Footer from '@/app/components/footer'
import React from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import FAQs from '@/app/components/FAQs'
import Navbar from '@/app/components/Navbar'
export default function ContactUs() {
    return (
        <div className='bg-[#131315] '>
            <Navbar />

            <Card className='bg-black text-white lg:px-40 lg:py-20 lg:mx-20 lg:mt-28 mt-24 mx-4'>
                <CardHeader>
                    <CardTitle className='text-5xl '>Fun Circle</CardTitle>
                    <p className='text-sm my-4 text-zinc-500'>At Fun circle, our mission is to bring people together offline by connecting those with shared interests. We believe that genuine, face-to-face interactions are the cornerstone of meaningful relationships and thriving communities. Whether you are passionate about art, music, sports, technology, or any niche interest, our platform is your gateway to discovering local events, forging new friendships, and creating memorable experiences.

                    </p>
                    <p className='text-sm my-4 text-zinc-500'>In today&apos;s digital world, it&apos;s easy to feel disconnected. That&apos;s why we&apos;ve created YourFuncircle—a dynamic space where every local meetup is a chance to build real-world connections and find your tribe. Our intuitive, user-friendly platform makes it simple to browse events, join groups, and start conversations that lead to lasting bonds. We&apos;re here to transform digital interactions into vibrant, in-person experiences that enrich lives and empower communities.
                    </p>
                    <p className='text-sm my-4 text-zinc-500'>We are driven by a vision of inclusivity and genuine connection. Every event, every group, and every conversation on YourFuncircle is designed to celebrate the unique interests and talents that make our community diverse and inspiring. Join us as we redefine how people connect in the real world—because your community is waiting to come to life.
                    </p>
                    <p className='text-lg my-4 text-zinc-200'>Welcome to Fun circle — where your world meets, connects, and thrives.

                    </p>
                    <p className='text-lg my-4 text-zinc-200'>support@funcircleapp.com


                    </p>
                </CardHeader>
                <div className=" flex mx-8 items-center -mt-12">
                    <a href='https://play.google.com/store/apps/details?id=faceout.social&pcampaignid=web_share'>
                        <img src='google-play-badge-logo-svgrepo-com (1).svg' className='lg:w-48 w-40 mr-4' />
                    </a>
                    <a href='https://apps.apple.com/in/app/faceout-go-out-date-social/id6479629031'>
                        <img src='download-on-the-app-store-apple-logo-svgrepo-com.svg' className='lg:w-48 w-40' />
                    </a>
                </div>
            </Card>
            <FAQs />
            <Footer />
        </div>
    )
}
