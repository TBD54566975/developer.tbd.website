import React from "react";
import Button from "./Button";

interface ButtonData {
  [key: string]: any; // Represents other possible properties in the button data object
}

interface ButtonGroupProps {
  buttons: { data: ButtonData }[];
  className?: string;
  invertDarkMode?: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, className }) => {
  console.log(buttons);
  return (
    <div className={`not-prose flex flex-wrap gap-4 ${className ?? ""}`}>
      {buttons.map((button) => (
        <div key={button.data.label} className="w-fit">
          <Button text={button.data.label} url={button.data.url} />
        </div>
      ))}
    </div>
  );
};

export default ButtonGroup;
