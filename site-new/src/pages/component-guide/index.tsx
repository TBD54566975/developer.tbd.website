import React from "react";
import Link from "@docusaurus/Link";

function ComponentList() {
  const components = [
    { name: "TextIconCard", path: "/component-guide/text-icon-card" },
    { name: "BlogCard", path: "/component-guide/blog-card" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Component List</h1>
      <p className="mb-8">Click on a component to learn more about it.</p>
      <ul className="list-disc pl-5 space-y-2">
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
