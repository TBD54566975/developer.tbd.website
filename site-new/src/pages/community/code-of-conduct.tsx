import React from "react";
import Hero from "@site/src/components/Hero";
import { TextIconFeature } from "@site/src/components/TextIconFeature";
import Heading from "@theme/Heading";
import { BackgroundColors } from "@site/lib/utils";
import { EyeFilled } from "@site/assets/icons/Eye";
import Link from "@docusaurus/Link";
import Background from "@site/src/components/Background";

const positiveBehaviorExamples = [
  {
    title: "Be Inclusive",
    body: "We are committed to building a welcoming and inclusive community for everyone.",
    variant: "yellow",
  },
  {
    title: "Be Respectful",
    body: "We value diverse opinions and treat one another with respect even when disagreements arise.",
    variant: "teal",
  },
  {
    title: "Promote Safety",
    body: "Make the environment safe for everyone by promoting kindness and compassion.",
    variant: "purple",
  },
  {
    title: "Collaborate Openly",
    body: "Share your knowledge and experiences openly and honestly.",
    variant: "yellow",
  },
  {
    title: "Help Others",
    body: "Offer help to those who need it, fostering a collaborative environment.",
    variant: "teal",
  },
];

const unacceptableBehaviorExamples = [
  {
    title: "Discrimination",
    body: "Disrespectful, demeaning, or exclusionary behavior is not tolerated.",
    variant: "yellow",
  },
  {
    title: "Harassment",
    body: "Harassing comments, unwelcome advances, or personal attacks are prohibited.",
    variant: "teal",
  },
  {
    title: "Intimidation",
    body: "Any form of intimidation or threats will result in immediate action.",
    variant: "purple",
  },
  {
    title: "Disruption",
    body: "Disruptive actions that prevent others from participating are unacceptable.",
    variant: "yellow",
  },
  {
    title: "Disrespect",
    body: "Personal attacks or insults directed at community members are prohibited.",
    variant: "teal",
  },
];

function CodeOfConduct() {
  return (
    <Background bgColor="black">
      <Hero
        subject="Community"
        title="Code of Conduct"
        description="TBD builds infrastructure for the next wave of innovation in financial services — which we believe will be decentralized, permissionless, and non-custodial."
      />

      <div className="container mx-auto px-4 py-12">
        <Heading className="text-tbd-yellow" as="h3">
          Our Pledge
        </Heading>
        <p>
          We as members, contributors, and leaders pledge to make participation
          in our community a harassment-free experience for everyone, regardless
          of age, physical appearance, visible or invisible disability,
          ethnicity, gender identity, and more.
        </p>

        <Heading className="text-tbd-yellow" as="h3">
          Our Standards
        </Heading>
        <p>
          Examples of behavior that contribute to a positive environment for our
          community include:
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {positiveBehaviorExamples.map((feature, index) => (
            <TextIconFeature
              key={index}
              title={feature.title}
              body={feature.body}
              variant={feature.variant as BackgroundColors}
            />
          ))}
        </div>

        <p className="mt-8">Examples of unacceptable behavior include:</p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {unacceptableBehaviorExamples.map((feature, index) => (
            <TextIconFeature
              key={index}
              title={feature.title}
              body={feature.body}
              variant={"red"}
              icon={() => <EyeFilled className="text-[#FF401D]" />}
            />
          ))}
        </div>

        <Heading className="mt-12 text-tbd-yellow" as="h3">
          Enforcement Responsibilities
        </Heading>
        <p>
          The TBD Open Source Governance Committee (GC) is responsible for
          clarifying and enforcing our standards of acceptable behavior and will
          take appropriate and fair corrective action in response to any
          behavior that they deem inappropriate, threatening, offensive, or
          harmful.
        </p>
        <p>
          The GC has the right and responsibility to remove, edit, or reject
          comments, commits, code, wiki edits, issues, and other contributions
          that are not aligned to this Code of Conduct, and will communicate
          reasons for moderation decisions when appropriate.
        </p>

        <Heading className="mt-12 text-tbd-yellow" as="h3">
          Scope
        </Heading>
        <p>
          This Code of Conduct applies within all project spaces, and it also
          applies when an individual is representing the project or its
          community in public spaces. Examples of representing a project or
          community include using an official project e-mail address, posting
          via an official social media account, or acting as an appointed
          representative at an online or offline event, or any space where the
          project is listed as part of your profile.
        </p>

        <Heading className="mt-12 text-tbd-yellow" as="h3">
          Enforcement
        </Heading>
        <p>
          Instances of abusive, harassing, or otherwise unacceptable behavior
          may be reported to the TBD Open Source Governance Committee (GC) at
          tbd-open-source-governance@squareup.com. All complaints will be
          reviewed and investigated promptly and fairly.
        </p>
        <p>
          The GC is obligated to respect the privacy and security of the
          reporter of any incident.
        </p>

        <Heading className="mt-12 text-tbd-yellow" as="h3">
          Enforcement Guidelines
        </Heading>
        <p>
          The GC will follow these Community Impact Guidelines in determining
          the consequences for any action they deem in violation of this Code of
          Conduct:
        </p>
        <ol className="ml-6 list-decimal">
          <li>
            <strong>Correction:</strong> Community Impact: Use of inappropriate
            language or other behavior deemed unprofessional or unwelcome in the
            community. Consequence: A private, written warning from the GC,
            providing clarity around the nature of the violation and an
            explanation of why the behavior was inappropriate. A public apology
            may be requested.
          </li>
          <li>
            <strong>Warning:</strong> Community Impact: A violation through a
            single incident or series of actions. Consequence: A warning with
            consequences for continued behavior. No interaction with the people
            involved, including unsolicited interaction with those enforcing the
            Code of Conduct, for a specified period of time. This includes
            avoiding interactions in community spaces as well as external
            channels like social media and forums.
          </li>
          <li>
            <strong>Temporary Ban:</strong> Community Impact: A serious
            violation of community standards, including sustained inappropriate
            behavior. Consequence: A temporary ban from any sort of interaction
            or public communication with the community for a specified period of
            time. No public or private interaction with the people involved,
            including unsolicited interaction with those enforcing the Code of
            Conduct, is allowed during this period. Violating these terms may
            lead to a permanent ban.
          </li>
          <li>
            <strong>Permanent Ban:</strong> Community Impact: Demonstrating a
            pattern of violation of community standards, including sustained
            inappropriate behavior, harassment of an individual, or aggression
            toward or disparagement of classes of individuals. Consequence: A
            permanent ban from any sort of public interaction within the
            community.
          </li>
        </ol>

        <Heading className="mt-12 text-tbd-yellow" as="h3">
          Attribution
        </Heading>
        <p>
          This Code of Conduct is adapted from the Contributor Covenant, version
          2.1, available at{" "}
          <Link
            href="https://www.contributor-covenant.org/version/2/1/code_of_conduct.html"
            className="text-tbd-yellow underline"
          >
            https://www.contributor-covenant.org/version/2/1/code_of_conduct.html
          </Link>
          . Community Impact Guidelines were inspired by Mozilla's code of
          conduct enforcement ladder.
        </p>
      </div>
    </Background>
  );
}

export default CodeOfConduct;
