const tools = [
  {
    id: 1,
    category: "Formatters",
    title: "JSON Formatter",
    desc: "Format, validate, and beautify JSON with syntax highlighting and advanced features.",
    img: "/code.svg",
    link: "/tools/formatters/json-formatter",
    tags: ["JSON", "Formatter", "Developer Tools"],
    features: [
      "Clipboard integration",
      "File loading and downloading",
      "JSON repair functionality",
      "Syntax highlighting",
      "Collapsible tree structure",
      "Fullscreen mode",
      "Scroll synchronization",
      "Undo/redo functionality",
      "Error validation",
      "History tracking"
    ]
  },
  // Placeholder for future tools
  {
    id: 2,
    category: "Financial Calculators",
    title: "SIP Calculator",
    desc: "Calculate returns on your Systematic Investment Plan (SIP) investments.",
    img: "/chart.png",
    link: "/tools/financial-calculators/sip-calculator",
    tags: ["Finance", "Calculator", "Investment"],
    features: [
      "Monthly investment calculation",
      "Return projection",
      "Visual charts",
      "Customizable parameters"
    ]
  }
];

// Get all unique categories
export const allCategories = [...new Set(tools.map(tool => tool.category))];

// Get all unique tags
export const allTags = [];
tools.forEach((tool) => {
  tool.tags.forEach((tag) => !allTags.includes(tag) && allTags.push(tag));
});

// Get tools by category
export const getToolsByCategory = (category) => {
  return tools.filter(tool => tool.category === category);
};

// Get tools by tag
export const getToolsByTag = (tag) => {
  const lowercaseTag = tag.toLowerCase();
  return tools.filter(tool => tool.lowercaseTags.includes(lowercaseTag));
};

// Convert tags to lowercase for each tool
tools.forEach(tool => {
  tool.lowercaseTags = tool.tags.map(t => t.toLowerCase());
});

export default tools;
