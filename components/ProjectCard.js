import React from "react";
import Image from "next/image";
import Link from "next/link";

function ProjectCard({ project }) {
  return (
    <div
      className="max-w-sm md:mx-auto flex flex-col md:projects-start md:justify-center"
      key={project.id}
    >
      <a
        href={project.link || project.github}
        target="_blank"
        className={`w-full rounded-xl border-fun-gray border p-2 transition hover:-translate-y-2 hover:opacity-75 hover:border-fun-pink will-change-projectCard`}
      >
        <img
          className="w-full rounded-md"
          src={project.img}
        />
      </a>
      <div className="w-full mt-5">
        <div className="flex justify-between">
          <a href={project.link || project.github} target="_blank">
            <h3 className="text-lg font-bold">{project.title}</h3>
          </a>
          <div className="space-x-2 flex">
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer">
                <Image
                  src="/externalLink.svg"
                  width={16}
                  height={16}
                  alt="Link Icon"
                  className="filter invert"
                />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer">
                <Image
                  src="/github.svg"
                  width={16}
                  height={16}
                  alt="Github Icon"
                  className="filter invert"
                />
              </a>
            )}
          </div>
        </div>
        <p className="text-fun-gray text-left text-sm">{project.desc}</p>
        <ul className="flex flex-wrap items-center mt-2 -ml-2 list-none">
          {project.tags.map((tag, index) => {
            return (
              <li key={index}>
                <Link href={`/projects/${tag}`}>
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

export default ProjectCard;