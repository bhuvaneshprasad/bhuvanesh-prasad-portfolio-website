import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="bg-[#000a1f] text-white h-screen md:h-auto lg:h-screen flex">
      <div
        className="w-full pt-20 pb-40 m-auto flex justify-center text-center flex-col items-center"
        style={{ maxWidth: "1200px" }}
      >
        <p className="text-xl mb-5 font-bold">Hey, I'm Bhuvanesh.</p>
        <h1 className="inline-block max-w-2xl lg:max-w-4xl w-auto text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-10 font-bold">
          I leverage <span className="text-blueAccent">data</span> for impactful{" "}
          <span className="text-blueAccent">decision-making</span>.
        <img
          className="w-16 md:hidden lg:flex top-[15%] left-5 lg:left-[15%] lg:top-[25%] absolute"
          style={{ animationDelay: "0.25s" }}
          src="/chart.png"
          alt="chart icon"
        />
        <img
          className="w-16 md:hidden lg:flex top-[25%] right-[25%] absolute"
          style={{ animationDelay: "0.25s" }}
          src="/mind-map.png"
          alt="mind map icon"
        />
        <img
          className="w-16 md:hidden lg:flex top-[50%] right-[90%] lg:left-[18%] lg:top-[55%] xl:right-[70%] absolute"
          style={{ animationDelay: "0.25s" }}
          src="/matlab.svg"
          alt="matlab icon"
        />
        <img
          className="w-16 md:hidden lg:flex top-[50%] left-[75%] lg:top-[55%] xl:top-[52%] xl:left-[69%] absolute"
          style={{ animationDelay: "0.25s" }}
          src="/bulb.svg"
          alt="bulb icon"
        />
        <img
          className="w-26 hidden lg:flex top-[90%] right-[5%] bottom-[5%] absolute"
          style={{ animationDelay: "0.25s" }}
          src="/slice.png"
          alt="slice chart icon"
        />
        <img
          className="w-24 hidden lg:flex top-[70%] left-[5%] bottom-[15%] absolute"
          style={{ animationDelay: "0.25s" }}
          src="/presentation.png"
          alt="presentation icon"
        />
        <img
          className="w-16 -mt-1 md:left-[46%] lg:-mt-3 left-[40%] lg:left-[47%] absolute"
          style={{ animationDelay: "0.1s" }}
          src="/hard-working.png"
          alt="hard-working icon"
        />
        <img
          className="w-32 -bottom-[7%] left-[50%] absolute"
          style={{ animationDelay: "0.1s" }}
          src="/doughnut-chart.png"
          alt="doughnut chart icon"
        />
        <img
          className="w-16 hidden lg:flex top-[20%] left-[50%] absolute"
          style={{ animationDelay: "0.1s" }}
          src="/statistics.png"
          alt="statistics icon"
        />
        </h1>
        

        <div className="flex gap-5">
          <Link href="/projects">
            <button className="bg-transparent hover:bg-blueAccent hover:border-blueAccent text-textColor font-bold py-2 px-4 rounded-full mt-4 border-textColor border-2">
              Check Projects
            </button>
          </Link>
          <Link
            href="https://drive.google.com/file/d/1uj3egx9esnpU8WsYrFXNu0MgUiwIOHHz/view?usp=sharing"
            target="_blank"
          >
            <button className="bg-transparent hover:bg-blueAccent hover:border-blueAccent text-textColor font-bold py-2 px-4 rounded-full mt-4 border-textColor border-2">
              Download Resume
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
