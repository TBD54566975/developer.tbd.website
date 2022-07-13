import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import {
  TooltipWrapper,
  ButtonGroup,
  Actors,
  ProjectList,
  Divider,
  PillarList,
  SwitchIllustration,
  TwoColumnContainer,
} from '@site/src/components';

export default {
  ...MDXComponents,
  TooltipWrapper: TooltipWrapper,
  ButtonGroup: ButtonGroup,
  Actors: Actors,
  ProjectList: ProjectList,
  Divider: Divider,
  PillarList: PillarList,
  SwitchIllustration: SwitchIllustration,
  IconTextButton: IconTextButton,
  TwoColumnContainer: TwoColumnContainer,
};
