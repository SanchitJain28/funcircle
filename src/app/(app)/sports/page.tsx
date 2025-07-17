import BadmintonHeader from "@/components/header-footers/BadmintonHeader";
import Footer from "@/components/header-footers/footer";
import { Archivo } from "next/font/google";
import React from "react";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function page() {
  return (
    <main className="bg-white min-h-screen ">
      <BadmintonHeader />
      <div
        className={`${archivo.className} bg-white pb-8 min-h-screen px-8 lg:max-w-4xl mx-auto`}
      >
        {/* //SECTION 1 */}
        <header className="my-6">
          <section>
            <h1 className="text-4xl font-bold mb-3">
              Play Sports in Gurgaon & Delhi NCR – Book Badminton, Cricket,
              Football, and More with Funcircle
            </h1>
            <p className="text-lg leading-relaxed">
              Are you ready to elevate your sports experience in Gurgaon and
              Delhi NCR? Funcircle is the ultimate platform to discover and book
              a wide array of sports activities. Whether you are passionate
              about badminton, cricket, football, tennis, or any other sport,
              we&apos;ve got you covered. Say goodbye to the hassle of finding
              venues and organizing games!
            </p>
            <button className=" w-full p-4 text-2xl rounded-xl my-4 border-black border-4 text-black font-bold">
              Book Now !!
            </button>
          </section>
        </header>

        {/* //SECTION 2 */}
        <section className="mb-6">
          <h2 className="text-3xl font-bold mb-4">
            Book Sports Activities Near You in Gurgaon & Delhi NCR
          </h2>
          <img
            src="funCircle_white_svg.svg"
            alt=""
            className="bg-black w-full rounded-xl h-60 my-4 -py-12 "
          />
          <p className="text-lg leading-relaxed">
            Funcircle simplifies the process of finding and booking sports
            facilities near you in Gurgaon and Delhi NCR. Tired of not finding
            courts and similar level players, we make that fully sorted for you,
            and always get confirmed slots from our website, no more booking and
            coordination ka jhanjhat, book your slots easily and play, book with
            ease. Explore various sports venues, from badminton courts to
            cricket grounds, all in one place.
          </p>

          {/* //SUBHEADING 1 */}
          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Play with Groups, Duos, or Squads – No Premade Team Needed
            </h3>
            <p className="text-lg leading-relaxed">
              Funcircle offers the unique ability to play sports even if you
              don&apos;t have a premade team. Join existing groups, form duos
              for tennis or badminton, or create your own squad for a football
              match. Our platform connects you with other sports enthusiasts in
              your city who are looking to play!
            </p>
          </div>

          {/* //SUBHEADING 2 */}
          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Compete on Leaderboards and Meet New Players
            </h3>
            <p className="text-lg leading-relaxed">
              Add a competitive edge to your sports experience with
              Funcircle&apos;s leaderboards. Track your progress, compete with
              other players, and climb the ranks. This feature not only enhances
              your game but also helps you meet new players with similar skill
              levels and interests, expanding your sports community in Gurgaon
              and Delhi NCR.
            </p>
          </div>

          {/* //SUBHEADING 3 */}

          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Why Funcircle Is the Easiest Way to Join Sports Matches
            </h3>
            <p className="text-lg leading-relaxed">
              Funcircle is designed to be the easiest way to join sports
              matches. We offer a hassle-free booking experience, a wide
              selection of sports and venues, and tools to connect with other
              players. Enjoy the convenience of booking your preferred sports
              facility and finding teammates all in one app. With Funcircle,
              playing sports has never been more accessible or enjoyable.
            </p>
          </div>
        </section>

        {/* //SECTION 3 */}
        <section className="mb-6">
          <h2 className="text-3xl font-bold mb-4">
            Play Badminton in Gurgaon – Book Courts & Join Groups{" "}
          </h2>
          <img
            src="badminton-sports-blog.jpeg"
            alt=""
            className="bg-black w-full rounded-xl h-60 my-4"
          />
          <p className="text-lg leading-relaxed">
            Are you a badminton enthusiast in Gurgaon? Funcircle is your go-to
            app for booking badminton courts and joining badminton groups. Find
            the best badminton courts near you, connect with other badminton
            players, and elevate your game. Whether you&apos;re a beginner or an
            experienced player, Funcircle has something for everyone.
          </p>

          {/* //SUBHEADING 1 */}
          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Best Badminton Courts in Sector 52, 57, 62 & More
            </h3>
            <p className="text-lg leading-relaxed">
              Discover the top badminton courts in Gurgaon sectors like Sector
              52, Sector 57, Sector 62, and more. Funcircle offers a curated
              selection of the best badminton venues in the city, ensuring you
              have access to quality courts and facilities. Book your preferred
              badminton courts with ease and enjoy a great game.
            </p>
          </div>

          {/* //SUBHEADING 2 */}
          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Join Badminton Groups Based on Skill Level
            </h3>
            <p className="text-lg leading-relaxed">
              Funcircle makes it easy to join badminton groups based on your
              skill level. Connect with players who match your ability, ensuring
              you have competitive and enjoyable games. Whether you&apos;re
              looking for casual games or serious competition, Funcircle helps
              you find the perfect badminton group in Delhi NCR to enhance your
              skills and enjoyment.
            </p>
          </div>

          {/* //SUBHEADING 3 */}

          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Affordable Badminton Slots in Delhi NCR
            </h3>
            <p className="text-lg leading-relaxed">
              Funcircle is committed to offering affordable badminton slots in
              Delhi NCR. We partner with various sports facilities to provide
              competitive pricing and exclusive deals on badminton court
              bookings. Tired of not finding courts and similar level players,
              we make that fully sorted for you, and always get confirmed slots
              from our app, no more booking and coordination ka jhanjhat, book
              your slots easily and play, book with ease. Enjoy playing
              badminton without breaking the bank, and make the most of your
              sports experience with Funcircle.
            </p>
          </div>
        </section>

        {/* //SECTION 4 */}
        <section className="mb-6">
          <h2 className="text-3xl font-bold mb-4">
            Book Box Cricket Matches in Gurgaon & Delhi
          </h2>
          <img
            src="boxcricket-sport-blog.jpeg"
            alt=""
            className="bg-black w-full rounded-xl h-60 my-4"
          />
          <p className="text-lg leading-relaxed">
            For those who love cricket but prefer a faster-paced, more contained
            version, Funcircle offers the perfect solution: box cricket. You can
            easily book box cricket matches in Gurgaon and Delhi NCR through our
            platform, accessing various box cricket arenas and indoor facilities
            to enjoy this exciting sport. Discover the best box cricket turfs in
            Delhi NCR.
          </p>

          {/* //SUBHEADING 1 */}
          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Play Box Cricket Without Needing a Full Team
            </h3>
            <p className="text-lg leading-relaxed">
              One of the best features of Funcircle is that you don’t need a
              full team to enjoy a game of box cricket. Our platform connects
              you with other box cricket enthusiasts looking to play, so you can
              join existing games or create new ones. Enjoy playing box cricket
              near you without the hassle of coordinating a full team, making it
              easier than ever to get in on the action.
            </p>
          </div>

          {/* //SUBHEADING 2 */}
          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Indoor & Outdoor Box Cricket Grounds in Gurgaon
            </h3>
            <p className="text-lg leading-relaxed">
              Funcircle offers access to both indoor and outdoor box cricket
              grounds in Gurgaon, catering to your preferences and the weather.
              Explore different box cricket venues and find the best sports
              facility for your game. Whether you prefer the controlled
              environment of an indoor arena or the open air of an outdoor
              ground, Funcircle has you covered for box cricket.
            </p>
          </div>

          {/* //SUBHEADING 3 */}

          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Compete in Box Cricket Tournaments & Leaderboards
            </h3>
            <p className="text-lg leading-relaxed">
              Enhance your box cricket experience by competing in local
              tournaments and climbing the leaderboards on Funcircle. Track your
              progress, challenge other players, and showcase your skills in the
              box cricket arena. This feature adds a competitive edge to your
              game and helps you meet new players who share your passion for box
              cricket.
            </p>
          </div>
        </section>

        {/* //SECTION 5 */}
        <section className="mb-6">
          <h2 className="text-3xl font-bold mb-4">
            Play Full Ground Cricket in Gurgaon – Find & Book Easily
          </h2>
          <img
            src="cricket-sport-blog.jpg"
            alt=""
            className="bg-black w-full rounded-xl h-60 my-4"
          />
          <p className="text-lg leading-relaxed">
            For those who prefer the traditional cricket experience, Funcircle
            makes it easy to find and book full ground cricket venues in
            Gurgaon. Our platform offers a wide selection of cricket grounds, so
            you can enjoy a full game of cricket with your friends or join a
            local cricket club. Book sports and enjoy the classic cricket
            experience without the hassle.
          </p>

          {/* //SUBHEADING 1 */}
          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Top Cricket Grounds in Sector 48, 23 & Wazirabad
            </h3>
            <p className="text-lg leading-relaxed">
              Discover the top cricket grounds in Gurgaon sectors like Sector
              48, Sector 23, and Wazirabad through Funcircle. These grounds
              offer excellent sports facilities, well-maintained fields, and a
              great environment for playing cricket. Book your preferred cricket
              ground and get ready to enjoy a full game of cricket in some of
              Gurgaon&apos;s best venues.
            </p>
          </div>

          {/* //SUBHEADING 2 */}
          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              How to Book Cricket Matches with Groups
            </h3>
            <p className="text-lg leading-relaxed">
              Funcircle simplifies the process of booking cricket matches with
              groups. Whether you have a premade team or need to find additional
              players, our platform makes it easy to coordinate and book your
              cricket ground. Organize your cricket matches hassle-free and
              enjoy playing with your team or new friends by booking sports
              through our app.
            </p>
          </div>

          {/* //SUBHEADING 3 */}

          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Join Local Cricket Leagues in Delhi NCR
            </h3>
            <p className="text-lg leading-relaxed">
              Take your cricket game to the next level by joining local cricket
              leagues in Delhi NCR through Funcircle. Connect with cricket clubs
              and teams, participate in competitive matches, and enhance your
              skills. Playing in a league is a great way to meet new players,
              improve your game, and enjoy the camaraderie of team sports in the
              city.
            </p>
          </div>
        </section>

        {/* //SECTION 6 */}
        <section className="mb-6">
          <h2 className="text-3xl font-bold mb-4">
            Book Football Turfs in Gurgaon & Delhi NCR
          </h2>
          <img
            src="football-sport-blog.jpg"
            alt=""
            className="bg-black w-full rounded-xl h-60 my-4"
          />
          <p className="text-lg leading-relaxed">
            Football enthusiasts in Gurgaon and Delhi NCR can rejoice! Funcircle
            provides a seamless platform to book football turfs. Whether
            you&apos;re planning a friendly match with friends or looking to
            join a local football group, we&apos;ve got the perfect football
            turf waiting for you. Book sports and play hassle-free.
          </p>

          {/* //SUBHEADING 1 */}
          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Turf Football in Palam Vihar, Sector 65 & Nearby Areas
            </h3>
            <p className="text-lg leading-relaxed">
              Explore the best turf football venues in areas like Palam Vihar,
              Sector 65, and other nearby Gurgaon sectors using Funcircle. These
              sports facilities offer high-quality turfs, excellent amenities,
              and a convenient location for your football games. Find the best
              football turf near you and book your preferred time slot for a
              great game.
            </p>
          </div>

          {/* //SUBHEADING 2 */}
          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Play Football Matches with Friends or New People
            </h3>
            <p className="text-lg leading-relaxed">
              Funcircle allows you to play football matches with your friends or
              connect with new people who share your passion for the sport. Join
              existing football groups, create your own team, or simply find
              individual players to complete your lineup. Enjoy playing football
              without premade groups.
            </p>
          </div>

          {/* //SUBHEADING 3 */}

          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Football Groups and Weekend Games Near You
            </h3>
            <p className="text-lg leading-relaxed">
              Discover local football groups and weekend games near you through
              Funcircle. Connect with other football players in your city, join
              regular matches, and improve your skills. Whether you&apos;re
              looking for casual games or competitive leagues, Funcircle helps
              you find the perfect football community in Gurgaon and Delhi NCR
              and book sports activity of your choice.
            </p>
          </div>
        </section>

        {/* //SECTION 7 */}
        <section className="mb-6">
          <h2 className="text-3xl font-bold mb-4">
            Tennis, Pickleball, and Table Tennis in Gurgaon
          </h2>
          <img
            src="tennis-sport-blog.jpg"
            alt=""
            className="bg-black w-full rounded-xl h-60 my-4"
          />
          <p className="text-lg leading-relaxed">
            If you&apos;re looking to play tennis, pickleball, or table tennis
            in Gurgaon, Funcircle is your ultimate solution. The platform allows
            you to easily find tennis courts, table tennis venues, and even
            discover pickleball courts near you. Connect with fellow players,
            book sports slots with ease, and enjoy these exciting sports in your
            city.
          </p>

          {/* //SUBHEADING 1 */}
          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Join Pickleball & Tennis Groups Based on Your Level{" "}
            </h3>
            <p className="text-lg leading-relaxed">
              Funcircle enables you to join pickleball and tennis groups based
              on your skill level. This ensures that you are playing with people
              who match your abilities, making the game more enjoyable and
              competitive. Whether you are a beginner or an advanced player, you
              can find the best sports group that suits your needs and enhances
              your sports experience. Connect with fellow tennis enthusiasts.
            </p>
          </div>

          {/* //SUBHEADING 2 */}
          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Book Courts for Singles or Doubles Matches{" "}
            </h3>
            <p className="text-lg leading-relaxed">
              With Funcircle, you can easily book courts for singles or doubles
              matches, whether you&apos;re looking to play tennis, table tennis,
              or pickleball. The app offers a hassle-free booking experience,
              allowing you to reserve your preferred court at a convenient time
              and location. Enjoy playing with your friends or family, and make
              the most of your sports activity with Funcircle. Book sports
              today.
            </p>
          </div>

          {/* //SUBHEADING 3 */}

          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Table Tennis Clubs and Casual Matches in Delhi NCR{" "}
            </h3>
            <p className="text-lg leading-relaxed">
              Explore various table tennis clubs and casual matches in Delhi NCR
              through Funcircle. The platform helps you discover the best sports
              venues near you, so you can enjoy a great game of table tennis.
              Connect with other table tennis enthusiasts, improve your skills,
              and make new friends in the city. Find the best venue to play
              table tennis in Delhi NCR.
            </p>
          </div>
        </section>

        {/* //SECTION 8 */}
        <section className="mb-6">
          <h2 className="text-3xl font-bold mb-4">
            Sports Groups, Leaderboards & Community Events
          </h2>
          <img
            src="leaderboard_sport_blog_2.jpeg"
            alt=""
            className="bg-black w-full rounded-xl h-60 my-4"
          />

          <p className="text-lg leading-relaxed">
            Funcircle goes beyond just booking sports facilities; it&apos;s a
            hub for sports groups, leaderboards, and community events in Gurgaon
            and Delhi NCR. It&apos;s where you can find the best sports
            community events, join local tournaments, and track your progress on
            leaderboards. The app helps you enhance your overall sports
            experience and connect with like-minded enthusiasts.
          </p>

          {/* //SUBHEADING 1 */}
          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Find Active Sports Communities in Gurgaon{" "}
            </h3>
            <p className="text-lg leading-relaxed">
              Funcircle helps you discover and join active sports communities in
              Gurgaon. Whether you&apos;re interested in badminton, cricket,
              football, or any other sport, you can find a community that
              matches your interests and skill level. Connect with other sports
              enthusiasts in your city and enjoy playing your favorite sports
              together and book sports through the app.
            </p>
          </div>

          {/* //SUBHEADING 2 */}
          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Join Weekend Events and Leaderboard Tournaments{" "}
            </h3>
            <p className="text-lg leading-relaxed">
              Enhance your sports experience by joining weekend events and
              leaderboard tournaments organized through Funcircle. These events
              and tournaments provide a fun and competitive environment where
              you can showcase your skills, meet new players, and win exciting
              prizes. Participate in various sports events and climb the
              leaderboards to establish yourself as a top player in your city.
              Book sports through funcircle today!
            </p>
          </div>

          {/* //SUBHEADING 3 */}

          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Create or Join Your Own Sports Squad on Funcircle{" "}
            </h3>
            <p className="text-lg leading-relaxed">
              Funcircle offers the unique ability to create or join your own
              sports squad. This feature is perfect for those who enjoy playing
              with a consistent group of friends or want to form a team for
              competitive matches. Organize your squad, coordinate games, and
              compete against other squads in your city. Book sports with your
              own squad today.
            </p>
          </div>
        </section>

        {/* //SECTION 9  */}
        <section className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-[#8936EA]">
            Ready to Play? Book Your First Match with Funcircle
          </h2>

          <p className="text-lg leading-relaxed">
            Ready to dive into the world of sports with Funcircle? Booking your
            first match is incredibly easy and convenient. With a user-friendly
            platform and a wide selection of sports and venues, you can quickly
            find the perfect game for you. Explore the best sports facilities,
            connect with other players, and enjoy an unforgettable sports
            experience. What are you waiting for? Book sports today.
          </p>

          {/* //SUBHEADING 1 */}
          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Instant Booking. No Group Needed. Just Show Up and Play{" "}
            </h3>
            <p className="text-lg leading-relaxed">
              Funcircle offers instant booking for sports facilities, which
              means you don&apos;t need a premade group to play. Simply book
              your preferred court or sports facility, show up, and start
              playing. The platform connects you with other players who are
              looking for teammates, making it easy to join games and enjoy your
              favorite sports without any hassle. Book sports activity of your
              choice and play today.
            </p>
          </div>

          {/* //SUBHEADING 2 */}
          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Explore All Sports Options in Gurgaon & Delhi NCR{" "}
            </h3>
            <p className="text-lg leading-relaxed">
              Funcircle provides a wide array of sports options to explore in
              Gurgaon and Delhi NCR. Whether you&apos;re interested in
              badminton, cricket, football, tennis, table tennis, or any other
              sport, you can find it all on our platform. Discover new sports,
              try different activities, and enjoy a diverse and fulfilling
              sports experience in your city. Explore the best sports near you!
            </p>
          </div>

          {/* //SUBHEADING 3 */}

          <div className="my-4">
            <h3 className="text-2xl font-bold ">
              {" "}
              Download the Funcircle App and Start Playing Today!{" "}
            </h3>
            <p className="text-lg leading-relaxed">
              Don&apos;t wait any longer to experience the fun and excitement of
              playing sports with Funcircle. Download the app today and start
              playing! &apos;Tired of not finding courts and similar level
              players, we make that fully sorted for you, and always get
              confirmed slots from our app, no more booking and coordination ka
              jhanjhat, book your slots easily and play, book with ease.&apos;
              Join sports groups with same skill level now!
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
