import React, { useId } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as LabelPrimitive from "@radix-ui/react-label";
import CheckIcon from "@site/static/img/CheckIcon";
import { cn } from "@site/lib/utils";

type Props = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  label?: string | React.ReactNode;
};
const Checkbox = ({ className, label, ...props }: Props) => {
  const id = useId();
  return (
    <div className="flex items-start">
      <CheckboxPrimitive.Root
        id={id}
        className={cn(
          "flex size-twist-core-spacing-5 items-center justify-center",
          "relative border-[2px] border-solid border-black focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75",
          className,
          {
            "mt-1.5": typeof label === "object",
          },
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="absolute inset-0 grid place-items-center bg-black">
          <CheckIcon />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {label && (
        <LabelPrimitive.Label
          htmlFor={id}
          className={cn("select-none", {
            "p ml-3 text-sm font-medium text-gray-900":
              typeof label === "string",
          })}
        >
          {label}
        </LabelPrimitive.Label>
      )}
    </div>
  );
};

export default Checkbox;
