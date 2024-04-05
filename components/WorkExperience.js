import React from "react";
import SectionTitle from "./SectionTitle";
import WorkExperienceCard from "./WorkExperienceCard";
import workExperience from "../data/content/workExperience";

const WorkExperience = () => {
  const sortedWorkExperience = workExperience
    .slice()
    .sort((a, b) => b.id - a.id);
  return (
    <div className="flex flex-col text-left pt-4 relative text-textColor bg-bgcolor px-3 md:px-16">
      <SectionTitle title="Work Experience" />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 w-full">
        {sortedWorkExperience.map((item) => {
          return (
            <WorkExperienceCard
              key={item.id}
              title={item.title}
              company={item.company}
              year={item.year}
              logo={item.logo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WorkExperience;
