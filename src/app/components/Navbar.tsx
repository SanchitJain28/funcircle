import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import React from 'react'

export default function Navbar() {
    return (
        <div>
            <div className="text-black bg-[#0D0D0D] lg:py-8 py-4 px-4 m-0 rounded-none border border-[#0D0D0D] lg:h-24 h-16">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex">
                        <p className="text-xl mx-4  text-white  rounded-lg font-extrabold">Fun Circle</p>
                    </div>
                    <div className="flex">
                        <Link href="/" className="text-white mx-4 lg:block hidden text-xl font-light">Home</Link>
                        <Link href="/about" className="text-white mx-4 lg:block hidden text-xl font-light">About us</Link>
                        <Link href="/contactUs" className="text-white mx-4 lg:block hidden text-xl font-light">Contact us</Link>
                        <Link href="/privacyPolicy" className="text-white mx-4 lg:block hidden text-xl font-light">Privacy policy</Link>
                        <Link href="/termsandservice" className="text-white mx-4 lg:block hidden text-xl font-light">Terms and conditions</Link>
                    </div>
                    <DropdownMenu >
                        <DropdownMenuTrigger className="lg:hidden text-white text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem><Link href="/">Home</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/privacyPolicy">Privacy policy</Link></DropdownMenuItem>

                            <DropdownMenuItem><Link href="/about">About us</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/contactUs">Contact us</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href="/termsandservice">Terms and conditions</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}
