import React from "react";
import Link from "next/link";

const BlogToc = ({ toc }) => {
  return (
    <div className="text-textColor flex justify-center">
      {toc.isEnabled ? (
        <div className="bg-bgcolorSoft mx-2 lg:mx-0 lg:w-3/5 h-auto rounded-lg py-5">
          <div className="px-6 py-2 text-lg font-semibold">
            Table of contents
          </div>
          {toc.items.map((item) => {
            return (
              <div
                key={item.id}
                className={
                  item.level == 2
                    ? "pl-6 ml-6 mr-6 leading-10 text-textColorSoft font-medium rounded-md hover:bg-slate-900"
                    : "pl-9 ml-9 lg:ml-12 mr-6 leading-10 text-textColorSoft lg:text-base font-medium rounded-md hover:bg-slate-900 py-1 lg:py-3"
                }
              >
                <Link href={"#heading-" + item.slug} className="flex">
                  <span
                    className={
                      item.level == 2 ? "hidden" : "flex text-slate-400 py-3 lg:py-1"
                    }
                  >
                    <svg
                      className="h-4 w-4 stroke-current"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6.6665 4L10.6665 8L6.6665 12"></path>
                    </svg>
                  </span>
                  {item.title}
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default BlogToc;
