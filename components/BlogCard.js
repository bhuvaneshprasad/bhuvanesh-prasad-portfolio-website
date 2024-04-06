import React from "react";
import Link from "next/link";

function BlogCard({ blog }) {
  return (
    <div
      className="max-w-sm mx-auto flex flex-col projects-center md:projects-start md:justify-center"
      key={blog.node.id}
    >
      <a
        href={"/blog/" + blog.node.slug}
        className={`w-full rounded-xl border p-2 transition hover:-translate-y-2 hover:opacity-75`}
      >
        <img
          className="w-full rounded-md"
          src={blog.node.coverImage.url}
          alt={blog.node.title}
        />
      </a>
      <div className="w-full mt-5">
        <div className="flex justify-between">
          <a href={"/blog/" + blog.node.slug}>
            <h3 className="text-lg font-bold">{blog.node.title}</h3>
          </a>
        </div>
        <p className="text-textColorSoft text-left text-sm">{blog.desc}</p>
        <ul className="flex flex-wrap items-center mt-2 -ml-2 list-none">
          {blog.node.tags.map((tag, index) => {
            return (
              <li key={index}>
                <Link href={`/blog/tags/${tag.name}`}>
                  <div className="m-1 rounded-full text-xs bg-bgcolorSoft py-2 px-3 cursor-pointer hover:opacity-75">
                    {tag.name}
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

export default BlogCard;