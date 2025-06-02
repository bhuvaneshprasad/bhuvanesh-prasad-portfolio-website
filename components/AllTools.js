import React from "react";
import tools, { allCategories, getToolsByCategory } from "../data/content/tools";
import ToolCard from "./ToolCard";

function AllTools({ category, tag }) {
  let toolsList = tools;
  
  // Filter by category if provided
  if (category) {
    toolsList = getToolsByCategory(category);
  }
  
  // Filter by tag if provided
  if (tag) {
    const lowercaseTag = tag.toLowerCase();
    toolsList = toolsList.filter(tool => 
      tool.lowercaseTags.includes(lowercaseTag)
    );
  }
  
  // Sort by ID in descending order
  toolsList = toolsList.sort((a, b) => b.id - a.id);

  // Group by category if no specific category or tag is selected
  if (!category && !tag) {
    return (
      <div className="px-4 md:px-16 mb-20">
        {allCategories.map((categoryName) => {
          const categoryTools = getToolsByCategory(categoryName);
          return (
            <div key={categoryName} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-textColor">{categoryName}</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-start text-textColor">
                {categoryTools.map((item) => (
                  <ToolCard key={item.id} tool={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Display filtered tools
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-start text-textColor px-4 md:px-16 mb-20">
      {toolsList.map((item) => (
        <ToolCard key={item.id} tool={item} />
      ))}
    </div>
  );
}

export default AllTools;