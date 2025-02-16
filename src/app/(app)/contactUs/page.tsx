import Footer from '@/app/components/footer'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import DownloadButtons from '@/app/components/DownloadButtons'
import FAQs from '@/app/components/FAQs'
import Navbar from '@/app/components/Navbar'
export default function ContactUs() {
    return (
        <div>
            <Navbar />

            <Card className='bg-black text-white lg:px-40 lg:py-20 lg:mx-20 lg:my-20 m-4'>
                <CardHeader>
                    <CardTitle className='text-5xl '>Fun Circle</CardTitle>
                    <CardDescription className='text-2xl'>You can contact us on imrj1999@gmail.com or you can directlt whatsapp at +919651079271
                    </CardDescription>
                </CardHeader>
                <div className="mx-4">
                    <DownloadButtons />
                </div>
            </Card>
            <FAQs />
            <Footer />
        </div>
    )
}
