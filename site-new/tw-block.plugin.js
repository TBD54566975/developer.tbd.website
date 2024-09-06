// eslint-disable-next-line @typescript-eslint/no-require-imports
const plugin = require("tailwindcss/plugin");

const baseSpacing = 3 / 16;
const unit = "rem";

const spacingVariables = {
  "--twist-core-spacing-base": `${baseSpacing}${unit}`,
  "--twist-core-spacing-0": "0px",
  "--twist-core-spacing-0_5": "calc(0.5 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-1": "var(--twist-core-spacing-base)",
  "--twist-core-spacing-1_5": "calc(1.5 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-2": "calc(2 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-3": "calc(3 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-4": "calc(4 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-5": "calc(5 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-6": "calc(6 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-7": "calc(7 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-8": "calc(8 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-9": "calc(9 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-10": "calc(10 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-12": "calc(12 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-15": "calc(15 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-20": "calc(20 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-25": "calc(25 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-30": "calc(30 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-40": "calc(40 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-50": "calc(50 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-60": "calc(60 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-70": "calc(70 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-90": "calc(90 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-100": "calc(100 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-150": "calc(150 * var(--twist-core-spacing-base))",
  "--twist-core-spacing-200": "calc(200 * var(--twist-core-spacing-base))",
};

// Creates readable comments for spacing values
function generateComment(spacingVariant) {
  if (unit === "px") {
    if (spacingVariant === "base") {
      return `${baseSpacing}px`;
    }
    return `${spacingVariant * baseSpacing}px`;
  } else {
    if (spacingVariant === "base") {
      return `${baseSpacing * 16}px`;
    }
    return `${spacingVariant * baseSpacing * 16}px`;
  }
}

// Generate spacing object
const spacing = Object.entries(spacingVariables).reduce((acc, [key]) => {
  const spacingVariant = key.split("-").at(-1);
  const normalizedSpacingVariant =
    spacingVariant === "base" || spacingVariant === "0"
      ? spacingVariant
      : spacingVariant.replace("_", ".");
  const comment = generateComment(normalizedSpacingVariant);

  return {
    ...acc,
    [key.split("--")[1]]: `var(${key}) /* ${comment} */`,
  };
}, {});

module.exports = plugin(
  ({ addBase }) => {
    addBase({
      ":root": spacingVariables,
    });
  },
  {
    theme: {
      extend: {
        spacing,
      },
    },
  },
);
