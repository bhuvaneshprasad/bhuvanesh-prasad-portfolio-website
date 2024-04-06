import React from "react";


function ProjectHeading({ tag }) {
  return (
    <div
      className={`${tag ? "pt-12 pb-4 sm:pt-12 sm:pb-12" : "py-12 sm:py-12"} w-full text-center text-textColor` }
    >
      {tag ? (
        <>
          <h1 className="text-3xl sm:text-4xl inline-block font-bold w-auto mx-auto">
            Projects built with <b>{tag}</b>
            {/* <img
              className="sqD w-8 sm:w-10 -top-6 -right-2 sm:-right-8 sm:-top-8 absolute"
              src="/code.svg"
            /> */}
          </h1>
        </>
      ) : (
        <h1 className="text-4xl sm:text-6xl inline-block font-bold w-auto mx-auto">
          Projects
          {/* <img
            className="sqD w-10 -top-8 -right-8"
            src="/code.svg"
          /> */}
        </h1>
      )}
      {/* {!tag && (
        <p className="text-xl sm:text-2xl max-w-3xl m-auto text-textColorSoft">
          I've built cool apps and websites using anything from HTML to React
          (and even PHP!). Here are some of my favorite projects over the course
          of my journey.
        </p>
      )} */}
    </div>
  );
}

export default ProjectHeading;