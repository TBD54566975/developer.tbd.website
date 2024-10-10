import clsx from "clsx";
import Link from "@docusaurus/Link";
import TbdArrow from "@site/static/img/tbd-arrow";

type ButtonProps = {
  size?: "large" | "small";
  text: string;
  url: string;
  className?: string;
};

function Button({
  size = "small",
  text,
  url,
  className = "",
}: ButtonProps) {
  const buttonSizeClass = size === "large" ? "button-large" : "button-small";

  return (
    <div
      className={clsx(
        "group/btn button flex h-fit w-fit cursor-pointer items-center whitespace-nowrap rounded-none border-x-0 border-b-[3px] border-t-0 border-solid border-white bg-transparent bg-gradient-to-b from-black from-50% to-tbd-yellow to-50% bg-[length:201%_201%] bg-bottom bg-origin-border px-twist-core-spacing-3 pb-twist-core-spacing-2_5 pt-twist-core-spacing-3_5 text-black transition-all duration-200 ease-out hover:bg-top hover:text-white",
        buttonSizeClass, className
      )}
    >
      <Link
        href={url}
        className={`font-spaceGrotesk text-inherit no-underline transition-all duration-100 ease-out hover:text-inherit hover:no-underline`}
        rel="noreferrer"
      >
        {text}
      </Link>
      <TbdArrow
        fill=""
        className="ml-2 size-5 rotate-180 fill-tbd-gray transition-all duration-100 ease-out group-hover/btn:fill-white md:size-6"
      />
    </div>
  );
}

export default Button;
