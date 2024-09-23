import React from "react";
import Background from "@site/src/components/Background";
import { SpotLightCard } from "@site/src/components/SpotLightCard";
import PixelBorderWrapper from "@site/src/components/PixelBorder/PixelBorderWrapper";
import Hero from "@site/src/components/Hero";

const spotlights = [
  {
    src: "https://avatars.githubusercontent.com/u/1852675?v=4",
    handle: "@dayhaysoos",
    title: "Rising Star Award",
    alt: "Picture of someone",
    tone: "yellow",
    description:
      "From jumping headfirst into a todo app with Web5 to answering questions straight away, it's thanks to members like you that our community is so lively. Thank you for being here.🍻",
  },
  {
    src: "https://avatars.githubusercontent.com/u/87654321?v=4",
    handle: "@johndoe",
    title: "Innovator of the Month",
    alt: "Picture of John Doe",
    tone: "yellow",
    description:
      "Leading the charge with new ideas, John has contributed immensely to the development of key features that shaped our latest release. Kudos to you! 🎉",
  },
  {
    src: "https://avatars.githubusercontent.com/u/24681357?v=4",
    handle: "@janedoe",
    title: "Mentor Extraordinaire",
    alt: "Picture of Jane Doe",
    tone: "yellow",
    description:
      "Always ready to lend a hand, Jane has been an incredible mentor to new community members, offering advice and guiding them through their first contributions. 🙌",
  },
  {
    src: "https://avatars.githubusercontent.com/u/23456789?v=4",
    handle: "@alexsmith",
    title: "Community Champion",
    alt: "Picture of Alex Smith",
    tone: "yellow",
    description:
      "Alex has consistently gone above and beyond in contributing to discussions, offering solutions, and helping the community grow. You're a star! 🌟",
  },
  {
    src: "https://avatars.githubusercontent.com/u/34567890?v=4",
    handle: "@sarahconnor",
    title: "Support Hero",
    alt: "Picture of Sarah Connor",
    tone: "yellow",
    description:
      "With a knack for solving complex issues, Sarah has been an invaluable resource in the support channel, helping users resolve their challenges swiftly. 💪",
  },
  {
    src: "https://avatars.githubusercontent.com/u/45678901?v=4",
    handle: "@michaeljohnson",
    title: "Best Bug Hunter",
    alt: "Picture of Michael Johnson",
    tone: "yellow",
    description:
      "Michael has a keen eye for catching bugs and has reported numerous issues that improved the stability of our product. Keep hunting, Michael! 🐞",
  },
  {
    src: "https://avatars.githubusercontent.com/u/56789012?v=4",
    handle: "@lisawilliams",
    title: "Documentation Wizard",
    alt: "Picture of Lisa Williams",
    tone: "yellow",
    description:
      "Lisa has significantly contributed to our documentation, making it easier for everyone to understand and contribute to our project. We appreciate your thoroughness! 📚",
  },
  {
    src: "https://avatars.githubusercontent.com/u/67890123?v=4",
    handle: "@emilywhite",
    title: "Creative Contributor",
    alt: "Picture of Emily White",
    tone: "yellow",
    description:
      "Emily has brought a fresh perspective to our design discussions, contributing creative ideas that helped shape the visual identity of our platform. 🎨",
  },
  {
    src: "https://avatars.githubusercontent.com/u/78901234?v=4",
    handle: "@robertbrown",
    title: "Code Master",
    alt: "Picture of Robert Brown",
    tone: "yellow",
    description:
      "Robert's deep understanding of code architecture has been crucial in enhancing our backend infrastructure. You're the backbone of the project! 🔧",
  },
];

function Spotlight(): JSX.Element {
  return (
    <Background
      className="flex w-full justify-center pt-twist-core-spacing-30"
      bgColor="black"
      squareCount={20}
    >
      <Hero
        subject="Community"
        title="Monthly Spotlight"
        description="Shoutout to our superstar contributors! Whether you're coding, brainstorming, or cheering us on, every contribution adds magic to our community. Ready to contribute? We're looking forward to seeing your name light up this space soon! 🚀"
        url="https://discord.gg/tbd"
      />

      <PixelBorderWrapper>
        <Background pixelate>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {spotlights.map((spotlight, index) => (
              <SpotLightCard
                key={index}
                src={spotlight.src}
                handle={spotlight.handle}
                title={spotlight.title}
                alt={spotlight.alt}
                tone="yellow"
              >
                <p>{spotlight.description}</p>
              </SpotLightCard>
            ))}
          </div>
        </Background>
      </PixelBorderWrapper>
    </Background>
  );
}

export default Spotlight;
