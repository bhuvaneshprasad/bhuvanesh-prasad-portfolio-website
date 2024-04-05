import Link from "next/link";
import React from "react";
import SectionTitle from "./SectionTitle";
import projects from "../data/content/projects";

import ProjectCard from "./ProjectCard";

function Projects() {
  return (
    <div className="flex flex-col text-left justify-between pt-8 relative text-textColor bg-bgcolor px-3 md:px-8 lg:px-16 lg:h-screen">
        <SectionTitle title="Latest projects" />
      <div className="grid grid-cols-1 gap-12 md:gap-5 md:grid-cols-3 items-start">
        {projects.slice(0, 3).map((item) => {
          return <ProjectCard key={item.id} project={item} />;
        })}
      </div>
      <div className="flex mb-5 mt-5 justify-center items-center">
      <button className="bg-transparent hover:bg-textColor hover:border-textColor hover:text-bgcolor text-blueAccent font-bold py-2 px-4 rounded-full mt-4 border-blueAccent border-2 w-2/3 lg:w-1/3">
        <Link href="/projects">View All</Link>
      </button>
      </div>
    </div>
  );
}

export default Projects;
