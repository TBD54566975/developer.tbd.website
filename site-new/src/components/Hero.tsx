import React from "react";
import Link from "@docusaurus/Link";
import TbdArrow from "@site/static/img/tbd-arrow";
import InfoIcon from "@site/static/img/InfoIcon";

type HeroComponentProps = {
  title: string;
  content: string;
  url: string;
  buttonText: string;
};

function Hero({
  title,
  content,
  url,
  buttonText,
}: HeroComponentProps): JSX.Element {
  return (
    <div className="col-span-6 col-start-2 flex flex-col items-start justify-center border-[1px] border-solid bg-tbd-gray-shade-2 p-9 shadow-[15px_15px_0px_-5px_rgba(0,0,0,0.3)] shadow-tbd-gray-tint-2">
      <InfoIcon className="h-6 w-6" fill={"#ffec19"} />
      <h2 className="mb-8 mt-4 text-4xl text-tbd-yellow">{title}</h2>
      <p className="text-lg text-white">{content}</p>
      <div>
        <Link
          href={url}
          className="text-black mt-twist-core-spacing-6 flex items-center rounded-none bg-tbd-yellow px-4 py-2 text-lg font-medium text-tbd-gray-shade-2 hover:text-tbd-gray-shade-2"
        >
          {buttonText}
          <TbdArrow
            className="ml-2 h-6 w-6 rotate-180 bg-tbd-yellow"
            fill={"black"}
          />
        </Link>
      </div>
    </div>
  );
}

export default Hero;
