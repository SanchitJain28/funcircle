import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import React from 'react'

export default function Navbar() {
    return (
        <div>
            <div className="text-black bg-black -my-20 lg:-mt-28 lg:-mb:8 lg:h-56 h-44">
                <div className="flex flex-row justify-between p-8 items-center">
                <img alt="" src='funCircle_white_svg.svg' className=" h-40 lg:h-60 rounded-xl  my-4 -py-8  -mx-4 " />

                    <div className="flex">
                        <Link href="/" className="text-white mx-4 lg:block hidden text-xl font-light">Home</Link>
                        <Link href="/about" className="text-white mx-4 lg:block hidden text-xl font-light">About us</Link>
                        <Link href="/contactUs" className="text-white mx-4 lg:block hidden text-xl font-light">Contact us</Link>
                        <Link href="/privacyPolicy" className="text-white mx-4 lg:block hidden text-xl font-light">Privacy policy</Link>
                        <Link href="/termsandservice" className="text-white mx-4 lg:block hidden text-xl font-light">Terms and conditions</Link>
                    </div>
                    <DropdownMenu >
                        <DropdownMenuTrigger className="lg:hidden text-white text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg></DropdownMenuTrigger>
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
