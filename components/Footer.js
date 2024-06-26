import Link from "next/link";
import React from "react";
import { footer } from "../data/global";
import Image from "next/image";

function Footer() {
  return (
    <footer className="flex flex-col w-screen px-5 py-10 z-5 bg-bg text-textColor">
      <div className="w-full max-w-4xl m-auto grid grid-cols-2 sm:grid-cols-3 justify-between items-start">
        {footer.columns.map((item, index) => {
          return (
            <div key={index} className="text-left mb-5 sm:mb-0">
              <p className="uppercase text-textColorSoft text-sm font-bold">
                {item.title}
              </p>
              <div>
                {item.links.map((item, index) => {
                  return (
                    <div key={index} className="my-4">
                      {item.leavesWebsite ? (
                        <a
                          href={item.link}
                          target="_blank"
                          className="items-center flex"
                        >
                          {item.icon && (
                            <span className="pr-2">
                              <Image
                                src={item.icon}
                                alt={item.name + " icon"}
                                width={20}
                                height={20}
                                style={item.style ? item.style : ""}
                              />
                            </span>
                          )}
                          {item.name}
                        </a>
                      ) : (
                        <Link href={item.link}>{item.name}</Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {/* <div className="text-center col-span-2 sm:col-auto sm:text-left pt-8 sm:mt-0 sm:pt-0 border-t sm:border-0">
          <p className="uppercase text-textColorSoft text-sm font-bold">
            My Other Websites
          </p>
          <div className="space-y-2 mt-4 w-full flex items-center sm:items-start flex-col">
            {footer.otherWebsites.map((item, index) => {
              return (
                <div key={index}>
                  <Link
                  href={item.link}
                  target="_blank"
                  className="items-center flex"
                >
                  {item.icon && (
                    <span>
                      <Image
                        src={item.icon}
                        alt={item.name + " icon"}
                        width={50}
                        height={50}
                        style={item.style ? item.style : ""}
                      />
                    </span>
                  )}
                  {item.name}
                </Link>
                </div>
              );
            })}
          </div>
        </div> */}
      </div>
      <div className="max-w-4xl w-full m-auto mt-8 pt-8 sm:mt-4 sm:pt-4 text-center border-t">
        <p className="flex flex-col items-center justify-center ">
          <div className="inline-flex items-center uppercase text-xs font-bold tracking-widest">
            © Bhuvanesh Prasad, 2024. All rights reserved.
            <div className="space-x-2 inline-flex items-center -mt-1 ml-3"></div>
          </div>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
