import { TwoColumnContainer } from '.';
import React from 'react';
export default {
  title: 'TwoColumnContainer',
  component: TwoColumnContainer,
};

const TemplateDark = () => (
  <TwoColumnContainer>
    <div>
      <h1 className="ml-0 mb-9 h1 text-primary-yellow">
        All projects in the TBD family are in early prototyping.
      </h1>
      <h2 className="h2 text-primary-yellow">
        New contributors should expect a pace of development consistent with
        nascent technology: larger commits, frequent refactoring, changing APIs,
        and incomplete feature sets.
      </h2>
    </div>
    <div className="copy text-primary-yellow">
      <p>We believe open source is not a publishing medium. </p>
      <p>
        These projects are open from the start to welcome your interest, invite
        discussion, identify early issues, and advise on design.
      </p>
      <p>
        An early adopter mindset will work well until these projects mature
        further.
      </p>
      <p>
        The Discussion Forums and Issue Tracker are likely the best way to get
        involved now. Our project leads may be able to guide your efforts and
        incorporate your feedback in ways that will be most meaningful to you
        and the project's goals.
      </p>
      <p>
        In particular, we want to ensure the New Contributor Experience is as
        smooth as possible. You should be able to:
      </p>
      <ul className="copy text-primary-yellow list-disc pl-[1.8125rem]">
        <li>Understand each project's goals and scope</li>
        <li>Install prerequisite dependencies</li>
        <li>Clone and build the project </li>
        <li>Run the tests</li>
        <li>Join the conversation in Discussions and Issues</li>
      </ul>
    </div>
  </TwoColumnContainer>
);

export const Dark = TemplateDark.bind({});
