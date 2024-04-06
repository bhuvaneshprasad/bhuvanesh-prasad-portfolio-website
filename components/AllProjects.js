import React from "react";
import projects from "../data/content/projects";
import ProjectCard from "./ProjectCard";

function AllProjects() {
  const projectsList = projects.sort((a, b) => b.id - a.id);
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-start text-textColor px-4 md:px-16 mb-20">
      {projectsList.map((item) => {
        return <ProjectCard key={item.id} project={item} />;
      })}
    </div>
  );
}

export default AllProjects;