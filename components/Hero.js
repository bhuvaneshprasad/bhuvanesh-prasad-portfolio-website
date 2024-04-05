import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="bg-[#000a1f] text-white h-screen flex">
      <div
        className="w-full pt-20 pb-40 m-auto flex justify-center text-center flex-col items-center"
        style={{ maxWidth: "1200px" }}
      >
        <p className="text-xl mb-5">Hey, I'm Bhuvanesh.</p>
        <h1 className="inline-block max-w-2xl lg:max-w-4xl w-auto text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-10 font-bold">
          I leverage <span className="text-blueAccent">data</span> for impactful{" "}
          <span className="text-blueAccent">decision-making</span>.
        </h1>

        <div className="flex gap-5">
          <button className="bg-transparent hover:bg-blueAccent hover:border-blueAccent text-textColor font-bold py-2 px-4 rounded-full mt-4 border-textColor border-2">
            <Link href="/projects">Check Projects</Link>
          </button>
          <button className="bg-transparent hover:bg-blueAccent hover:border-blueAccent text-textColor font-bold py-2 px-4 rounded-full mt-4 border-textColor border-2">
            <Link href="/blog">Download Resume</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
