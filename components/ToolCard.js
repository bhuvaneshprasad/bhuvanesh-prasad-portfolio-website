import React from "react";
import Image from "next/image";
import Link from "next/link";

function ToolCard({ tool }) {
  return (
    <div
      className="max-w-sm md:mx-auto flex flex-col md:tools-start md:justify-center"
      key={tool.id}
    >
      <Link
        href={tool.link}
        className={`w-full rounded-xl border p-2 transition hover:-translate-y-2 hover:opacity-75`}
      >
        <img
          className="w-full rounded-md"
          src={tool.img}
          alt={tool.title + " cover image"}
        />
      </Link>
      <div className="w-full mt-5">
        <div className="flex justify-between">
          <Link href={tool.link}>
            <h3 className="text-lg font-bold">{tool.title}</h3>
          </Link>
        </div>
        <p className="text-left text-textColorSoft text-sm">{tool.desc}</p>
        <div className="mt-2">
          <span className="text-xs bg-bgcolorSoft py-1 px-2 rounded-full">
            {tool.category}
          </span>
        </div>
        <ul className="flex flex-wrap items-center mt-2 -ml-2 list-none">
          {tool.tags.map((tag, index) => {
            return (
              <li key={index}>
                <Link href={`/tools/tag/${tag.toLowerCase()}`}>
                  <div className="m-1 rounded-full text-xs bg-bgcolorSoft py-2 px-3 cursor-pointer hover:opacity-75">
                    {tag}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ToolCard;