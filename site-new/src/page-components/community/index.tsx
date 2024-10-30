import Hero from "@site/src/components/Hero";
import Background from "@site/src/components/Background";
import { TextIconFeature } from "@site/src/components/TextIconFeature";
import Card from "@site/src/components/Card";
import { MarqueeTextSkewed } from "@site/src/components/Marquee";

const features = [
  {
    text: "Welcoming everyone to the global economy is a mission that can’t be done alone. It requires collaboration, community, and innovation in shared, open protocols.",
  },
  {
    text: "TBD projects are therefore open source and, where appropriate, built on open standards.",
  },
  {
    text: "Our work is licensed under the Apache License 2.0, and we welcome you to join us in building the future of finance and decentralized Technology.",
  },
];

const explore = [
  {
    title: "Code of Conduct",
    url: "/community/code-of-conduct",
    text: "We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government.",
  },
  {
    title: "Governance",
    url: "/community/governance",
    text: "We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government.",
  },
  {
    title: "Monthly Spotlight",
    url: "/community/spotlight",
    text: "We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government.",
  },
  {
    title: "Open Source Playbook",
    url: "/open-source/playbook",
    text: "We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government.",
  },
  {
    title: "Contribution Guide",
    url: "/open-source/contribute",
    text: "We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government.",
  },
  {
    title: "Calendar",
    url: "/open-source/faq",
    text: "We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government.",
  },
  {
    title: "Contact Us",
    url: "/open-source/contact-us",
    text: "We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government.",
  },
  {
    title: "Project Dashboard",
    url: "/open-source/project-dashboard",
    text: "We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government.",
  },
  {
    title: "Incubation Showcase",
    url: "/open-source/incubation-showcase",
    text: "We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government.",
  },
  {
    title: "Innovators Showcase",
    url: "/open-source/innovators-showcase",
    text: "We’re building open protocols, standards, and libraries. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government.",
  },
];

function Community() {
  return (
    <Background
      bgColor="black"
      className="flex min-h-screen items-center justify-center"
    >
      <div className="w-full text-center">
        <Hero
          subject="Community"
          title="Community"
          description="Today’s financial systems leave people behind.
        We’re building a more inclusive future for anyone 
        with internet access. And we’re creating it like the 
        web itself: as a public good."
        />
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <TextIconFeature
                key={index}
                body={feature.text}
                variant="yellow"
              />
            ))}
          </div>
        </div>
        <MarqueeTextSkewed
          texts={["FUN TEXT HERE"]}
          className="text-black"
          bgColor="teal"
          reverse
          repeat={9}
        />
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {explore.map((feature, index) => (
              <Card
                key={index}
                title={feature.title}
                text={feature.text}
                url={feature.url}
              />
            ))}
          </div>
        </div>
      </div>
    </Background>
  );
}

export default Community;
