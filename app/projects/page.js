import AllProjects from "../../components/AllProjects";
import ProjectHeading from "../../components/ProjectHeading";
import React from "react";

export async function generateMetadata() {
  return {
    title: "Projects",
    description:
      "Projects done by Bhuvanesh Prasad",
    keywords: ["Bhuvanesh Prasad Projects", "Projects", "Bhuvanesh Projects", "Data Analyst Projects", "Data Science Projects"],
    applicationName: "Bhuvanesh Prasad",
  };
}

const projects = () => {
  return (
    <>
      <ProjectHeading />
      <AllProjects />
    </>
  );
};

export default projects;
