import Footer from "@/app/components/footer";
import React from "react";
import { Card } from "@/components/ui/card";
import FAQs from "@/app/components/FAQs";
import Navbar from "@/app/components/Navbar";
export default function ContactUs() {
  return (
    <div className="">
      <Navbar />
      <Card className="bg-black text-white lg:px-40 lg:py-20 lg:mx-20 lg:mt-28 mt-8 mx-4">
        <div className="flex-col basis-1/2 p-2 m-8">
          <p className="text-sm my-4 text-white">
            Funcircle: Find Sports & Adventure Groups Near You! 🏏⚽🏀🎾🏓 Tired
            of searching “play cricket nearby”, “biking groups near me”, or
            “hiking groups in Gurgaon”? Funcircle is your go-to app for sports
            meetups, adventure activities, and social events!
          </p>
          <p className="text-sm my-4 text-white">
            Join local groups for cricket, football, volleyball, badminton,
            tennis, basketball, snooker, box cricket, pickleball, and table
            tennis. Love adventure? Find hiking groups, biking meetups, laser
            tag, paintball, camping, mystery rooms, quizzes, and board game
            nights—all near you!
          </p>
          <p className="text-sm my-4 text-white">
            🏆 Why Join Funcircle? ✔ Play Instantly – Find partners for cricket,
            football, volleyball, badminton, tennis, basketball, snooker,
            pickleball, and table tennis anytime! ✔ Adventure & Socialize – Meet
            like-minded people in hiking groups, biking groups, running clubs,
            cycling squads, volunteering events, and more! ✔ Beginner-Friendly
            Fun – No experience? No problem! Join casual games of box cricket,
            volleyball, pickleball, and badminton for pure fun. ✔ Flexible &
            Affordable – Pay per meetup—perfect for weekend cricket matches,
            football games, or hiking adventures! ✔ Expanding Soon – Currently
            in Gurgaon, coming soon to Delhi NCR, Bangalore, Mumbai, and
            Hyderabad!
          </p>
          <p className="text-sm my-4 text-white">
            🚀 How It Works: ⿡ Search – Find nearby cricket, football,
            badminton, volleyball, or hiking groups easily. ⿢ Book – Reserve
            your spot through the app (hassle-free!). ⿣ Play & Connect – Show
            up, enjoy, and meet new friends!
          </p>
          <p className="text-lg my-4 text-white">
            🔍 Funcircle Solves Your Problems: ❌ No one to play with? → Join
            instant sports groups for cricket, football, badminton, tennis,
            volleyball, and pickleball! ❌ Weekends are boring? → Try hiking
            groups in Gurgaon, biking meetups, laser tag, quizzes, or board game
            nights! ❌ New in town? → Make friends through sports and social
            activities!
          </p>
          <p className="text-lg my-4 text-white">
            🌟 Future Plans: 📍 Cafes & Clubs – Group meetups at the best
            hangout spots in Gurgaon, Delhi NCR, Bangalore, Mumbai, and
            Hyderabad! 🏆 Advanced Leagues – Competitive matches for cricket,
            football, badminton, and tennis players!
          </p>
          <p className="text-lg my-4 text-white">
            🔥 Join 5,000+ sports lovers in Gurgaon! 📲 Download Funcircle Now –
            Your next game, adventure, or meetup is just one click away!
          </p>
          <p className="text-lg my-4 text-zinc-200">funcircleapp@gmail.com</p>
          {/* Download buttons */}
          <div className=" flex items-center -my-12">
            <a href="https://play.google.com/store/apps/details?id=faceout.social&pcampaignid=web_share">
              <img
                alt="Check your interests from outdoor to indoor"
                src="google-play-badge-logo-svgrepo-com (1).svg"
                className="lg:w-48 w-40 mr-4"
              />
            </a>
            <a href="https://apps.apple.com/in/app/faceout-go-out-date-social/id6479629031">
              <img
                alt="Check your interests from outdoor to indoor"
                src="download-on-the-app-store-apple-logo-svgrepo-com.svg"
                className="lg:w-48 w-40 mr-4"
              />
            </a>
          </div>
        </div>
       
      </Card>
      <FAQs />
      <Footer />
    </div>
  );
}
