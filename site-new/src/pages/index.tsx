import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Background from "../components/Background";
import Rocket from "@site/static/img/Rocket";
import Underline from "@site/static/img/Underline";
import Hero from "../components/HeroCard";
import Card from "../components/Card";
import tbdRex from "@site/static/img/tbd-rex";
import { PixelBorderWrapper } from "../components/PixelBorder";
import { useEffect, useRef } from "react";

const TYPE_WRITER_TEXT = [
  { text: "We're building", class: "" },
  { text: " open ", class: "text-tbd-yellow" },
  { text: "source toolkits", class: "" },
];

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  const typeWriterRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const typingSpeed = 100;
    const typeWritter = () => {
      let timeout = 0;
      for (let i = 0; i < TYPE_WRITER_TEXT.length; i++) {
        for (let j = 0; j < TYPE_WRITER_TEXT[i].text.length; j++) {
          const currentText = TYPE_WRITER_TEXT[i].text;
          const currentClass = TYPE_WRITER_TEXT[i].class;
          timeout += typingSpeed;
          if (typeWriterRef.current) {
            setTimeout(() => {
              typeWriterRef.current.innerHTML += `<span class=${currentClass}>${currentText.charAt(j)}</span>`;
            }, timeout);
          }
        }
      }
    };
    typeWritter();
  }, []);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Background className="pt-20" bgColor="black">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2">
              <div className="text-white">
                <span className="eyebrow text-tbd-yellow">
                  TEEKAY LOREM IPSUM
                </span>
                <Heading
                  as="h1"
                  className="mb-4 mt-twist-core-spacing-7 text-[48px] font-medium lg:text-[80px]"
                >
                  The future of finance is{" "}
                  <span className="relative mb-twist-core-spacing-7 inline-block text-tbd-yellow">
                    open
                    <Underline className="absolute bottom-[-10px] left-2 fill-tbd-yellow lg:bottom-[-20px] lg:left-4" />
                  </span>
                </Heading>
                <Heading
                  as="h3"
                  className="mb-8 pr-0 text-left text-[24px] leading-8 lg:pr-36 lg:text-[34px] lg:leading-10"
                >
                  What do we mean by open? Well, let's see how many times we can
                  use it in a sentence...
                </Heading>
              </div>
            </div>

            <div className="align-center flex w-full justify-center lg:w-1/2">
              <Rocket className="hidden lg:block" />
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <div className="flex h-[128px] w-[90%] items-center justify-center border-[0.5px] border-solid border-tbd-yellow bg-tbd-gray-shade-1 px-[20px] py-[24px] lg:w-[80%] lg:px-[38px] lg:py-[46px]">
            <p className="mb-0 text-2xl lg:text-3xl" ref={typeWriterRef}>
              {/* We're building <span className="text-tbd-yellow">open</span>{" "}
              source toolkits */}
            </p>{" "}
            <span className="animate-caret ml-1 h-full w-2 bg-tbd-yellow [animation-delay:3.8s]"></span>
          </div>
        </div>

        <PixelBorderWrapper
          blockSize={50}
          outerTopClassName="mt-8 lg:mt-24"
          outerBottomClassName="mb-8 lg:mb-24"
          refreshRate={2500}
        >
          <div>
            <Background
              pixelate={true}
              className="py-8 lg:py-16"
              bgColor="yellow-shade-1"
              refreshRate={5000}
            >
              <div className="mx-auto grid max-w-6xl grid-cols-1 items-center justify-around gap-12 px-8 lg:grid-cols-2">
                <Hero
                  buttonText="Talk Money To me"
                  title="Card 1"
                  content="Description for Card 1"
                  url="/"
                />
                <Hero
                  buttonText="Talk Money To me"
                  title="Card 2"
                  content="Description for Card 2"
                  url="/"
                />
              </div>
            </Background>
          </div>
        </PixelBorderWrapper>

        <Background bgColor="black" className="py-24 lg:py-12">
          <div className="container mx-auto px-4">
            <span className="eyebrow text-tbd-yellow">TEEKAY LOREM IPSUM</span>
            <Heading
              as="h2"
              className="mt-twist-core-spacing-7 max-w-[800px] text-[32px] text-white lg:text-[42px]"
            >
              We’re building the next generation of the decentralized web -
              returning data back to users.
            </Heading>
          </div>
        </Background>

        <Background bgColor="black" className="py-0 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card
                title="Open Protocols"
                text="We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government."
                theme="yellow"
                icon={tbdRex}
              />
              <Card
                title="Open Libraries"
                text="We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government."
                theme="teal"
                icon={tbdRex}
              />
              <Card
                title="Open Standards"
                text="We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government."
                theme="purple"
                icon={tbdRex}
              />
              <Card
                title="Open Source"
                text="We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government."
                theme="yellow"
                icon={tbdRex}
              />
            </div>
          </div>
        </Background>
      </Background>
    </Layout>
  );
}
