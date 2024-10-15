import React from "react";
import Hero from "@site/src/components/Hero";
import Background from "@site/src/components/Background";
import Heading from "@theme/Heading";
import { TextIconFeature } from "@site/src/components/TextIconFeature";
import { PixelBorder } from "@site/src/components/PixelBorder";
import Card from "@site/src/components/Card";

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

const governanceCommittee = [
  { body: "Demonstrating empathy and kindoess toward other people" },
  { body: "Demonstrating empathy and kindoess toward other people" },
  { body: "Demonstrating empathy and kindoess toward other people" },
  { body: "Demonstrating empathy and kindoess toward other people" },
];

const currentGC = [
  {
    handle: "Ben Boeser",
    title: "Technical Partnerships Lead, TBD",
    src: "https://avatars.githubusercontent.com/u/78901234?v=4",
  },
  {
    handle: "Ben Boeser",
    title: "Technical Partnerships Lead, TBD",
    src: "https://avatars.githubusercontent.com/u/78901234?v=4",
  },
  {
    handle: "Ben Boeser",
    title: "Technical Partnerships Lead, TBD",
    src: "https://avatars.githubusercontent.com/u/78901234?v=4",
  },
  {
    handle: "Ben Boeser",
    title: "Technical Partnerships Lead, TBD",
    src: "https://avatars.githubusercontent.com/u/78901234?v=4",
  },
  {
    handle: "Ben Boeser",
    title: "Technical Partnerships Lead, TBD",
    src: "https://avatars.githubusercontent.com/u/78901234?v=4",
  },
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
      <PixelBorder tone1="black" tone2="black" className="mt-8" />
      <PixelBorder tone1="black" tone2="black" className="mt-8" />
      <div className="w-3/4">
        <Heading className="text-tbd-teal" as="h3">
          Governance Committee
        </Heading>
        <p>
          The TBD Open Source Governance Committee (GC) has final authority over
          this project, including:
        </p>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {governanceCommittee.map((feature, index) => (
          <TextIconFeature key={index} body={feature.body} variant="teal" />
        ))}
      </div>
      <PixelBorder tone1="black" tone2="black" className="mt-8" />
      <PixelBorder tone1="black" tone2="black" className="mt-8" />
      <div className="w-3/4">
        <Heading className="text-tbd-teal" as="h3">
          Current GC members:
        </Heading>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {currentGC.map(({ title, handle, src }, index) => (
          <Card
            key={index}
            eyebrow={title}
            title={handle}
            theme="teal"
            image={src}
          />
        ))}
      </div>
      <p className="text-white">
        Members are not to be contacted individually. The GC may be reached
        through tbd-open-source-governance@squareup.com and is an available
        resource in mediation or for sensitive cases beyond the scope of project
        maintainers. It operates as a "Self-appointing council or board" as
        defined by Red Hat: Open Source Governance Models.
      </p>
    </Background>
  );
}

export default Governance;
