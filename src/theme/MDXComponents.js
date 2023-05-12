import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import TooltipWrapper from '@site/src/components/TooltipWrapper';
import ButtonGroup from '@site/src/components/ButtonGroup';
import Actors from '@site/src/components/Actors';
import ProjectList from '@site/src/components/ProjectList';
import Divider from '@site/src/components/Divider';
import PillarList from '@site/src/components/PillarList';
import SwitchIllustration from '@site/src/components/SwitchIllustration';
import TwoColumnContainer from '@site/src/components/TwoColumnContainer';
import Community from '@site/src/components/Community';

export default {
  ...MDXComponents,
  TooltipWrapper,
  ButtonGroup,
  Actors: Actors,
  ProjectList: ProjectList,
  Divider: Divider,
  PillarList: PillarList,
  SwitchIllustration: SwitchIllustration,
  TwoColumnContainer: TwoColumnContainer,
  Community: Community,
  p: (props) => <p {...props} className="my-6 copy" />,
  ul: (props) => <ul {...props} className="list-disc pl-6 copy my-8" />,
  li: (props) => <li {...props} className="my-4" />,
  strong: (props) => (
    <strong {...props} className="font-bold text-primary-yellow" />
  ),
};
