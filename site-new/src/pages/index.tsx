import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Background from "../components/Background";
import { BlockBg } from "@site/src/components/BlockBg";
import Rocket from "@site/static/img/Rocket";
import Hero from "../components/HeroCard";
import Card from "../components/Card";
import tbdRex from "@site/static/img/tbd-rex";
import { PixelBorderWrapper } from "../components/PixelBorder";
import { useEffect, useRef } from "react";
import { typeWriter, TypeWriterWordType } from "@site/lib/utils";

const TYPE_WRITER_VARIABLE_TEXT = [
  {
    text: "open source toolkits",
    highlight: [{ start: 0, end: 4 }],
    className: "text-tbd-yellow",
  },
  {
    text: "open standards and protocols",
    highlight: [{ start: 0, end: 4 }],
    className: "text-tbd-yellow",
  },
  {
    text: "open financial access globally",
    highlight: [{ start: 0, end: 4 }],
    className: "text-tbd-yellow",
  },
] satisfies TypeWriterWordType[];

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  const typeWriterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    typeWriter({
      wordsToType: TYPE_WRITER_VARIABLE_TEXT,
      typeWriterRef,
      typingDelay: 1000,
      typingSpeed: 70,
    });
  }, [typeWriterRef]);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <BlockBg
        maxSize={150}
        minSize={50}
        className="mb-twist-core-spacing-50 flex justify-center pt-20"
      >
        <div className="mx-auto w-full max-w-[1200px] px-4 py-12">
          <div className="mx-auto flex flex-wrap items-center">
            <div className="w-full text-center lg:w-1/2 lg:text-left">
              <div className="text-white">
                <span className="eyebrow text-tbd-yellow">
                  TEEKAY LOREM IPSUM
                </span>
                <Heading
                  as="h1"
                  className="mb-4 mt-twist-core-spacing-7 text-[48px] font-medium lg:text-[80px]"
                >
                  The future of finance is{" "}
                  <span className="mb-twist-core-spacing-7 text-highlight-full">
                    Open
                  </span>
                </Heading>
                <Heading
                  as="h3"
                  className="mb-8 pr-0 text-[24px] leading-8 lg:pr-36 lg:text-[34px] lg:leading-10"
                >
                  What do we mean by open? Well, let's see how many times we can
                  use it in a sentence...
                </Heading>
              </div>
            </div>

            <div className="flex w-full justify-center lg:w-1/2">
              <Rocket className="hidden lg:block" />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center px-4">
          <div className="flex h-[128px] w-full max-w-[80%] items-center justify-center border-[0.5px] border-solid border-tbd-yellow bg-transparent px-[20px] py-[24px] lg:px-[38px] lg:py-[46px]">
            <p className="mb-0">
              We're building <span ref={typeWriterRef}></span>
              <span className="relative top-1 ml-1 inline-block h-7 w-1 animate-caret bg-[lightgrey]" />
            </p>
          </div>
        </div>

        <PixelBorderWrapper
          blockSize={50}
          outerTopClassName="mt-8 lg:mt-24"
          outerBottomClassName="mb-8 lg:mb-24"
          refreshRate={2500}
          tone1="black"
        >
          <BlockBg
            animate
            maxSize={150}
            minSize={50}
            className="flex w-full justify-center bg-tbd-yellow-shade-1 py-8 lg:py-16"
            secondaryClassName="bg-tbd-yellow-shade-2"
            intervalDuration={5000}
          >
            <div className="grid w-full max-w-[1200px] grid-cols-1 gap-12 px-4 md:grid-cols-2">
              <Hero
                buttonText="Talk Money To me"
                title="Web5 SDK"
                content="An open source messaging service that enables wallet applications to communicate with financial institutions to discover and obtain liquidity."
                url="/"
              />
              <Hero
                buttonText="Talk Money To me"
                title="tbDEX SDK"
                content="An open source messaging service that enables wallet applications to communicate with financial institutions to discover and obtain liquidity."
                url="/"
              />
            </div>
          </BlockBg>
        </PixelBorderWrapper>

        <div className="mx-auto mb-twist-core-spacing-30 w-full max-w-[1200px] px-4">
          <span className="eyebrow text-tbd-yellow">TEEKAY LOREM IPSUM</span>
          <Heading
            as="h2"
            className="mt-twist-core-spacing-7 max-w-[800px] text-[32px] text-white lg:text-[42px]"
          >
            We’re building the next generation of the decentralized web -
            returning data back to users.
          </Heading>
        </div>

        <div className="flex justify-center px-4">
          <div className="grid w-full max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            <Card
              title="Open Protocols"
              text="We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government."
              theme="yellow"
              icon={tbdRex}
              size="medium"
            />
            <Card
              title="Open Libraries"
              text="We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government."
              theme="teal"
              icon={tbdRex}
              size="medium"
            />
            <Card
              title="Open Standards"
              text="We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government."
              theme="purple"
              icon={tbdRex}
              size="medium"
            />
            <Card
              title="Open Source"
              text="We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government."
              theme="yellow"
              icon={tbdRex}
              size="medium"
            />
          </div>
        </div>
      </BlockBg>
    </Layout>
  );
}
