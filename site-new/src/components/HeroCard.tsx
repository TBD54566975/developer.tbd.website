import React from "react";
import Link from "@docusaurus/Link";
import TbdArrow from "@site/static/img/tbd-arrow";
import InfoIcon from "@site/static/img/InfoIcon";
import Heading from "@theme/Heading";
import Button from "@site/src/components/Button";

type HeroCardComponentProps = {
  title: string;
  content: string;
  url: string;
  buttonText: string;
};

function HeroCard({
  title,
  content,
  url,
  buttonText,
}: HeroCardComponentProps): JSX.Element {
  return (
    <div className="max-w-ful mx-auto flex w-full flex-col items-start justify-center border-[1px] border-solid bg-tbd-gray-shade-2 p-6 shadow-[15px_15px_0px_-5px_rgba(0,0,0,0.3)] shadow-tbd-gray-tint-2 transition-all duration-300 ease-in-out hover:translate-y-1 hover:shadow-[5px_5px_0px_-5px_rgba(0,0,0,0.3)] md:max-w-2xl md:p-9">
      <InfoIcon className="h-6 w-6" fill={"#ffec19"} />
      <Heading
        as="h2"
        className="mb-6 mt-4 text-3xl text-tbd-yellow md:text-4xl"
      >
        {title}
      </Heading>
      <p className="mb-6 text-base text-white md:text-lg">{content}</p>
      <div>
        {url && buttonText && <Button text={buttonText} url={url} />}
      </div>
    </div>
  );
}

export default HeroCard;
