import Image from "next/image";
import Link from "next/link";
import { Instagram, Youtube, Linkedin } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 lg:py-16">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-start lg:items-center ">
        {/* Left Section: Motto, Download Buttons, Social Media, Copyright */}
        <div className="flex flex-col lg:w-2/3">
          <p className="text-3xl md:text-4xl font-bold text-left">
            Explore your hobbies, find your tribe
          </p>

          {/* Download buttons */}
          <div className="flex flex-wrap items-center gap-4 ">
            <a
              href="https://play.google.com/store/apps/details?id=faceout.social&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
            >
              <Image
                src="google-play-badge-logo-svgrepo-com (1).svg"
                alt="Get it on Google Play badge"
                width={160}
                height={48}
                className="w-36 md:w-40 lg:w-48"
              />
            </a>
            <a
              href="https://apps.apple.com/in/app/faceout-go-out-date-social/id6479629031"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
            >
              <Image
                src="download-on-the-app-store-apple-logo-svgrepo-com.svg"
                alt="Download on the App Store badge"
                width={160}
                height={48}
                className="w-36 md:w-40 lg:w-48"
              />
            </a>
          </div>

          {/* Follow Us and Social Icons */}
          <div className="mb-8">
            <p className="text-xl md:text-2xl font-light mb-4">Follow us on</p>
            <div className="flex gap-6">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-7 w-7 text-white hover:text-purple-400 transition-colors" />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on YouTube"
              >
                <Youtube className="h-7 w-7 text-white hover:text-purple-400 transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-7 w-7 text-white hover:text-purple-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-base md:text-lg font-light">
            © Copyright 2025 Fun Circle app
          </p>
        </div>

        {/* Right Section: Navigation Links */}
        <div className="flex flex-col gap-4 lg:w-1/3 lg:pl-12">
          <Link
            href="/venue-partners"
            className="text-white font-bold text-lg hover:text-purple-400 transition-colors"
          >
            Venue partners
          </Link>
          <Link
            href="/about"
            className="text-white font-bold text-lg hover:text-purple-400 transition-colors"
          >
            About us
          </Link>
          <Link
            href="/contact-us"
            className="text-white font-bold text-lg hover:text-purple-400 transition-colors"
          >
            Contact us
          </Link>
          <Link
            href="/terms-and-service"
            className="text-white font-bold text-lg hover:text-purple-400 transition-colors"
          >
            Terms and conditions
          </Link>
          <Link
            href="/privacy-policy"
            className="text-white font-bold text-lg hover:text-purple-400 transition-colors"
          >
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
