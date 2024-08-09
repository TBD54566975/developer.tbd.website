import clsx from "clsx";
import TbdArrow from "@site/static/img/tbd-arrow";

type ButtonProps = {
  buttonText: string;
  hoverState: boolean;
};

function Button({ buttonText, hoverState }: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex h-11 items-center gap-1.5 px-3 py-1.5 bg-tbd-yellow text-[black] border-none appearance-none outline-none",
        hoverState &&"group-hover:bg-[black] group-hover:text-white group-hover:border-t-4 group-hover:border-white"
      )}
    >
      <span className="text-[18px] font-medium leading-[100%] font-spaceGrotesk">
        {buttonText}
      </span>
      <TbdArrow
        fill=""
        className={clsx(
          "ml-4 fill-tbd-gray transition-all duration-300 rotate-180 size-5 md:size-6",
           hoverState && "group-hover:fill-white"
        )}
      />
    </button>
  );
}

export default Button;