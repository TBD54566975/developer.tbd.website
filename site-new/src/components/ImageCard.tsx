import React from "react";
import TextIconCard from "@site/src/components/TextIconCard";
import NoImageUrl from "@site/static/img/no-image.png";

type ImageCardProps = {
  title: string;
  image: string;
  text: string;
  buttonText: string;
  url: string;
  orientation?: "horizontal" | "vertical";
  size?: "large" | "medium" | "small";
};

function ImageCard({
  title,
  image = NoImageUrl,
  text,
  buttonText,
  url,
  orientation = "vertical", // Default orientation is vertical
  size = "large",
}: ImageCardProps) {
  const Image = image;

  const sizeClasses = {
    large: {
      container: "max-w-[800px]",
      image:
        orientation === "horizontal"
          ? "md:w-[400px] w-full h-auto"
          : "h-[531px]",
      text: orientation === "horizontal" ? "md:flex-grow" : "h-[269px]",
    },
    medium: {
      container: "max-w-[584px]",
      image:
        orientation === "horizontal"
          ? "md:w-[292px] w-full h-auto"
          : "h-[291px]",
      text: orientation === "horizontal" ? "md:flex-grow" : "h-[291px]",
    },
    small: {
      container: "max-w-[366px]",
      image:
        orientation === "horizontal"
          ? "md:w-[183px] w-full h-auto"
          : "h-[366px]",
      text: orientation === "horizontal" ? "md:flex-grow" : "h-[350px]",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      className={`flex ${orientation === "horizontal" ? "flex-col md:flex-row" : "flex-col"} w-full ${currentSize.container} items-stretch border border-gray-300`}
    >
      <img
        src={Image}
        alt={title}
        className={`${currentSize.image} object-cover`}
      />
      <TextIconCard
        hasBorder={false}
        theme="yellow"
        title={title}
        text={text}
        url={url}
        buttonText={buttonText}
        className={`${currentSize.text} w-full`}
      />
    </div>
  );
}

export default ImageCard;
