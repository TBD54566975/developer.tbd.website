import React, { useEffect } from 'react';
import Layout from '@theme-original/Layout';
import GlitchWrapper from '@site/src/components/GlitchWrapper';
import MDXContent from '@theme/MDXContent';

export default function LayoutWrapper(props) {
  return (
    <GlitchWrapper>
      <MDXContent>
        <Layout {...props}>{props.children}</Layout>
      </MDXContent>
    </GlitchWrapper>
  );
}
