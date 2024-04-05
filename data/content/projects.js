import { kebabCase, kebabArray } from "../../utils/utils";

const projects = [
  {
    id: 0,
    title: "Learn.TheYEI",
    desc: "All the resources you will need to get a boost into economics.",
    img: "https://braydentw.io/static/projects/yei-learn.png",
    link: "https://learn.theyei.org/",
    github: "https://github.com/braydentw/learn.theyei",
    tags: ["React", "NextJS", "TailwindCSS", "CSS", "Firebase"],
  },
  {
    id: 1,
    title: "BuildFaster",
    desc: "Beautiful HTML templates ready-made for your next landing page.",
    img: "https://braydentw.io/static/projects/buildfaster.png",
    link: "https://buildfaster-io.vercel.app/",
    tags: ["HTML", "CSS", "Javascript", "Gumroad"],
  },
  {
    id: 2,
    title: "React Emoji Search",
    desc: "1800+ emojis at your fingertips. Ready-to-use with just a simple copy+paste.",
    img: "https://braydentw.io/static/projects/react-emoji-search.png",
    link: "https://react-emoji-search.braydentw.vercel.app/",
    github: "https://github.com/braydentw/react-emoji-search",
    tags: ["React", "CSS", "JSON"],
  },
  {
    id: 3,
    title: "BitcoinTemp",
    desc: "A fun way to check the price of bitcoin! Cloudy days, sunny days, and Bitcoin Storms!",
    img: "https://braydentw.io/static/projects/bitcointemp.png",
    link: "https://bitcointemp.com",
    tags: ["React", "NextJS", "SCSS", "API"],
  },
  {
    id: 4,
    title: "Create HTML Boilerplate",
    desc: "Generate a vanilla HTML boilerplate in a flash!",
    img: "https://braydentw.io/static/projects/create-html-boilerplate.png",
    github: "https://github.com/BraydenTW/create-html-boilerplate",
    tags: ["Node", "Javascript", "NPM", "HTML"],
  },
  {
    id: 5,
    title: "8 Ball in your CLI",
    desc: "An 8 ball simulation in your CLI built with Rust!",
    img: "https://braydentw.io/static/projects/8ball-rust.png",
    github: "https://github.com/BraydenTW/8ball-rust",
    tags: ["Rust", "CLI", "Game"],
  },
  {
    id: 6,
    title: "DontLeaveMe 😭",
    desc: "Beg for users to stay on your website.",
    img: "https://braydentw.io/static/projects/dontleaveme.png",
    link: "https://github.com/BraydenTW/dontleaveme/",
    tags: ["Javascript", "NPM"],
  },
  {
    id: 7,
    title: "Madlibs",
    desc: "A simple version of Madlibs built for the web!",
    img: "https://braydentw.io/static/projects/madlibs.png",
    link: "https://fillemin.netlify.app/",
    github: "https://github.com/braydentw/madlibs",
    tags: ["HTML", "CSS", "Javascript"],
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