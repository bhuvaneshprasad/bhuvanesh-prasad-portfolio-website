import React from "react";
import Image from "next/image";

const BlogHeader = ({
  coverImage,
  title,
  subtitle,
  readTimeInMinutes,
  authorName,
  authorImage,
  publishedAt,
}) => {
  const date = new Date(publishedAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return (
    <div className="text-textColor flex justify-center items-center flex-col">
      <div className="flex justify-center items-center flex-col">
        <Image
          src={coverImage}
          alt={title}
          width={1280}
          height={720}
          className="w-full xl:w-2/3 h-auto"
        />
      </div>
      <h2 className="text-textColor text-4xl md:text-5xl font-bold text-wrap xl:w-1/2 text-center mt-8 leading-normal">
        {title}
      </h2>
      <p className="text-textColorSoft text-2xl md:text-3xl leading-snug font-medium text-wrap xl:w-3/5 text-center mt-4 md:mt-8 px-4">
        {subtitle}
      </p>
      <div className="my-8 md:flex aline-middle justify-center items-center text-lg">
        <div className="text-textColor flex">
          <Image
            src={authorImage}
            alt={authorName + " Image"}
            width={50}
            height={50}
            className="rounded-full"
          ></Image>
          <p className="aline-middle justify-center items-center flex ml-4 font-bold">
            {authorName}
          </p>
        </div>
        <span className="hidden mx-3 md:block font-bold text-slate-500">·</span>
        <div className="text-textColorSoft flex mt-4 md:mt-0">
          {formattedDate}
          <span className="mx-3 block font-bold text-slate-500">·</span>
          <span className="aline-middle justify-center items-center flex font-bold text-slate-500">
            <svg
              class="mr-2 h-5 w-5 fill-current opacity-75"
              viewBox="0 0 576 512"
            >
              <path d="M540.9 56.77c-45.95-16.66-90.23-24.09-129.1-24.75-60.7.94-102.7 17.45-123.8 27.72-21.1-10.27-64.1-26.8-123.2-27.74-40-.05-84.4 8.35-129.7 24.77C14.18 64.33 0 84.41 0 106.7v302.9c0 14.66 6.875 28.06 18.89 36.8 11.81 8.531 26.64 10.98 40.73 6.781 118.9-36.34 209.3 19.05 214.3 22.19C277.8 477.6 281.2 480 287.1 480c6.52 0 10.12-2.373 14.07-4.578 10.78-6.688 98.3-57.66 214.3-22.27 14.11 4.25 28.86 1.75 40.75-6.812C569.1 437.6 576 424.2 576 409.6V106.7c0-22.28-14.2-42.35-35.1-49.93zM272 438.1c-24.95-12.03-71.01-29.37-130.5-29.37-27.83 0-58.5 3.812-91.19 13.77-4.406 1.344-9 .594-12.69-2.047C34.02 417.8 32 413.1 32 409.6V106.7c0-8.859 5.562-16.83 13.86-19.83C87.66 71.7 127.9 63.95 164.5 64c51.8.81 89.7 15.26 107.5 23.66V438.1zm272-28.5c0 4.375-2.016 8.234-5.594 10.84-3.766 2.703-8.297 3.422-12.69 2.125C424.1 391.6 341.3 420.4 304 438.3V87.66c17.8-8.4 55.7-22.85 107.4-23.66 35.31-.063 76.34 7.484 118.8 22.88 8.2 3 13.8 10.96 13.8 19.82v302.9z"></path>
            </svg>
          </span>
          <span className="font-medium">{readTimeInMinutes + " min read"}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
