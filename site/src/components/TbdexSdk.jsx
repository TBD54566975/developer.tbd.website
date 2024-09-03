import React from 'react';
import SdkCard from './SdkCard'; 

const TbdexSdk = () => {
  return (
    <div className="not-prose">
      <h1 className="h1 text-primary-yellow mb-12">SDKs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SdkCard
          title="Protocol"
          description="Create, verify, and validate tbDEX messages"
          links={[
            {
              href: "https://www.npmjs.com/package/@tbdex/protocol",
              imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
              alt: "typescript",
              text: "Typescript",
            },
            {
              href: "https://mvnrepository.com/artifact/xyz.block/tbdex-protocol",
              imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
              alt: "kotlin",
              text: "Kotlin",
            },
            {
              href: "https://swiftpackageindex.com/TBD54566975/tbdex-swift",
              imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
              alt: "swift",
              text: "Swift",
            },
          ]}
        />
        <SdkCard
          title="HTTP Client"
          description="Send tbDEX messages to PFIs as a Wallet"
          links={[
            {
              href: "https://www.npmjs.com/package/@tbdex/http-client",
              imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
              alt: "typescript",
              text: "Typescript",
            },
            {
              href: "https://mvnrepository.com/artifact/xyz.block/tbdex-httpclient",
              imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
              alt: "kotlin",
              text: "Kotlin",
            },
            {
              href: "https://swiftpackageindex.com/TBD54566975/tbdex-swift",
              imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
              alt: "swift",
              text: "Swift",
            },
          ]}
        />
        <SdkCard
          title="HTTP Server"
          description="Implement tbDEX API specification as a PFI"
          links={[
            {
              href: "https://www.npmjs.com/package/@tbdex/http-server",
              imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
              alt: "typescript",
              text: "Typescript",
            },
            {
              href: "https://mvnrepository.com/artifact/xyz.block/tbdex-httpserver",
              imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
              alt: "kotlin",
              text: "Kotlin",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default TbdexSdk;
