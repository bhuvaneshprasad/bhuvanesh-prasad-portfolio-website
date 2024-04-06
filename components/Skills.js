import React from "react";
import { skills } from "../data/content/home";
import Image from "next/image";

function Skills() {
  return (
    <div className="h-screen md:h-auto lg:h-screen flex items-center justify-center bg-bgcolor px-8 lg:px-16">
      <img
          className="w-16 top-[214%] lg:top-[176%] lg:left-[5%] xl:top-[165%] xl:left-[18%] absolute"
          style={{ animationDelay: "0.25s" }}
          src="/AWS.svg"
          alt="aws logo"
        />
        <img
          className="w-16 top-[110%] left-[25%] lg:top-[125%] lg:left-[25%] absolute"
          style={{ animationDelay: "0.25s" }}
          src="/numpy.svg"
          alt="numpy logo"
        />
        <img
          className="w-16 top-[130%] left-[80%] lg:top-[172%] lg:left-[19%] xl:top-[155%] xl:left-[30%] absolute"
          style={{ animationDelay: "0.25s" }}
          src="/vscode.svg"
          alt="vs code logo"
        />
        <img
          className="w-16 top-[126%] left-[8%] lg:top-[155%] lg:left-[4%] xl:top-[143%] xl:left-[15%] absolute"
          style={{ animationDelay: "0.25s" }}
          src="/scikit-learn.svg"
          alt="scikit learn logo"
        />
        <img
          className="w-24 top-[89%] left-[10%] lg:top-[190%] lg:left-[28%] xl:top-[175%] xl:left-[30%] bottom-[15%] absolute"
          style={{ animationDelay: "0.25s" }}
          src="/pandas.svg"
          alt="pandas logo"
        />
        <img
          className="w-24 -mt-3 hidden lg:flex top-[90%] left-[25%] absolute"
          style={{ animationDelay: "0.1s" }}
          src="/jupyter.svg"
          alt="jupyter logo"
        />
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
              <Image src={item.icon} alt={item.title + " icon"} style={item.style} width={40} height={40} />
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