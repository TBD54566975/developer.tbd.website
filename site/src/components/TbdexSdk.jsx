import React from 'react';

const TbdexSdk = () => {
  return (
    <div className="not-prose">
      <h1 className="h1 text-primary-yellow mb-12">SDKs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="col-span-1">
          <h3>Protocol</h3>
          <span>Create, verify, and validate tbDEX messages</span>
          <div className="api-card flex flex-col bg-transparent border-2 shadow overflow-hidden sm:rounded-sm px-4 py-5 sm:px-6 border-primary-yellow">
            <div className="api-card-icon flex-row space-x-4">
              <div className="flex flex-col items-center">
                <a
                  href="https://www.npmjs.com/package/@tbdex/protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
                    alt="typescript"
                  />
                </a>
                <span className="mt-2 text-sm">Typescript</span>
              </div>
              <div className="flex flex-col items-center">
                <a
                  href="https://mvnrepository.com/artifact/xyz.block/tbdex-protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg"
                    alt="kotlin"
                  />
                </a>
                <span className="mt-2 text-sm">Kotlin</span>
              </div>
              <div className="flex flex-col items-center">
                <a
                  href="https://swiftpackageindex.com/TBD54566975/tbdex-swift"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg"
                    alt="swift"
                  />
                </a>
                <span className="mt-2 text-sm">Swift</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <h3>HTTP Client</h3>
          <span>Send tbDEX messages to PFIs as a Wallet</span>
          <div className="api-card flex flex-col bg-transparent border-2 shadow overflow-hidden sm:rounded-sm px-4 py-5 sm:px-6 border-primary-yellow">
            <div className="api-card-icon flex-row space-x-4">
              <div className="flex flex-col items-center">
                <a
                  href="https://www.npmjs.com/package/@tbdex/http-client"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
                    alt="typescript"
                  />
                </a>
                <span className="mt-2 text-sm">Typescript</span>
              </div>
              <div className="flex flex-col items-center">
                <a
                  href="https://mvnrepository.com/artifact/xyz.block/tbdex-httpclient"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg"
                    alt="kotlin"
                  />
                </a>
                <span className="mt-2 text-sm">Kotlin</span>
              </div>
              <div className="flex flex-col items-center">
                <a
                  href="https://swiftpackageindex.com/TBD54566975/tbdex-swift"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg"
                    alt="swift"
                  />
                </a>
                <span className="mt-2 text-sm">Swift</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <h3>HTTP Server</h3>
          <span>Implement tbDEX API specification as a PFI</span>
          <div className="api-card flex flex-col bg-transparent border-2 shadow overflow-hidden sm:rounded-sm px-4 py-5 sm:px-6 border-primary-yellow">
            <div className="api-card-icon flex-row space-x-4">
              <div className="flex flex-col items-center">
                <a
                  href="https://www.npmjs.com/package/@tbdex/http-server"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
                    alt="typescript"
                  />
                </a>
                <span className="mt-2 text-sm">Typescript</span>
              </div>
              <div className="flex flex-col items-center">
                <a
                  href="https://mvnrepository.com/artifact/xyz.block/tbdex-httpserver"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg"
                    alt="kotlin"
                  />
                </a>
                <span className="mt-2 text-sm">Kotlin</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TbdexSdk;
