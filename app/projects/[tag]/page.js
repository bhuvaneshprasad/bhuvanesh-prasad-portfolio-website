import React from "react";
import { getProjectsByTag } from "../../../data/content/projects";
import ProjectCard from "../../../components/ProjectCard";
import Link from "next/link";

export async function generateMetadata({params}) {
  return {
    title: `${params.tag} Projects`,
    description:
      `${params.tag} projects done by Bhuvanesh Prasad`,
    keywords: ["Bhuvanesh Prasad Projects", "Projects", "Bhuvanesh Projects", `${params.tag} projects`],
    applicationName: "Bhuvanesh Prasad",
  };
}

function TagProjects({ params }) {
  const projectsList = getProjectsByTag(params?.tag);
  return (
    <>
      <div
        className={`${
          params?.tag ? "pt-12 pb-12 sm:pt-12 sm:pb-12" : "py-12 sm:py-12"
        } w-full text-center text-textColor`}
      >
        <h1 className="text-3xl sm:text-4xl inline-block font-bold w-auto mx-auto">
          Projects built with <b>{params?.tag}</b>
          {/* <Image
            className="sqD w-8 sm:w-10 -top-6 -right-2 sm:-right-8 sm:-top-8 absolute"
            src="/code.svg"
            width={32}
            height={32}
          /> */}
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-textColor px-3 md:px-16">
        {projectsList.map((item) => {
          return <ProjectCard key={item.id} project={item} />;
        })}
      </div>
      <div className="flex mb-5 mt-5 justify-center items-center">
        <Link href="/projects">
          <button className="bg-transparent hover:bg-textColor hover:border-textColor hover:text-bgcolor text-blueAccent font-bold py-2 px-4 rounded-full mt-4 border-blueAccent border-2">
            Go Back To All Projects
          </button>
        </Link>
      </div>
    </>
  );
}

export default TagProjects;
