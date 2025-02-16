
import Link from "next/link";
import Footer from "./components/footer";
import FAQs from "./components/FAQs";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <div className="">
      <Navbar/>
      {/* //PART 1 */}
      <div className="flex flex-col bg-black">

        {/* LOGO ROW */}
        <div className="flex justify-between">
          <button className="px-4 py-4 bg-zinc-800 font-bold rounded-xl font-sans mx-4 my-2">LOGO</button>
        </div>

        {/* //APP HEADLINE */}
        <div className="flex justify-center mt-8">
          <button className="text-white px-4 py-[10px] custom-color1 font-bold border border-red-800 text-sm bg-zinc-800 font-bold rounded-xl font-sans ">YOUR MOOD YOUR VIBE</button>
        </div>

        {/* //PARA1 */}
        <div className="flex justify-center my-8">
          <p className="text-center font-sans lg:text-6xl text-4xl font-black">
            <span className="bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">Meet New People</span>
            <br /><span className="text-white "> Based on Interests</span> <br />
            <span className="font-light text-white "> & Location with</span>
            <br />
            <span className="bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">Fun Circle! </span></p>
        </div>

        {/* Download buttons */}
        <div className="flex justify-center items-center mx-[8px] pb-12">
          <div className="flex m-2 lg:py-4 py-2 px-4 border items-center border-red-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play text-white mr-4"><polygon points="6 3 20 12 6 21 6 3" /></svg>
            <p className="text-sm font-sans text-white">Download on the <span className="font-bold">Play store</span> </p>
          </div>
          <div className="flex m-2 py-2 lg:py-4 px-4 bg-[#FF6346] border items-center border-red-600 rounded-lg">
            <svg className=" mr-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
              <path d="M 33.394531 0 A 1.0001 1.0001 0 0 0 33.320312 0.00390625 C 30.483287 0.23086833 27.514392 1.8335543 25.623047 4.1699219 A 1.0001 1.0001 0 0 0 25.615234 4.1796875 C 24.00384 6.2207656 22.538942 9.1587256 23.117188 12.28125 A 1.0001 1.0001 0 0 0 23.167969 12.460938 C 22.698358 12.311724 22.217906 12.145195 21.701172 11.958984 C 20.301057 11.454438 18.684404 10.900391 16.699219 10.900391 C 12.712373 10.900391 8.7255571 13.205354 6.1640625 17.150391 C 2.4136353 22.783543 3.1878409 32.778446 8.7617188 41.345703 A 1.0001 1.0001 0 0 0 8.7636719 41.347656 C 9.7300853 42.822708 10.888254 44.459361 12.308594 45.771484 C 13.726036 47.080931 15.460301 48.093523 17.488281 48.097656 C 19.24239 48.148536 20.454207 47.578023 21.529297 47.101562 C 22.609433 46.62282 23.612602 46.199219 25.5 46.199219 A 1.0001 1.0001 0 0 0 25.523438 46.199219 C 27.409395 46.153219 28.400158 46.553371 29.453125 47.025391 C 30.506092 47.49741 31.678168 48.099609 33.400391 48.099609 A 1.0001 1.0001 0 0 0 33.429688 48.099609 C 35.474108 48.039479 37.235327 46.947764 38.699219 45.564453 C 40.157197 44.18673 41.361983 42.485126 42.332031 40.955078 L 42.335938 40.949219 C 43.760956 38.81089 44.309786 37.613344 45.408203 35.216797 A 1.0001 1.0001 0 0 0 44.859375 33.867188 C 41.327688 32.508845 39.287623 29.333479 38.982422 26.021484 C 38.677221 22.70949 40.071371 19.345495 43.570312 17.482422 A 1.0001 1.0001 0 0 0 43.894531 15.992188 C 41.41599 12.759307 37.766373 10.900391 34.300781 10.900391 C 32.042051 10.900391 30.3948 11.455069 29.056641 11.964844 C 28.111313 12.324969 27.335399 12.635227 26.53125 12.791016 C 28.718476 12.1851 30.674822 10.757058 31.980469 9.125 A 1.0001 1.0001 0 0 0 31.984375 9.1191406 C 33.61973 7.0476993 34.95372 4.0103642 34.384766 0.82421875 A 1.0001 1.0001 0 0 0 33.394531 0 z M 32.306641 2.3691406 C 32.280421 4.4009411 31.555854 6.4343789 30.417969 7.8769531 C 29.219278 9.3742199 27.170947 10.493986 25.203125 10.818359 C 25.238475 8.8763946 26.016574 6.9032537 27.181641 5.4257812 C 28.429911 3.8860518 30.42454 2.8427058 32.306641 2.3691406 z M 16.699219 12.900391 C 18.314034 12.900391 19.648551 13.34439 21.023438 13.839844 C 22.398322 14.335298 23.820115 14.900391 25.5 14.900391 C 27.179885 14.900391 28.480738 14.324209 29.767578 13.833984 C 31.054418 13.34376 32.359511 12.900391 34.300781 12.900391 C 36.763974 12.900391 39.525299 14.2077 41.607422 16.478516 C 38.211077 18.82834 36.657322 22.57118 36.992188 26.205078 C 37.330481 29.876205 39.535812 33.345723 43.164062 35.181641 C 42.358078 36.927273 41.838943 38.089241 40.667969 39.845703 A 1.0001 1.0001 0 0 0 40.654297 39.865234 C 39.726361 41.330396 38.58728 42.919639 37.326172 44.111328 C 36.06822 45.300035 34.73296 46.052348 33.380859 46.095703 C 32.117391 46.090903 31.386725 45.699154 30.271484 45.199219 C 29.150224 44.696585 27.691948 44.14804 25.480469 44.201172 L 25.476562 44.201172 C 23.279505 44.205972 21.835909 44.779199 20.720703 45.273438 C 19.600836 45.769742 18.865714 46.142594 17.533203 46.099609 A 1.0001 1.0001 0 0 0 17.5 46.099609 C 16.133333 46.099609 14.870675 45.415611 13.666016 44.302734 C 12.461994 43.190448 11.370759 41.678193 10.4375 40.253906 L 10.435547 40.251953 C 5.2127435 32.222646 4.7870606 22.821362 7.8320312 18.253906 A 1.0001 1.0001 0 0 0 7.8398438 18.244141 C 10.078498 14.792882 13.488108 12.900391 16.699219 12.900391 z"></path>
            </svg>
            <p className="text-sm font-sans">Download on the <span className="font-bold">app store</span> </p>
          </div>
        </div>

        {/* //Moving banner */}
        <div className="w-full overflow-hidden bg-[#FF7144] py-2">
          <div className="animate-marquee whitespace-nowrap text-sm">
            <span className="text-white  font-bold mx-4">✨ Welcome to Our Website! ✨</span>
            <span className="text-white  font-bold mx-4">🚀 Explore Our Amazing Features! 🚀</span>
            <span className="text-white  font-bold mx-4">🎉 Join Us Today! 🎉</span>
          </div>
        </div>

      </div>


      {/* //PART 2 */}
      {/* //WHAT IS FUN CIRCLE */}
      <div className="flex flex-col px-4 text-black lg:px-80 lg:py-12 bg-zinc-100 ">
        <p className=" py-2 border border-red-700  mt-8 bg-white text-sm w-40 rounded-lg font-bold px-4">IN REAL LIFE</p>
        <div className="lg:flex lg:flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-2xl lg:text-4xl mt-4 font-sans font-extrabold font-bold ">What is fun circle ?</p>
            <p className=" my-4 font-sans text-lg lg:text-2xl ">Join meetups based on interests ,sports etc. Meet people in social interactions and have fun</p>
            {/* Download buttons */}
            <div className=" lg:flex  hidden  items-center  pb-12">
              <div className="flex lg:py-4 py-2 px-4 border items-center border-red-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play  mr-4"><polygon points="6 3 20 12 6 21 6 3" /></svg>
                <p className="text-sm font-sans">Download on the <span className="font-bold">Play store</span> </p>
              </div>
              <div className="flex mx-2 py-2 lg:py-4 px-4 bg-[#FF6346] border items-center border-red-600 rounded-lg">
                <svg className=" mr-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
                  <path d="M 33.394531 0 A 1.0001 1.0001 0 0 0 33.320312 0.00390625 C 30.483287 0.23086833 27.514392 1.8335543 25.623047 4.1699219 A 1.0001 1.0001 0 0 0 25.615234 4.1796875 C 24.00384 6.2207656 22.538942 9.1587256 23.117188 12.28125 A 1.0001 1.0001 0 0 0 23.167969 12.460938 C 22.698358 12.311724 22.217906 12.145195 21.701172 11.958984 C 20.301057 11.454438 18.684404 10.900391 16.699219 10.900391 C 12.712373 10.900391 8.7255571 13.205354 6.1640625 17.150391 C 2.4136353 22.783543 3.1878409 32.778446 8.7617188 41.345703 A 1.0001 1.0001 0 0 0 8.7636719 41.347656 C 9.7300853 42.822708 10.888254 44.459361 12.308594 45.771484 C 13.726036 47.080931 15.460301 48.093523 17.488281 48.097656 C 19.24239 48.148536 20.454207 47.578023 21.529297 47.101562 C 22.609433 46.62282 23.612602 46.199219 25.5 46.199219 A 1.0001 1.0001 0 0 0 25.523438 46.199219 C 27.409395 46.153219 28.400158 46.553371 29.453125 47.025391 C 30.506092 47.49741 31.678168 48.099609 33.400391 48.099609 A 1.0001 1.0001 0 0 0 33.429688 48.099609 C 35.474108 48.039479 37.235327 46.947764 38.699219 45.564453 C 40.157197 44.18673 41.361983 42.485126 42.332031 40.955078 L 42.335938 40.949219 C 43.760956 38.81089 44.309786 37.613344 45.408203 35.216797 A 1.0001 1.0001 0 0 0 44.859375 33.867188 C 41.327688 32.508845 39.287623 29.333479 38.982422 26.021484 C 38.677221 22.70949 40.071371 19.345495 43.570312 17.482422 A 1.0001 1.0001 0 0 0 43.894531 15.992188 C 41.41599 12.759307 37.766373 10.900391 34.300781 10.900391 C 32.042051 10.900391 30.3948 11.455069 29.056641 11.964844 C 28.111313 12.324969 27.335399 12.635227 26.53125 12.791016 C 28.718476 12.1851 30.674822 10.757058 31.980469 9.125 A 1.0001 1.0001 0 0 0 31.984375 9.1191406 C 33.61973 7.0476993 34.95372 4.0103642 34.384766 0.82421875 A 1.0001 1.0001 0 0 0 33.394531 0 z M 32.306641 2.3691406 C 32.280421 4.4009411 31.555854 6.4343789 30.417969 7.8769531 C 29.219278 9.3742199 27.170947 10.493986 25.203125 10.818359 C 25.238475 8.8763946 26.016574 6.9032537 27.181641 5.4257812 C 28.429911 3.8860518 30.42454 2.8427058 32.306641 2.3691406 z M 16.699219 12.900391 C 18.314034 12.900391 19.648551 13.34439 21.023438 13.839844 C 22.398322 14.335298 23.820115 14.900391 25.5 14.900391 C 27.179885 14.900391 28.480738 14.324209 29.767578 13.833984 C 31.054418 13.34376 32.359511 12.900391 34.300781 12.900391 C 36.763974 12.900391 39.525299 14.2077 41.607422 16.478516 C 38.211077 18.82834 36.657322 22.57118 36.992188 26.205078 C 37.330481 29.876205 39.535812 33.345723 43.164062 35.181641 C 42.358078 36.927273 41.838943 38.089241 40.667969 39.845703 A 1.0001 1.0001 0 0 0 40.654297 39.865234 C 39.726361 41.330396 38.58728 42.919639 37.326172 44.111328 C 36.06822 45.300035 34.73296 46.052348 33.380859 46.095703 C 32.117391 46.090903 31.386725 45.699154 30.271484 45.199219 C 29.150224 44.696585 27.691948 44.14804 25.480469 44.201172 L 25.476562 44.201172 C 23.279505 44.205972 21.835909 44.779199 20.720703 45.273438 C 19.600836 45.769742 18.865714 46.142594 17.533203 46.099609 A 1.0001 1.0001 0 0 0 17.5 46.099609 C 16.133333 46.099609 14.870675 45.415611 13.666016 44.302734 C 12.461994 43.190448 11.370759 41.678193 10.4375 40.253906 L 10.435547 40.251953 C 5.2127435 32.222646 4.7870606 22.821362 7.8320312 18.253906 A 1.0001 1.0001 0 0 0 7.8398438 18.244141 C 10.078498 14.792882 13.488108 12.900391 16.699219 12.900391 z"></path>
                </svg>
                <p className="text-sm font-sans">Download on the <span className="font-bold">app store</span> </p>
              </div>
            </div>
          </div>
          <img className=" mr-12  rounded-lg lg:w-92" src="https://www.wikihow.com/images/thumb/7/79/13675348-2.jpg/v4-460px-13675348-2.jpg.webp" />
        </div>


      </div>

      {/* //How it works */}
      <div className="lg:flex flex-col lg:flex-row lg:justify-between text-black mx-4 lg:px-80 mt-8   ">
        <div className="flex flex-col">
          <p className="px-4 py-2 border border-red-700 bg-white w-40 rounded-lg font-bold">How it works ?</p>
          <p className="text-2xl lg:text-4xl mt-4 font-[__sharpGrotesk_34461d] font-bold my-2">Explore our app <br /> and see how it works ? </p>
        </div>

        <div className="lg:grid lg:grid-cols-2">
          <div id="card " className="lg:w-[350px] lg:mx-4 ">
            <img src="1.png" className="my-4  rounded-lg" />
            <p className="text-2xl mt-4 font-[__sharpGrotesk_34461d] font-bold">Set Your Mood
            </p>
            <p className="lg:text-lg text-zinc-500 -mt-1 font-[__sharpGrotesk_34461d]  my-2">Turn on your availability, and set your mood and what you feel like doing – from grabbing a bite to exploring the city.
            </p>
          </div>
          <div id="card " className="lg:w-[350px] lg:mx-4 ">
            <img src="2.png" className="my-4  rounded-lg" />
            <p className="text-2xl mt-4 font-[__sharpGrotesk_34461d] font-bold">Set Your Mood
            </p>
            <p className="lg:text-lg text-zinc-500 -mt-1 font-[__sharpGrotesk_34461d]  my-2">Turn on your availability, and set your mood and what you feel like doing – from grabbing a bite to exploring the city.
            </p>
          </div>
          <div id="card " className="lg:w-[350px] lg:mx-4 ">
            <img src="3.png" className="my-4  rounded-lg" />
            <p className="text-2xl mt-4 font-[__sharpGrotesk_34461d] font-bold">Set Your Mood
            </p>
            <p className="lg:text-lg text-zinc-500 -mt-1 font-[__sharpGrotesk_34461d]  my-2">Turn on your availability, and set your mood and what you feel like doing – from grabbing a bite to exploring the city.
            </p>
          </div>
        </div>


      </div>


      {/* //PART3 */}
      <div id="cities" className="lg:flex flex-col lg:flex-row lg:justify-between pb-8 text-white px-4 lg:px-80 mt-8 bg-zinc-950">
        <div className="flex flex-col mx-4">
          <p className="px-4 py-2 border border-red-700 mt-12 w-40 rounded-lg font-bold">In your city ?</p>
          <p className="text-2xl lg:text-4xl mt-4  font-sans">Popular cities on Fun circle</p>
          <p className="text-xl lg:text-xl mt-4 font-sans">Looking for fun things to do near you?<br /> See what Meetup organizers are planning in cities around the country.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-3 lg:my-12 my-4 ">
          <div className="flex flex-col items-center my-2 lg:mx-4" id="cityCard">
            <img src="faceout_bangalore_correct.jpg" className="w-24 lg:w-48 rounded-full" />
            <p className="text-zinc-400 text-lg mt-2 ">Bangalore</p>
          </div>
          <div className="flex flex-col items-center my-2 " id="cityCard">
            <img src="faceout_delhi_correct.jpg" className="w-24 lg:w-48 rounded-full" />
            <p className="text-zinc-400 text-lg mt-2 ">Delhi</p>
          </div>
          <div className="flex flex-col items-center my-2 " id="cityCard">
            <img src="faceout_hyderabad.jpg" className="w-24 lg:w-48 rounded-full" />
            <p className="text-zinc-400 text-lg mt-2 ">Hyderabad</p>
          </div>
          <div className="flex flex-col items-center  my-2 " id="cityCard">
            <img src="faceout_mumbai_correct.png" className="w-24 lg:w-48 rounded-full" />
            <p className="text-zinc-400 text-lg mt-2 ">Mumbai</p>
          </div>
          <div className="flex flex-col items-center my-2 " id="cityCard">
            <img src="faceout_gurgaon_correct.png" className="w-24 lg:w-48 rounded-full" />
            <p className="text-zinc-400 text-lg mt-2 ">Gurgaon</p>
          </div>
        </div>
      </div>

      {/* PART 4 */}
      <div id="features" className=" flex-col items-center pb-8 text-white px-4 lg:px-40 mt-8 ">
        {/* HEADER FOR PART 4 */}
        <div className="flex justify-center">
          <p className="px-4 py-2 text-center border-2 border-red-700 mt-4 w-40 rounded-lg font-bold bg-black">Features?</p>
        </div>
        <div className="flex justify-center">
          <p className="px-4 py-2  lg:text-5xl text-2xl text-black mt-4  rounded-lg font-bold ">Discover our best features</p>
        </div>
        {/* //FOR MOBILE */}
        <div className="flex flex-col my-8 lg:hidden">
          {/* FEATURE 1 */}
          <div className="flex justify-start lg:justify-center my-4">
            <div className="flex flex-col">
              <p className="text-xl text-black text-right font-bold mx-2 border-t-2  border-red-700">Easy Joining </p>
              <p className="text-lg w-40 text-black text-right mx-2 text-sm">Join the events easily by going through the events on fun circle</p>
            </div>
          </div>
          {/* FEATURE 2 */}

          <div className="flex justify-end -my-4">
            <div className="flex flex-col">
              <p className="text-xl text-black text-left font-bold mx-2 border-t-2  border-red-700">add people to <br />connections </p>
              <p className="text-lg w-40 text-black text-left mx-2 text-sm">Join the events easily by going through the events on fun circle</p>
            </div>
          </div>
          {/* IMAGE */}

          <div className="flex justify-center my-4">
            <img src="Check your interests from outdoor to indoor.png" className="rounded-lg lg:mx-20 w-[500px]" />
          </div>
          {/* FEATURE 3 */}

          <div className="flex justify-start my-4">
            <div className="flex flex-col">
              <p className="text-xl text-black text-right font-bold mx-2 border-t-2  border-red-700">On venue<br /> payment</p>
              <p className="text-lg w-40 text-black text-right mx-2 text-sm">Join the events easily by going through the events on fun circle</p>
            </div>
          </div>
          {/* FEATURE 4 */}

          <div className="flex justify-end -my-4">
            <div className="flex flex-col">
              <p className="text-xl text-black text-left font-bold mx-2 border-t-2  border-red-700">Chat functionality </p>
              <p className="text-lg w-40 text-black text-left mx-2 text-sm">Join the events easily by going through the events on fun circle</p>
            </div>
          </div>
        </div>
        {/* FOR PC */}
        <div className="lg:flex justify-center hidden">
          {/* FEATURE 1 */}
          <div className="flex flex-col my-4">
            <div className="flex flex-col my-12">
              <p className="text-xl text-black text-right font-bold mx-2 border-t-2  border-red-700">Easy Joining </p>
              <p className="text-lg w-40 text-black text-right mx-2 text-sm">Join the events easily by going through the events on fun circle</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xl text-black text-right font-bold mx-2 border-t-2  border-red-700">add people to <br />connections </p>
              <p className="text-lg w-40 text-black text-right mx-2 text-sm">Join the events easily by going through the events on fun circle</p>
            </div>
          </div>


          {/* IMAGE */}

          <div className="flex justify-center my-4">
            <img src="Check your interests from outdoor to indoor.png" className="rounded-lg  w-[500px]" />
          </div>
          {/* FEATURE 3 */}
          {/* FEATURE 1 */}
          <div className="flex flex-col my-20">
            <div className="flex flex-col my-12">
              <p className="text-xl text-black text-left font-bold mx-2 border-t-2  border-red-700">On venue<br /> payment </p>
              <p className="text-lg w-40 text-black text-left  mx-2 text-sm">Join the events easily by going through the events on fun circle</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xl text-black text-left  font-bold mx-2 border-t-2  border-red-700">Chat functionality </p>
              <p className="text-lg w-40 text-black text-left mx-2 text-sm">Join the events easily by going through the events on fun circle</p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 5 */}
      <div id="joinNow" className=" flex-col justify-between text-white lg:px-80 mt-8 bg-zinc-950 p-12  lg:py-20">
        <p className="text-5xl text-white font-sans  my-4 ">Join Now</p>
        <p className="lg:text-4xl text-2xl text-white font-sans  my-4 ">Join Now and start meeting your friends on FunCircle ,now available on IOS and Android</p>
        {/* Download buttons */}
        <div className=" flex  items-center  py-12">
          <div className="flex lg:py-4 py-2 px-4 border items-center border-red-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play  mr-4"><polygon points="6 3 20 12 6 21 6 3" /></svg>
            <p className="text-sm font-sans">Download on the <span className="font-bold">Play store</span> </p>
          </div>
          <div className="flex mx-2 py-2 lg:py-4 px-4 bg-[#FF6346] border items-center border-red-600 rounded-lg">
            <svg className=" mr-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
              <path d="M 33.394531 0 A 1.0001 1.0001 0 0 0 33.320312 0.00390625 C 30.483287 0.23086833 27.514392 1.8335543 25.623047 4.1699219 A 1.0001 1.0001 0 0 0 25.615234 4.1796875 C 24.00384 6.2207656 22.538942 9.1587256 23.117188 12.28125 A 1.0001 1.0001 0 0 0 23.167969 12.460938 C 22.698358 12.311724 22.217906 12.145195 21.701172 11.958984 C 20.301057 11.454438 18.684404 10.900391 16.699219 10.900391 C 12.712373 10.900391 8.7255571 13.205354 6.1640625 17.150391 C 2.4136353 22.783543 3.1878409 32.778446 8.7617188 41.345703 A 1.0001 1.0001 0 0 0 8.7636719 41.347656 C 9.7300853 42.822708 10.888254 44.459361 12.308594 45.771484 C 13.726036 47.080931 15.460301 48.093523 17.488281 48.097656 C 19.24239 48.148536 20.454207 47.578023 21.529297 47.101562 C 22.609433 46.62282 23.612602 46.199219 25.5 46.199219 A 1.0001 1.0001 0 0 0 25.523438 46.199219 C 27.409395 46.153219 28.400158 46.553371 29.453125 47.025391 C 30.506092 47.49741 31.678168 48.099609 33.400391 48.099609 A 1.0001 1.0001 0 0 0 33.429688 48.099609 C 35.474108 48.039479 37.235327 46.947764 38.699219 45.564453 C 40.157197 44.18673 41.361983 42.485126 42.332031 40.955078 L 42.335938 40.949219 C 43.760956 38.81089 44.309786 37.613344 45.408203 35.216797 A 1.0001 1.0001 0 0 0 44.859375 33.867188 C 41.327688 32.508845 39.287623 29.333479 38.982422 26.021484 C 38.677221 22.70949 40.071371 19.345495 43.570312 17.482422 A 1.0001 1.0001 0 0 0 43.894531 15.992188 C 41.41599 12.759307 37.766373 10.900391 34.300781 10.900391 C 32.042051 10.900391 30.3948 11.455069 29.056641 11.964844 C 28.111313 12.324969 27.335399 12.635227 26.53125 12.791016 C 28.718476 12.1851 30.674822 10.757058 31.980469 9.125 A 1.0001 1.0001 0 0 0 31.984375 9.1191406 C 33.61973 7.0476993 34.95372 4.0103642 34.384766 0.82421875 A 1.0001 1.0001 0 0 0 33.394531 0 z M 32.306641 2.3691406 C 32.280421 4.4009411 31.555854 6.4343789 30.417969 7.8769531 C 29.219278 9.3742199 27.170947 10.493986 25.203125 10.818359 C 25.238475 8.8763946 26.016574 6.9032537 27.181641 5.4257812 C 28.429911 3.8860518 30.42454 2.8427058 32.306641 2.3691406 z M 16.699219 12.900391 C 18.314034 12.900391 19.648551 13.34439 21.023438 13.839844 C 22.398322 14.335298 23.820115 14.900391 25.5 14.900391 C 27.179885 14.900391 28.480738 14.324209 29.767578 13.833984 C 31.054418 13.34376 32.359511 12.900391 34.300781 12.900391 C 36.763974 12.900391 39.525299 14.2077 41.607422 16.478516 C 38.211077 18.82834 36.657322 22.57118 36.992188 26.205078 C 37.330481 29.876205 39.535812 33.345723 43.164062 35.181641 C 42.358078 36.927273 41.838943 38.089241 40.667969 39.845703 A 1.0001 1.0001 0 0 0 40.654297 39.865234 C 39.726361 41.330396 38.58728 42.919639 37.326172 44.111328 C 36.06822 45.300035 34.73296 46.052348 33.380859 46.095703 C 32.117391 46.090903 31.386725 45.699154 30.271484 45.199219 C 29.150224 44.696585 27.691948 44.14804 25.480469 44.201172 L 25.476562 44.201172 C 23.279505 44.205972 21.835909 44.779199 20.720703 45.273438 C 19.600836 45.769742 18.865714 46.142594 17.533203 46.099609 A 1.0001 1.0001 0 0 0 17.5 46.099609 C 16.133333 46.099609 14.870675 45.415611 13.666016 44.302734 C 12.461994 43.190448 11.370759 41.678193 10.4375 40.253906 L 10.435547 40.251953 C 5.2127435 32.222646 4.7870606 22.821362 7.8320312 18.253906 A 1.0001 1.0001 0 0 0 7.8398438 18.244141 C 10.078498 14.792882 13.488108 12.900391 16.699219 12.900391 z"></path>
            </svg>
            <p className="text-sm font-sans">Download on the <span className="font-bold">app store</span> </p>
          </div>
        </div>
      </div>
      <FAQs />
      <Footer />
    </div>

  );
}
