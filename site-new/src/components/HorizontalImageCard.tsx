import clsx from "clsx";
import TbdArrow from "@site/static/img/tbd-arrow";

type HorizontalImageCard = {
  title: string;
  image: string;
  description: string;
  button?: boolean;
  state: "default" | "hover";
  buttonText?: string;
};

function HorizontalImageCard({
  title = "Title",
  image = require("/static/img/test-card-image.png").default,
  description = "Some description here",
  button = true,
  buttonText = "Some button text here",
  state = "default",
}: HorizontalImageCard) {
  const hoverState = state === "hover";

  return (
    <div
      className={clsx(
        "group flex flex-row items-start border-tbd-yellow border-[0.5px] border-solid h-[400.5px] col-span-8",
        hoverState && "hover:bg-tbd-yellow"
      )}
    >
      <img src={image} className="h-full object-cover" />
      <div className={clsx("tbd-gray-shade-2 h-full p-4 items-start gap-7 self-stretch w-[400.5px]")}>
        <div className={clsx("gap-1 items-start self-stretch")}>
          <h3 className={clsx("text-tbd-yellow", hoverState && "group-hover:text-[black]")}>
            {title}
          </h3>
          <p className={clsx("text-ellipsis", hoverState && "group-hover:text-[black]")}>
            {description}
          </p>
        </div>
        {button && (
          <button className={clsx("flex h-11 items-center gap-1.5 px-3 py-1.5 bg-tbd-yellow text-[black]", hoverState && "group-hover:bg-[black] group-hover:text-white")}>
            {buttonText}
            <TbdArrow
              fill=""
              className={clsx("ml-4 fill-tbd-gray transition-all duration-300 rotate-180 size-5 md:size-6", hoverState && "group-hover:fill-white")}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default HorizontalImageCard;
