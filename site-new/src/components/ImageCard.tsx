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
  size?: "large" | "medium" | "small"; // New size prop
};

function ImageCard({
  title,
  image = NoImageUrl,
  text,
  buttonText,
  url,
  orientation = "vertical", // Default to vertical orientation
  size = "large", // Default size is large
}: ImageCardProps) {
  const Image = image;

  // Size-specific classes for both horizontal and vertical layouts
  const sizeClasses = {
    large: {
      container: "max-w-[800px]",
      image: orientation === "horizontal" ? "w-[400px]" : "h-[531px]",
      text: orientation === "horizontal" ? "flex-grow" : "h-[269px]",
    },
    medium: {
      container: "max-w-[584px]",
      image: orientation === "horizontal" ? "w-[292px]" : "h-[291px]",
      text: orientation === "horizontal" ? "flex-grow" : "h-[291px]",
    },
    small: {
      container: "max-w-[366px]",
      image: orientation === "horizontal" ? "w-[183px]" : "h-[350px]",
      text: orientation === "horizontal" ? "flex-grow" : "h-[350px]",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      className={`flex ${orientation === "horizontal" ? "flex-row" : "flex-col"} w-full ${currentSize.container} items-stretch border border-gray-300`}
    >
      {/* Image Container */}
      <img
        src={Image}
        alt={title}
        className={`${currentSize.image} object-cover`}
      />
      {/* Text Container */}
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
