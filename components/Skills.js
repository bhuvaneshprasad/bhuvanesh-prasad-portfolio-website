import React from "react";
import { skills } from "../data/content/home";
import Image from "next/image";

function Skills() {
  return (
    <div className="h-screen flex items-center justify-center bg-bgcolor px-8 lg:px-16">
      <div className="flex flex-col md:flex-row justify-between relative text-textColor">
      <h2 className="relative text-3xl w-full text-center md:text-left font-bold md:max-w-lg mb-10 md:mr-10 md:mb-0 md:w-max mr-0 ">
        I got the experience.
        <br />
        Here is my toolbelt for success.
      </h2>
      <div className="relative max-w-lg w-full mx-auto md:mx-none grid gap-x-8 gap-y-12 sm:gap-8 md:gap-12 grid-cols-3 sm:grid-cols-6 items-center place-content-center">
        {skills.map((item, index) => {
          return (
            <div
              title={item.title}
              key={index}
              className="w-10 mx-auto flex items-center flex-col justify-center"
            >
              <Image src={item.icon} style={item.style} width={40} height={40} />
              <p className="text-xs text-textColorSoft font-bold mt-3 opacity-80">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}

export default Skills;