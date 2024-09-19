import React from "react";
import ProjectLanguage from "./ProjectLanguage";
import { projects } from "./projectList";
import Shield from "./Shield";
import { Project } from "./project.types";

function ProjectsDashboard() {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th>SDK</th>
          <th>CI Status </th>
          <th>License</th>
          <th>License & Security Scanning</th>
          <th>OSSF Score</th>
          <th>SAST/Lint</th>
          <th>Tests</th>
          <th>Release </th>
          <th>API Reference Docs </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(projects).map((project) => (
          <ProjectItem key={project} name={project} {...projects[project]} />
        ))}
      </tbody>
    </table>
  );
}

function ProjectItem(item: Project & { name: string }) {
  return (
    <tr>
      <td>
        <div className="flex flex-row items-center">
          <ProjectLanguage language={item.language} />
          <a href={item.url} target="_blank" className="ml-2">
            {item.name}
          </a>
        </div>
      </td>
      <td>
        {item.ciStatus.map((shield, idx) => (
          <Shield key={`ci-status-${idx}`} {...shield} {...item} />
        ))}
      </td>
      <td>
        {item.license.map((shield, idx) => (
          <Shield
            key={`ci-status-${idx}`}
            {...shield}
            {...item}
            group={item.group ?? ""}
            packageName={item.packageName ?? ""}
          />
        ))}
      </td>
      <td>
        {item.scan.map((shield, idx) => (
          <Shield key={`ci-status-${idx}`} {...shield} {...item} />
        ))}
      </td>
      <td>
        {item.ossf.map((shield, idx) => (
          <Shield key={`ci-status-${idx}`} {...shield} {...item} />
        ))}
      </td>
      <td>
        {item.sast.map((shield, idx) => (
          <Shield key={`ci-status-${idx}`} {...shield} {...item} />
        ))}
      </td>
      <td>
        {item.tests.map((shield, idx) => (
          <Shield key={`ci-status-${idx}`} {...shield} {...item} />
        ))}
      </td>
      <td>
        {item.release.map((shield, idx) => (
          <Shield
            key={`ci-status-${idx}`}
            {...shield}
            {...item}
            group={item.group ?? ""}
            packageName={item.packageName ?? ""}
          />
        ))}
      </td>
      <td>
        {item.apiDocs.map((shield, idx) => (
          <Shield key={`ci-status-${idx}`} {...shield} {...item} />
        ))}
      </td>
    </tr>
  );
}

export default ProjectsDashboard;
