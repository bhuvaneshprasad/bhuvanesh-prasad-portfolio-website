import { kebabCase, kebabArray } from "../../utils/utils";

const projects = [
  {
    id: 0,
    title: "RSVP Movie Case Study",
    desc: "A data analytics project to analyse IMDB dataset using SQL.",
    img: "/projects/RSVP Movies Case Study  SQL Project.jpg",
    // link: "https://learn.theyei.org/",
    github: "https://github.com/bhuvaneshprasad/rsvp_movies_case_study",
    tags: ["SQL"],
  },
  {
    id: 1,
    title: "Telangana Growth Analysis",
    desc: "A real-time data analytics project to analyse the growth of Telangana state between FY2019 and FY2022.",
    img: `${process.env.NEXT_PUBLIC_BASE_URL}/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1695363338938%2F5726f461-3755-49e4-abb4-cff7a0c78601.png&w=1920&q=75`,
    link: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/telangana-growth-analysis`,
    tags: ["SQL", "PowerBI", "Python"],
  },
  {
    id: 2,
    title: "End-to-End IPL Data Analysis",
    desc: "A Python-Powered Exploration through IPL Data with Dynamic Power BI Insights.",
    img: `${process.env.NEXT_PUBLIC_BASE_URL}/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1704908641555%2Fdf90f7bb-6c9c-4f22-b1c9-2a413fdfa0fc.png&w=1920&q=75`,
    link: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/end-to-end-ipl-data-analysis-with-python-and-power-bi`,
    tags: ["SQL", "PowerBI", "Python"],
  },
];

export const allTags = []

projects.forEach((project) => {
  project.tags.forEach((tag) => !allTags.includes(tag) && allTags.push(tag))
});

export const allKebabTags = allTags.map(tag => (
  kebabCase(tag)
))

export const getProjectsByTag = (tag) => {
  const lowercaseTag = tag.toLowerCase();
  return projects.filter(project => project.lowercaseTags.includes(lowercaseTag));
};

// Convert tags to lowercase for each project
projects.forEach(project => {
  project.lowercaseTags = project.tags.map(t => t.toLowerCase());
});

export default projects