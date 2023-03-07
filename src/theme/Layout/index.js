import React, { useEffect } from 'react';
import Layout from '@theme-original/Layout';
import GlitchWrapper from '@site/src/components/GlitchWrapper';
import MDXContent from '@theme/MDXContent';
import { useLocation } from '@docusaurus/router';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function LayoutWrapper(props) {
  const { pathname } = useLocation();

  return (
    <GlitchWrapper>
      <MDXContent>
        <Layout {...props}>
          <ScrollToTop />
          {props.children}
        </Layout>
      </MDXContent>
    </GlitchWrapper>
  );
}
