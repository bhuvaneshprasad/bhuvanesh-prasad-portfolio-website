"use client";
import React from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import dynamic from "next/dynamic";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNAV = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className="w-full h-16 bg-bgcolorSoft">
      <div className="flex justify-between items-center h-full w-full px-4 md:px-16 2xl:px-16">
        <Link href="/" className="text-textColor font-bold text-lg md:text-xl">
          Bhuvanesh Prasad
        </Link>
        <div className="hidden sm:flex">
          <ul className="hidden sm:flex">
            <li className="ml-10 uppercase font-medium hover:border-b text-md text-textColor">
              <Link href="/">Home</Link>
            </li>
            <li className="ml-10 uppercase font-medium hover:border-b text-md text-textColor">
              <Link href="/projects">Projects</Link>
            </li>
            <li className="ml-10 uppercase font-medium hover:border-b text-md text-textColor">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="ml-10 uppercase font-medium hover:border-b text-md text-textColor">
              <Link href="/tools">Tools</Link>
            </li>
            {/* <li className="ml-10 uppercase hover:border-b text-md text-textColor">
              <Link href="/contact">Contact</Link>
            </li> */}
          </ul>
        </div>
        <div
          onClick={handleNAV}
          className="sm:hidden cursor-pointer pl-24 text-textColor"
        >
          <AiOutlineMenu size={20} />
        </div>
      </div>
      <div
        className={
          menuOpen
            ? "left-0 top-0 w-[65%] sm:hidden h-screen bg-bgcolorSoft text-textColorSoft text-xl font-bold text-center p-10 ease-in duration-500 flex-col absolute z-50"
            : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
        }
      >
        <div className="flex w-full items-center justify-end">
          <div onClick={handleNAV} className="cursor-pointer">
            <AiOutlineClose size={25} />
          </div>
        </div>
        <div className="py-4 flex flex-col justify-center">
          <ul>
            <li
              onClick={() => setMenuOpen(false)}
              className="py-4 cursor-pointer"
            >
              <Link href="/">Home</Link>
            </li>

            <li
              onClick={() => setMenuOpen(false)}
              className="py-4 cursor-pointer"
            >
              <Link href="/projects">Projects</Link>
            </li>

            <li
              onClick={() => setMenuOpen(false)}
              className="py-4 cursor-pointer"
            >
              <Link href="/blog"> Blog</Link>
            </li>

            <li
              onClick={() => setMenuOpen(false)}
              className="py-4 cursor-pointer"
            >
              <Link href="/tools"> Tools</Link>
            </li>
            {/* <Link href="/contact">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer"
              >
                Contact
              </li>
            </Link> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
