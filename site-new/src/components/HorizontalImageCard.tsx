import clsx from "clsx";
import Button from "./Button";

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
          <p className={clsx("text-ellipsis font-inter text-[22px] font-medium leading-[140%]", hoverState && "group-hover:text-[black]")}>
            {description}
          </p>
        </div>
        {button && (
          <Button buttonText={buttonText} hoverState={hoverState} />
        )}
      </div>
    </div>
  );
}

export default HorizontalImageCard;