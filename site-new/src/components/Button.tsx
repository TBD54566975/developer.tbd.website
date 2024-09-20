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
        "group/btn button bg-transparent bg-bottom hover:bg-top rounded-none w-fit h-fit flex pt-twist-core-spacing-3_5 px-twist-core-spacing-3 pb-twist-core-spacing-2_5 cursor-pointer text-black hover:text-white items-center whitespace-nowrap bg-origin-border transition-all duration-200 ease-out bg-gradient-to-b from-black from-50% to-tbd-yellow to-50% bg-[length:201%_201%] border-solid border-b-[3px] border-x-0 border-t-0 border-white",
        buttonSizeClass
      )}>
        <Link
            href={url}
            className={`font-spaceGrotesk no-underline hover:no-underline transition-all duration-100 ease-out text-inherit hover:text-inherit`}
            target="_blank"
            rel="noreferrer"
            >
            {text}
        </Link>
        <TbdArrow
            fill=""
            className="ml-2 size-5 rotate-180 fill-tbd-gray transition-all duration-100 ease-out md:size-6 group-hover/btn:fill-white"
        />
    </div>
  );
}

export default Button;
