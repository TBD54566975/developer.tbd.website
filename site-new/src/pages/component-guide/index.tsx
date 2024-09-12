import React from "react";
import Link from "@docusaurus/Link";

function ComponentList() {
  const components = [
    { name: "TextIconCard", path: "/component-guide/text-icon-card" },
    { name: "TextIconFeature", path: "/component-guide/text-icon-feature" },
    { name: "BlogCard", path: "/component-guide/blog-card" },
    { name: "HeroComponent", path: "/component-guide/hero" },
    { name: "Quote", path: "/component-guide/quote" },
    { name: "Marquee", path: "/component-guide/marquee" },
    { name: "Accordion", path: "/component-guide/accordion" },
    { name: "FeedbackCard", path: "/component-guide/feedback-card" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Component List</h1>
      <p className="mb-8">Click on a component to learn more about it.</p>
      <ul className="list-disc space-y-2 pl-5">
        {components.map((component, index) => (
          <li key={index} className="text-lg">
            <Link to={component.path} className="text-blue-500 hover:underline">
              {component.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComponentList;
