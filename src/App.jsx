import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  // [STATE]: Controls when to switch from Intro to Main Site
  let [showContent, setShowContent] = useState(false);

  // ---------------------------------------------------------
  // [SECTION 1]: INTRO ANIMATION LOGIC
  // ---------------------------------------------------------
  useGSAP(() => {
    const tl = gsap.timeline();

    // [ANIMATION]: Initial Mask Rotation
    tl.to(".vi-mask-group", {
      rotate: 10,                 // [EDIT]: Rotation angle
      duration: 2,                // [EDIT]: How long the rotation takes
      ease: "Power4.easeInOut",   // [EDIT]: Animation smoothing style
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      // [ANIMATION]: Zoom In Effect
      scale: 10,                  // [EDIT]: How big the mask grows (Zoom level)
      duration: 2,                // [EDIT]: Zoom duration
      delay: -1.8,                // [EDIT]: Overlap with previous animation (makes it smoother)
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,                 // [EDIT]: Fades out at the end
      onUpdate: function () {
        // [LOGIC]: Triggers the switch to the main site when zoom is 90% done
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  // ---------------------------------------------------------
  // [SECTION 2]: MAIN SITE ANIMATION LOGIC
  // ---------------------------------------------------------
  useGSAP(() => {
    if (!showContent) return;

    // [ANIMATION]: Main Container Reveal
    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,               // [EDIT]: Reveal speed
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    // [ANIMATION]: Sky Image Reveal
    gsap.to(".sky", {
      scale: 1.1,                // [EDIT]: Final scale of sky
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    // [ANIMATION]: Background Image Reveal
    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    // [ANIMATION]: Character Pop-up
    gsap.to(".character", {
      scale: 0.4,                // [EDIT]: Final character size
      x: "35%",                  // [EDIT]: Final character horizontal position
      bottom: "-50%",            // [EDIT]: Final character vertical position
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    // [ANIMATION]: Text Reveal
    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    // ---------------------------------------------------------
    // [SECTION 3]: MOUSE MOVEMENT PARALLAX EFFECT
    // ---------------------------------------------------------
    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40; // [EDIT]: *40 controls sensitivity
      
      // [EDIT]: Move Text based on mouse
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      // [EDIT]: Move Sky based on mouse
      gsap.to(".sky", {
        x: xMove,
      });
      // [EDIT]: Move Background based on mouse
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });
  }, [showContent]);

  return (
    <>
      {/* --------------------------------------------------------- */}
      {/* [JSX PART 1]: INTRO SCREEN (The Mask Effect) */}
      {/* --------------------------------------------------------- */}
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]"> 
        {/* [EDIT]: bg-[#000] changes the outer background color */}
        
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="600"             // [EDIT]: Size of the masking text
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"   // [EDIT]: Font of the masking text
                >
                  {/* [EDIT]: CHANGE INTRO TEXT HERE */}
                  ///
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"               // [EDIT]: IMAGE INSIDE THE TEXT MASK
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {/* --------------------------------------------------------- */}
      {/* [JSX PART 2]: MAIN WEBSITE CONTENT */}
      {/* --------------------------------------------------------- */}
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          
          {/* --- LANDING PAGE SECTION --- */}
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            
            {/* [NAVBAR] */}
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-7">
                {/* [LOGO DECORATION LINES] */}
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-16 h-2 bg-white"></div> {/* [EDIT]: Line 1 Color/Size */}
                  <div className="line w-8 h-2 bg-white"></div>  {/* [EDIT]: Line 2 Color/Size */}
                  <div className="line w-10 h-2 bg-white"></div>  {/* [EDIT]: Line 3 Color/Size */}
                </div>
                {/* [WELCOME TEXT] */}
                <h3 className="font-['Pricedown'] text-4xl -mt-[2px] leading-none text-yellow-500"> {/* [EDIT]: text-orange-500 changes color */}
                  WELCOME...  {/* [EDIT]: Change Name Here */}
                </h3>
              </div>
            </div>

            {/* [HERO IMAGES AREA] */}
            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              {/* [IMAGE]: SKY BACKGROUND */}
              
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky3.png"          // [EDIT]: Change Sky Image
                alt=""
              />

              {/* [IMAGE]: MAIN BACKGROUND */}
              <img
                className="absolute scale-[3] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"           // [EDIT]: Change Main Background Image
                alt=""
              />
              
              {/* [HERO TITLE TEXT] */}
              <div className="font-['Pricedown'] text text-yellow-400 flex flex-col gap-3 absolute top-20 left-[75%] -translate-x-1/2 scale-[1.4] rotate-[-10deg]"> 
               {/* [EDIT]: text-Yellow-400 changes title color */}
                <h1 className="text-[7rem] leading-none -ml-40">3D GAME</h1>   {/* [EDIT]: Title Line 1 */}
                <h1 className="text-[5rem] leading-none ml-20">ARTIST</h1>     {/* [EDIT]: Title Line 2 */}
                <h1 className="text-[4rem] leading-none -ml-20">PORTFOLIO</h1> {/* [EDIT]: Title Line 3 */}
              </div>

              {/* [IMAGE]: CHARACTER */}
              <img
                className="absolute character -bottom-[150%] left-1/2 -translate-x-1/2 scale-[3] rotate-[-20deg]"
                src="./girlbg.png"       // [EDIT]: Change Character Image
                alt=""
              />
            </div>

            {/* [BOTTOM BAR] */}
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i className="text-4xl ri-arrow-down-line"></i> {/* [EDIT]: Remix Icon Class */}
                <h3 className="text-xl font-[Helvetica_Now_Display]">
                  Scroll Down {/* [EDIT]: Scroll Text */}
                </h3>
              </div>
              {/* [CENTER LOGO / ICON] */}
              <img
                className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"          // [EDIT]: Change Bottom Center Logo
                alt=""
              />
            </div>
          </div>

          {/* --- INFO / ABOUT SECTION --- */}
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="cntnr flex text-white w-full h-[80%] ">
              
              {/* [LEFT SIDE IMAGE] */}
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute scale-[0.8] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.jpg"       // [EDIT]: Change About Section Image
                  alt=""
                />
              </div>

              {/* [RIGHT SIDE CONTENT] */}
              <div className="rg w-[50%] py-10">
                <h1 className="font-[Arial] text-3xl">ABOUT</h1>   {/* [EDIT]: Heading 1 */}
                <h1 className="font-[Arial] text-2xl">ME</h1>      {/* [EDIT]: Heading 2 */}
                
                {/* [PARAGRAPHS] */}
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                  {/* [EDIT]: Paragraph 1 Text */}
                  My name is JEEN CHAUDHARI.
                </p>
                <p className="mt-3 text-xl font-[Helvetica_Now_Display]">
                  {/* [EDIT]: Paragraph 2 Text */}
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                   {/* [EDIT]: Paragraph 3 Text */}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>

                {/* [ARTSTATION LINK] */}
               <a 
                  href="https://www.artstation.com/jeen"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="
                    font-['Arial'] italic tracking-widest text-4xl inline-block px-10 py-10 mt-10
                    bg-blue-300 text-black 
                    transition-all duration-300 ease-in-out
                    hover:bg-blue-700 hover:text-white 
                    hover:scale-110 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.5)]
                  "
                >
                  My ArtStation
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;