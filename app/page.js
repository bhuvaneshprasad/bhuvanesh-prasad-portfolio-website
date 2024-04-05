import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import WorkExperience from "../components/WorkExperience"
import Education from "../components/Education"

export default function Home() {
  return (
    <>
      <Hero />
      <Skills/>
      <Projects/>
      <WorkExperience/>
      <Education/>
      <div className=" h-24 w-full"></div>
    </>
  );
}
