import React from 'react';
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
import ConferenceSchedule from '@site/src/components/ConferenceScheduleSection';
import ConferenceCommunity from '@site/src/components/ConferenceCommunitySection';
import LanguageSwitchBlock from '@site/src/components/language/LanguageSwitchBlock';
import LanguageSwitchLink from '@site/src/components/language/LanguageSwitchLink';
import LanguageSupport from '@site/src/components/language/LanguageSupport';
import LanguageSwitcher from '@site/src/components/language/LanguageSwitcher';
import LanguageTabBar from '@site/src/components/language/LanguageTabBar';
import Dependency from '@site/src/components/Dependency';
import Shnip from '@site/src/components/language/Shnip';
import CodeBlock from '@theme/CodeBlock';
import QuickstartCodeRunner from '@site/src/components/QuickstartCodeRunner';


import Dependencies from '@site/src/components/Dependencies';
const CustomMDXComponents = {
  ...MDXComponents,
  TooltipWrapper,
  ButtonGroup,
  Actors,
  ProjectList,
  Divider,
  Dependency,
  PillarList,
  SwitchIllustration,
  TwoColumnContainer,
  Community,
  ConferenceSchedule,
  ConferenceCommunity,
  LanguageSwitchBlock,
  LanguageSwitchLink,
  LanguageSupport,
  LanguageSwitcher,
  LanguageTabBar,
  Shnip,
  CodeBlock,
  Dependencies,
  QuickstartCodeRunner,
  p: (props) => <p {...props} className="my-6 copy" />,
  ul: (props) => <ul {...props} className="list-disc pl-6 copy my-8" />,
  li: (props) => <li {...props} className="my-4" />,
  strong: (props) => (
    <strong {...props} className="font-bold text-primary-yellow" />
  ),
};
export default CustomMDXComponents;
