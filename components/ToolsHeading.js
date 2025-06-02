import React from "react";

function ToolsHeading({ category, tag }) {
  return (
    <div
      className={`${
        category || tag ? "pt-12 pb-4 sm:pt-12 sm:pb-12" : "py-12 sm:py-12"
      } w-full text-center text-textColor`}
    >
      {category ? (
        <>
          <h1 className="text-3xl sm:text-4xl inline-block font-bold w-auto mx-auto">
            {category} Tools
          </h1>
        </>
      ) : tag ? (
        <>
          <h1 className="text-3xl sm:text-4xl inline-block font-bold w-auto mx-auto">
            Tools tagged with <b>{tag}</b>
          </h1>
        </>
      ) : (
        <h1 className="text-4xl sm:text-6xl inline-block font-bold w-auto mx-auto">
          Tools
        </h1>
      )}
      {!category && !tag && (
        <p className="text-xl sm:text-2xl max-w-3xl m-auto text-textColorSoft">
          A collection of useful tools for developers, financial planning, and more.
        </p>
      )}
    </div>
  );
}

export default ToolsHeading;