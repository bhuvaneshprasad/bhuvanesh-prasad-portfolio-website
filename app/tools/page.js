import React from "react";
import ToolsHeading from "../../components/ToolsHeading";
import AllTools from "../../components/AllTools";

export async function generateMetadata() {
  return {
    title: "Tools",
    description:
      "A collection of useful tools for developers, financial planning, and more.",
    keywords: ["Tools", "Developer Tools", "Financial Calculators", "Formatters", "JSON Formatter"],
    applicationName: "Bhuvanesh Prasad",
  };
}

const Tools = () => {
  return (
    <>
      <ToolsHeading />
      <AllTools />
    </>
  );
};

export default Tools;