import React from "react";
import Note from "../../static/Note";
import GitHub from "../../static/GitHub";
import Discord from "../../static/Discord";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import XIcon from "../../static/img/XIcon";
import Check from "../../static/img/Check";

function FeedbackCard() {
  return (
    <div className="max-w-[600px] border-[0.5px] border-solid border-tbd-yellow p-twist-core-spacing-12">
      <Heading
        as="h3"
        className="text-tbd-yellow"
      >
        Was this page helpful?
      </Heading>
      <div className="border-1 my-twist-core-spacing-9 flex border-white">
        <button className="mr-twist-core-spacing-5 flex items-center border-[0.5px] border-white bg-tbd-gray-shade-1 px-twist-core-spacing-3 py-twist-core-spacing-2 text-lg text-white sm:text-[12px] md:text-[16px]">
          <Check className="mr-2" />
          Helpful
        </button>
        <button className="mr-twist-core-spacing-5 flex items-center border-[0.5px] border-white bg-tbd-gray-shade-1 px-twist-core-spacing-3 py-twist-core-spacing-2 text-lg text-white sm:text-[12px] md:text-[16px]">
          <XIcon className="mr-2" />
          Not Helpful
        </button>
      </div>
      <div>
        <div className="mb-2 flex items-center text-lg sm:text-[12px] md:text-lg">
          <Discord className="mr-2 size-[18px]" />
          <Link
            to="https://discord.gg/tbd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            Connect with us
          </Link>
        </div>
        <div className="mb-2 flex items-center text-lg sm:text-[12px] md:text-lg">
          <GitHub className="mr-2 size-[18px]" />
          <Link
            to="https://github.com/TBD54566975/developer.tbd.website/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            Submit feedback / edit page
          </Link>
        </div>
        <div className="flex items-center text-lg sm:text-[12px] md:text-lg">
          <Note className="mr-2 size-[18px]" />
          <Link
            to="https://github.com/TBD54566975/developer.tbd.website/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            Contribute
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeedbackCard;
