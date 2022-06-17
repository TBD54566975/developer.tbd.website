import React from 'react';
import Layout from '@theme-original/Layout';
import { GlitchWrapper } from '@site/src/components';
export default function LayoutWrapper(props) {
  return (
    <GlitchWrapper>
      <Layout {...props} />
    </GlitchWrapper>
  );
}
