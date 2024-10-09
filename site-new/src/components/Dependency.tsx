import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CodeBlock from "@theme/CodeBlock";

// Define types for props
interface SDKVersions {
  js: Record<string, string>;
  jvm: Record<string, string>;
  swift: Record<string, { url: string; branch: string }>;
}

interface DependencyItem {
  dependencies: string[];
  sdks: Record<string, string>;
}

interface SwiftDependenciesProps {
  dependencies: string[];
  sdkVersions: SDKVersions;
}

interface InstallCommandsProps {
  dependencies: string[];
  sdkVersions: Record<string, string>;
}

interface PackageJsonProps {
  sdkVersions: SDKVersions;
  dependencies: Record<string, string>;
}

interface JvmDependenciesProps extends DependencyItem {
  language: "gradle" | "maven";
}

interface DependencyProps {
  language: string;
  dependencies: string[];
  display?: string;
}

// GradleDependencies function component
const GradleDependencies: React.FC<DependencyItem> = ({
  dependencies,
  sdks,
}) => {
  const repositoriesBlock = `repositories {
    mavenCentral()
    maven {
      name = "tbd-oss-thirdparty"
      url = uri("https://blockxyz.jfrog.io/artifactory/tbd-oss-thirdparty-maven2/")
      mavenContent {
        releasesOnly()
    }
  }`;

  const dependenciesBlock = dependencies
    .map((dep) => {
      const version = sdks[dep];
      if (version) {
        return `    implementation("xyz.block:${dep}:${version}")`;
      } else {
        return `    implementation("${dep}")`;
      }
    })
    .join("\n");

  const gradleDependenciesBlock = `dependencies {\n${dependenciesBlock}\n}`;
  const gradleString = `${repositoriesBlock}\n${gradleDependenciesBlock}`;

  return <CodeBlock language="gradle">{gradleString}</CodeBlock>;
};

const MavenDependencies: React.FC<DependencyItem> = ({
  dependencies,
  sdks,
}) => {
  const repositoriesBlock = `
 <repository>
      <id>tbd-oss-thirdparty</id>
      <name>tbd-oss-thirdparty</name>
      <releases>
        <enabled>true</enabled>
      </releases>
      <snapshots>
        <enabled>false</enabled>
      </snapshots>
      <url>https://blockxyz.jfrog.io/artifactory/tbd-oss-thirdparty-maven2/</url>
</repository>
  `;

  const dependenciesBlock = dependencies
    .map((dep) => {
      let [groupId, artifactId, version] = dep.split(":");
      if (!version) {
        version = sdks[dep];
        groupId = "xyz.block";
        artifactId = dep;
      }
      return `
<dependency>
    <groupId>${groupId}</groupId>
    <artifactId>${artifactId}</artifactId>
    <version>${version}</version>
</dependency>`;
    })
    .join("");

  const mavenString = `<repositories>${repositoriesBlock}</repositories>\n<dependencies>${dependenciesBlock}</dependencies>`;

  return <CodeBlock language="xml">{mavenString}</CodeBlock>;
};

// SwiftDependencies function component
const SwiftDependencies: React.FC<SwiftDependenciesProps> = ({
  dependencies,
  sdkVersions,
}) => {
  const swiftImports = dependencies
    .map((dep) => {
      const packageInfo = sdkVersions.swift[dep];
      if (!packageInfo) {
        console.error(`Package "${dep}" not found in sdkVersions.swift`);
        return null;
      }
      const { url, branch } = packageInfo;
      return `    .package(url: "${url}", branch: "${branch}")`;
    })
    .filter(Boolean)
    .join(",\n");

  const swiftDependenciesString = `dependencies: [\n${swiftImports}\n]`;

  return <CodeBlock language="swift">{swiftDependenciesString}</CodeBlock>;
};

// InstallCommands function component
const InstallCommands: React.FC<InstallCommandsProps> = ({
  dependencies,
  sdkVersions,
}) => {
  const commandString = dependencies
    .map((dep) => {
      const normalizedDep = dep.startsWith("@") ? dep : `@${dep}`;
      const version = sdkVersions[normalizedDep];
      if (version) {
        return `npm install ${normalizedDep}@${version}`;
      } else {
        return `npm install ${normalizedDep}`;
      }
    })
    .join("\n");

  return <CodeBlock language="bash">{commandString}</CodeBlock>;
};

// PackageJson function component
const PackageJson: React.FC<PackageJsonProps> = ({
  sdkVersions,
  dependencies,
}) => {
  const requiredDependencies = Object.entries(dependencies).reduce(
    (acc, [dep, depName]) => {
      const depVersion = sdkVersions.js[depName];
      acc[depName] = depVersion;
      return acc;
    },
    { type: "module" } as Record<string, string>,
  );

  const jsonString = JSON.stringify(requiredDependencies, null, 2);
  return <CodeBlock language="json">{jsonString}</CodeBlock>;
};

// JvmDependencies function component
const JvmDependencies: React.FC<JvmDependenciesProps> = ({
  dependencies,
  sdks,
  language,
}) => {
  if (language === "gradle") {
    return <GradleDependencies dependencies={dependencies} sdks={sdks} />;
  }

  if (language === "maven") {
    return <MavenDependencies dependencies={dependencies} sdks={sdks} />;
  }

  return null;
};

// Main Dependency component
const Dependency: React.FC<DependencyProps> = ({
  language,
  dependencies,
  display = "install",
}) => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const { SDK_VERSIONS } = customFields as { SDK_VERSIONS: SDKVersions };

  switch (display) {
    case "install":
      switch (language) {
        case "javascript":
          return (
            <InstallCommands
              dependencies={dependencies}
              sdkVersions={SDK_VERSIONS.js}
            />
          );
        case "gradle":
        case "maven":
          return (
            <JvmDependencies
              language={language}
              dependencies={dependencies}
              sdks={SDK_VERSIONS.jvm}
            />
          );
        case "swift":
          return (
            <SwiftDependencies
              sdkVersions={SDK_VERSIONS}
              dependencies={dependencies}
            />
          );
        default:
          return null; // Handle unsupported languages
      }
    default:
  }

  switch (language) {
    case "javascript":
      return (
        <PackageJson sdkVersions={SDK_VERSIONS} dependencies={dependencies} />
      );
    default:
      return null;
  }
};

export default Dependency;
