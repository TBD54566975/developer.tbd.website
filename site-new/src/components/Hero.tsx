import React from "react";
import Background from "@site/src/components/Background";
import Heading from "@theme/Heading";
import Button from "@site/src/components/Button";

type HeroProps = {
  subject: string;
  title: string;
  description: string;
  url?: string;
  buttonText?: string;
};

function Hero({ subject, title, description, url }: HeroProps): JSX.Element {
  return (
    <Background
      className="flex w-full justify-center pt-twist-core-spacing-30"
      bgColor="black"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center text-center text-white">
          <span className="eyebrow text-tbd-yellow">{subject}</span>
          <div className="container mx-auto mt-twist-core-spacing-12 w-[74%]">
            <Heading
              as="h1"
              className="relative mb-4 mt-twist-core-spacing-7 text-[48px] font-medium lg:text-[80px]"
            >
              <span className="text-highlight-middle relative mb-twist-core-spacing-7 inline-block text-tbd-yellow">
                {title}
              </span>
            </Heading>
            <Heading
              as="h4"
              className="mb-8 text-center text-[24px] leading-8 lg:text-[34px] lg:leading-10"
            >
              {description}
            </Heading>
          </div>
          {url && (
            <Button text="Learn More" url="/community/spotlight" size="large" />
          )}
        </div>
      </div>
    </Background>
  );
}

export default Hero;
