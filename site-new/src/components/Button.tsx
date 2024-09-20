import clsx from "clsx";
import Link from "@docusaurus/Link";
import TbdArrow from "@site/static/img/tbd-arrow";

type ButtonProps = {
  size?: "large" | "small";
  text: string;
  url: string;
};

function Button({
  size = "small",
  text,
  url,
}: ButtonProps) {
  const buttonSizeClass = size === "large" ? "button-large" : "button-small";

  return (
    <div
      className={clsx(
        "button default-bg rounded-none w-fit pt-twist-core-spacing-3_5 px-twist-core-spacing-3 pb-twist-core-spacing-2_5",
        buttonSizeClass
      )}>
        <Link
            href={url}
            className={`font-spaceGrotesk no-underline hover:no-underline`}
            target="_blank"
            rel="noreferrer"
            >
            {text}
        </Link>
        <TbdArrow
            fill=""
            className="ml-4 size-5 rotate-180 fill-tbd-gray transition-all duration-300 group-hover:fill-white md:size-6"
        />
    </div>
  );
}

export default Button;
