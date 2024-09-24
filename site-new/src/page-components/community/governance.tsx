import React from "react";
import Hero from "@site/src/components/Hero";
import Background from "@site/src/components/Background";
import Heading from "@theme/Heading";
import { TextIconFeature } from "@site/src/components/TextIconFeature";
import { PixelBorder } from "@site/src/components/PixelBorder";

const contributors = [
  { body: "Demonstrating empathy and kindoess toward other people" },
  { body: "Demonstrating empathy and kindoess toward other people" },
  { body: "Demonstrating empathy and kindoess toward other people" },
  { body: "Demonstrating empathy and kindoess toward other people" },
];

const maintainers = [
  { body: "Demonstrating empathy and kindoess toward other people" },
  { body: "Demonstrating empathy and kindoess toward other people" },
  { body: "Demonstrating empathy and kindoess toward other people" },
  { body: "Demonstrating empathy and kindoess toward other people" },
];

const maintainerActivities = [
  { body: "Demonstrating empathy and kindoess toward other people" },
  { body: "Demonstrating empathy and kindoess toward other people" },
  { body: "Demonstrating empathy and kindoess toward other people" },
  { body: "Demonstrating empathy and kindoess toward other people" },
];

function Governance() {
  return (
    <Background className="container mx-auto px-4" bgColor="black">
      <Hero description="" subject="Community" title="Governance" />
      <div className="w-3/4">
        <Heading className="text-tbd-teal" as="h3">
          Contributors
        </Heading>
        <p>
          Anyone may be a contributor to TBD projects. Contribution may take the
          form of:
        </p>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {contributors.map((feature, index) => (
          <TextIconFeature key={index} body={feature.body} variant="teal" />
        ))}
      </div>
      <PixelBorder tone1="black" tone2="black" className="mt-8" />
      <PixelBorder tone1="black" tone2="black" className="mt-8" />

      <div className="w-3/4">
        <Heading className="text-tbd-yellow" as="h3">
          Maintainers
        </Heading>
        <p>
          Anyone may be a contributor to TBD projects. Contribution may take the
          form of:
        </p>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {maintainers.map((feature, index) => (
          <TextIconFeature key={index} body={feature.body} variant="yellow" />
        ))}
      </div>
      <PixelBorder tone1="black" tone2="black" className="mt-8" />
      <PixelBorder tone1="black" tone2="black" className="mt-8" />
      <div className="w-3/4">
        <Heading className="text-tbd-yellow" as="h3">
          Maintainer Activities
        </Heading>
        <p>
          Anyone may be a contributor to TBD projects. Contribution may take the
          form of:
        </p>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {maintainerActivities.map((feature, index) => (
          <TextIconFeature key={index} body={feature.body} variant="yellow" />
        ))}
      </div>
    </Background>
  );
}

export default Governance;
