import React from 'react';
import SdkCard from './SdkCard'; 

const Web5Sdk = () => {
  return (
    <div className="not-prose">
      <h1 className="h1 text-primary-yellow mb-12">SDKs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SdkCard
          title="Web5 DIDs"
          description="Create and manage decentralized identifiers"
          links={[
            {
              href: "https://www.npmjs.com/package/@web5/dids",
              imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
              alt: "typescript",
              text: "Typescript",
            },
            {
              href: "https://mvnrepository.com/artifact/xyz.block/web5-dids",
              imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
              alt: "kotlin",
              text: "Kotlin",
            },
            {
              href: "https://swiftpackageindex.com/TBD54566975/web5-swift",
              imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
              alt: "swift",
              text: "Swift",
            },
          ]}
        />
        <SdkCard
          title="Web5 Credentials"
          description="Create and manage verifiable credentials"
          links={[
            {
              href: "https://www.npmjs.com/package/@web5/credentials",
              imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
              alt: "typescript",
              text: "Typescript",
            },
            {
              href: "https://mvnrepository.com/artifact/xyz.block/web5-credentials",
              imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
              alt: "kotlin",
              text: "Kotlin",
            },
            {
              href: "https://swiftpackageindex.com/TBD54566975/web5-swift",
              imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
              alt: "swift",
              text: "Swift",
            },
          ]}
        />
        <SdkCard
          title="Web5 DWN API"
          description="Create and manage decentralized web nodes"
          links={[
            {
              href: "https://www.npmjs.com/package/@web5/api",
              imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
              alt: "typescript",
              text: "Typescript",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Web5Sdk;
