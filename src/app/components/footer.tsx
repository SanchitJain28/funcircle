"use client"
import Link from 'next/link'
import React from 'react'
export default function Footer() {
  return (
    <div>
        {/* // PART 6 FOOTER */}
      <div className="lg:flex justify-between lg:px-20 lg:py-20 px-8 py-8 bg-black text-white">
        <div className="flex flex-col">
          <p className="text-4xl font-bold text-left text-white my-4">Explore your hobbies, find your tribe</p>
          {/* Download buttons */}
          <div className="flex">
            <div className="flex lg:py-4 py-2 px-4 bg-yellow-400  border items-center border-2 border-black rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play text-black mr-4"><polygon points="6 3 20 12 6 21 6 3" /></svg>
              <p className="text-sm font-sans text-black">Download on the <span className="font-bold">Play store</span> </p>
            </div>
            <div className="flex mx-2 py-4 lg:py-4 px-4 bg-yellow-400 border items-center border-2 border-black rounded-lg">
              <svg className=" mr-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
                <path d="M 33.394531 0 A 1.0001 1.0001 0 0 0 33.320312 0.00390625 C 30.483287 0.23086833 27.514392 1.8335543 25.623047 4.1699219 A 1.0001 1.0001 0 0 0 25.615234 4.1796875 C 24.00384 6.2207656 22.538942 9.1587256 23.117188 12.28125 A 1.0001 1.0001 0 0 0 23.167969 12.460938 C 22.698358 12.311724 22.217906 12.145195 21.701172 11.958984 C 20.301057 11.454438 18.684404 10.900391 16.699219 10.900391 C 12.712373 10.900391 8.7255571 13.205354 6.1640625 17.150391 C 2.4136353 22.783543 3.1878409 32.778446 8.7617188 41.345703 A 1.0001 1.0001 0 0 0 8.7636719 41.347656 C 9.7300853 42.822708 10.888254 44.459361 12.308594 45.771484 C 13.726036 47.080931 15.460301 48.093523 17.488281 48.097656 C 19.24239 48.148536 20.454207 47.578023 21.529297 47.101562 C 22.609433 46.62282 23.612602 46.199219 25.5 46.199219 A 1.0001 1.0001 0 0 0 25.523438 46.199219 C 27.409395 46.153219 28.400158 46.553371 29.453125 47.025391 C 30.506092 47.49741 31.678168 48.099609 33.400391 48.099609 A 1.0001 1.0001 0 0 0 33.429688 48.099609 C 35.474108 48.039479 37.235327 46.947764 38.699219 45.564453 C 40.157197 44.18673 41.361983 42.485126 42.332031 40.955078 L 42.335938 40.949219 C 43.760956 38.81089 44.309786 37.613344 45.408203 35.216797 A 1.0001 1.0001 0 0 0 44.859375 33.867188 C 41.327688 32.508845 39.287623 29.333479 38.982422 26.021484 C 38.677221 22.70949 40.071371 19.345495 43.570312 17.482422 A 1.0001 1.0001 0 0 0 43.894531 15.992188 C 41.41599 12.759307 37.766373 10.900391 34.300781 10.900391 C 32.042051 10.900391 30.3948 11.455069 29.056641 11.964844 C 28.111313 12.324969 27.335399 12.635227 26.53125 12.791016 C 28.718476 12.1851 30.674822 10.757058 31.980469 9.125 A 1.0001 1.0001 0 0 0 31.984375 9.1191406 C 33.61973 7.0476993 34.95372 4.0103642 34.384766 0.82421875 A 1.0001 1.0001 0 0 0 33.394531 0 z M 32.306641 2.3691406 C 32.280421 4.4009411 31.555854 6.4343789 30.417969 7.8769531 C 29.219278 9.3742199 27.170947 10.493986 25.203125 10.818359 C 25.238475 8.8763946 26.016574 6.9032537 27.181641 5.4257812 C 28.429911 3.8860518 30.42454 2.8427058 32.306641 2.3691406 z M 16.699219 12.900391 C 18.314034 12.900391 19.648551 13.34439 21.023438 13.839844 C 22.398322 14.335298 23.820115 14.900391 25.5 14.900391 C 27.179885 14.900391 28.480738 14.324209 29.767578 13.833984 C 31.054418 13.34376 32.359511 12.900391 34.300781 12.900391 C 36.763974 12.900391 39.525299 14.2077 41.607422 16.478516 C 38.211077 18.82834 36.657322 22.57118 36.992188 26.205078 C 37.330481 29.876205 39.535812 33.345723 43.164062 35.181641 C 42.358078 36.927273 41.838943 38.089241 40.667969 39.845703 A 1.0001 1.0001 0 0 0 40.654297 39.865234 C 39.726361 41.330396 38.58728 42.919639 37.326172 44.111328 C 36.06822 45.300035 34.73296 46.052348 33.380859 46.095703 C 32.117391 46.090903 31.386725 45.699154 30.271484 45.199219 C 29.150224 44.696585 27.691948 44.14804 25.480469 44.201172 L 25.476562 44.201172 C 23.279505 44.205972 21.835909 44.779199 20.720703 45.273438 C 19.600836 45.769742 18.865714 46.142594 17.533203 46.099609 A 1.0001 1.0001 0 0 0 17.5 46.099609 C 16.133333 46.099609 14.870675 45.415611 13.666016 44.302734 C 12.461994 43.190448 11.370759 41.678193 10.4375 40.253906 L 10.435547 40.251953 C 5.2127435 32.222646 4.7870606 22.821362 7.8320312 18.253906 A 1.0001 1.0001 0 0 0 7.8398438 18.244141 C 10.078498 14.792882 13.488108 12.900391 16.699219 12.900391 z"></path>
              </svg>
              <p className="text-sm font-sans text-black">Download on the <span className="font-bold">app store</span> </p>
            </div>
          </div>
          <div className="">
            <p className="text-2xl font-light font-sans text-left text-white my-4">Follow us on</p>
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram mr-4 "><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube mx-4"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin mx-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
            </div>

            <p className="text-2xl font-light font-sans text-left text-white my-4">© 2024 O28 Community India Private Limited. </p>

          </div>
        </div>
        <div id="navLinks" className="flex-col flex basis-1/3">
          <Link href='venuePartners 'className="text-white font-bold text-lg my-2 font-sans ">Venue partners</Link>
          <Link href='about' className="text-white font-bold text-lg my-2 font-sans ">About us</Link>
          <Link href='contactUs ' className="text-white font-bold text-lg my-2 font-sans ">Contact us</Link>
          <Link href='termsandservice' className="text-white font-bold text-lg my-2 font-sans ">Terms and conditions</Link>
          <Link href='privacyPolicy ' className="text-white font-bold text-lg my-2 font-sans ">Privacy policy</Link>
        </div>
      </div>
    </div>
  )
}
