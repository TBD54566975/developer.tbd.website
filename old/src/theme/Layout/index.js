import React from 'react';
import Layout from '@theme-original/Layout';
import { GlitchWrapper } from '@site/src/components';
import MDXContent from '@theme/MDXContent';

export default function LayoutWrapper(props) {
  return (
    <GlitchWrapper>
      <MDXContent>
        <Layout {...props} />
      </MDXContent>
    </GlitchWrapper>
  );
}
