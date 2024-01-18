import React, { useEffect } from 'react';
import Layout from '@theme-original/Layout';
import GlitchWrapper from '@site/src/components/GlitchWrapper';
import MDXContent from '@theme/MDXContent';
import { useLocation } from '@docusaurus/router';
import ChatSearch from '../../components/ChatGPTSearch';

import { SSRProvider } from '@react-aria/ssr';

export default function LayoutWrapper(props) {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      function scrollToAnchor() {
        document.getElementById(hash.substring(1))?.scrollIntoView();
        clearTimeout(timeout);
      }
      const timeout = setTimeout(scrollToAnchor, 0);
    }
  }, []);
  return (
    <SSRProvider>
      <GlitchWrapper>
      <ChatSearch/>        
        <MDXContent>          
          <Layout {...props}>{props.children}</Layout>
        </MDXContent>
      </GlitchWrapper>
    </SSRProvider>
  );
}
