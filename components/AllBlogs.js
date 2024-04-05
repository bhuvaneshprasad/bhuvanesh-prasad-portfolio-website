"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Link from "next/link";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";

const AllBlogs = ({ title, posts, page }) => {
  const router = useRouter();
  const currentPath = usePathname(); // Get the current path
  const [currentPage, setCurrentPage] = useState(Number(page));
  const [oldPosts, setOldPosts] = useState(null); // State to store old posts

  useEffect(() => {
    // Store the current posts as old posts
    setOldPosts(posts);
  }, [posts]); // Update oldPosts whenever posts change

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const query = { ...router.query, page: pageNumber }; // Update query parameters
    const queryString = new URLSearchParams(query).toString(); // Convert query object to string
    const newPath = currentPath + (queryString ? `?${queryString}` : ""); // Concatenate path and query string
    router.push(newPath, { scroll: false }); // Update the URL
  };

  const handlePreviousClick = (event) => {
    event.preventDefault();
    handlePageChange(posts.pageInfo.previousPage);
    // Additional logic if needed
  };

  const handleNextClick = (event) => {
    event.preventDefault();
    handlePageChange(posts.pageInfo.nextPage);
    // Additional logic if needed
  };
  return (
    <div className="text-textColor">
      <h1 className="text-4xl sm:text-6xl font-bold w-auto mx-auto text-center flex justify-center py-12">
        {title}
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-start text-textColor px-3 md:px-16">
        {posts.edges.map((item, index) => {
          return <BlogCard key={index} blog={item} />;
        })}
      </div>
      <div className="flex justify-center gap-5 mt-4 mb-20">
        <button
          onClick={handlePreviousClick}
          className={
            posts.pageInfo.hasPreviousPage
              ? "flex cursor-pointer px-4 py-2 rounded-lg font-bold text-blueAccent hover:opacity-90 hover:bg-accent items-center underline underline-offset-4"
              : "flex pointer-events-none px-4 py-2 rounded-lg font-normal text-textColorSoft opacity-30 items-center"
          }
        >
          {posts.pageInfo.hasPreviousPage ? (
            <Link
              href={currentPath + "/?page=" + posts.pageInfo.nextPage}
            ></Link>
          ) : (
            ""
          )}
          <RiArrowDropLeftLine size={20} />
          Previous
        </button>
        <button
          onClick={handleNextClick}
          className={
            posts.pageInfo.hasNextPage
              ? "flex cursor-pointer px-4 py-2 rounded-lg font-bold text-blueAccent hover:opacity-90 hover:bg-accent items-center underline underline-offset-4"
              : "flex pointer-events-none px-4 py-2 rounded-lg font-normal text-textColorSoft opacity-30 items-center"
          }
        >
          {posts.pageInfo.hasNextPage ? (
            <Link
              href={currentPath + "/?page=" + posts.pageInfo.nextPage}
            ></Link>
          ) : (
            ""
          )}
          Next
          <RiArrowDropRightLine size={20} />
        </button>
      </div>
    </div>
  );
};

export default AllBlogs;
