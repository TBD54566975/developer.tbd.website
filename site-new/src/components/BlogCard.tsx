import clsx from "clsx";

type BlogCardProps = {
  date?: Date;
  author?: string;
  title?: string;
  tags?: string[];
  image?: string | null;
  description?: string;
  size?: "large" | "small";
};

function BlogCard({
  date = new Date(),
  author = "author",
  title = "Title",
  tags = [],
  image = require("/static/img/test-image16x9.png").default,
  description = "Some description here",
  size = "small",
}: BlogCardProps) {
  const cardSizeClass = size === "large" ? "max-w-[840px]" : "max-w-[400px]";

  return (
    <div
      className={clsx(
        "group border-[gray] border-2 border-solid bg-dark-grey hover:bg-tbd-yellow text-[#FFF] hover:text-[black]",
        cardSizeClass
      )}
    >
      <img className="h-auto max-w-full block" src={image} />
      <div className="p-4">
        <div>{date.toLocaleDateString()}</div>
        <div className="text-tbd-yellow group-hover:text-[black]">{`@${author}`}</div>
        <h2 className="text-4xl tracking-wide">{title}</h2>
        <div className="flex">
          {tags.map((t) => (
            <div
              key={t}
              className="border-[#FFF] group-hover:border-dark-grey border-2 border-solid p-2 m-1.5 h-8 justify-center flex items-center"
            >
              <span className="text-[gray] mr-2">#</span>
              {`${t}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
