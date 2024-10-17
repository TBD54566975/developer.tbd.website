import clsx from "clsx";
import Heading from "@theme/Heading";

type BlogCardProps = {
  date?: Date;
  author?: string;
  title?: string;
  tags?: string[];
  image?: string | null;
  size?: "large" | "small";
  description?: React.ReactNode;
};

function BlogCard({
  date = new Date(),
  author = "author",
  title = "Title",
  tags = [],
  image = require("/static/img/test-image16x9.png").default,
  description,
  size = "small",
}: BlogCardProps) {
  const cardSizeClass = size === "large" ? "max-w-[840px]" : "max-w-[400px]";

  return (
    <div
      className={clsx(
        "group border-2 border-solid border-[gray] bg-dark-grey text-[#FFF] hover:bg-tbd-yellow group-hover:text-tbd-gray",
        cardSizeClass,
      )}
    >
      <img className="block h-auto max-w-full" src={image} />
      <div className="p-4 group-hover:text-tbd-gray">
        <p className="mb-0 font-basis text-xs">{date.toLocaleDateString()}</p>
        <div className="font-semibold text-tbd-yellow group-hover:text-tbd-gray">{`@${author}`}</div>
        <Heading as="h2" className="group-hover:text-tbd-gray">
          {title}
        </Heading>
        {typeof description === "string" ? (
          <p className="mb-twist-core-spacing-10 font-medium lg:text-[18px] lg:leading-[150%]">
            {description}
          </p>
        ) : (
          description
        )}
        <div className="flex">
          {tags.map((t) => (
            <div
              key={t}
              className="m-1.5 flex h-8 items-center justify-center border-[0.5px] border-solid border-[#FFF] p-2 group-hover:border-dark-grey"
            >
              <span className="mr-2 text-[gray]">#</span>
              {`${t}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
