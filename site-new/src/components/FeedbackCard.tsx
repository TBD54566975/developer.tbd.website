import React from "react";
import Note from "../../static/Note";
import GitHub from "../../static/GitHub";
import Discord from "../../static/Discord";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";

function FeedbackCard() {
  return (
    <div className="max-w-[600px] border-[0.5px] border-solid border-tbd-yellow p-twist-core-spacing-12">
      <Heading
        as="h3"
        className="text-3xl text-tbd-yellow sm:text-[22px] md:text-3xl"
      >
        Was this page helpful?
      </Heading>
      <div className="my-twist-core-spacing-9">
        <button className="text-lg sm:text-[12px] md:text-lg">Helpful</button>
        <button className="text-lg sm:text-[12px] md:text-lg">
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
