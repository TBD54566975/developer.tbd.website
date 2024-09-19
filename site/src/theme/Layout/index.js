import React, { useEffect } from 'react';
import Layout from '@theme-original/Layout';
import GlitchWrapper from '@site/src/components/GlitchWrapper';
import MDXContent from '@theme/MDXContent';
import { useLocation } from '@docusaurus/router';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import ChatSearch from '../../components/ChatGPTSearch';
import { LanguageProvider } from '../../components/language/LanguageContext';
import NewsletterSubscription from '../../components/NewsletterSubscribe';

import { SSRProvider } from '@react-aria/ssr';
import { LanguageOptionsProvider } from '../../components/language/SupportedLanguagesContext';

export default function LayoutWrapper(props) {
  const { hash } = useLocation();
  useBrokenLinks().collectAnchor("ask");
  useBrokenLinks().collectAnchor("tag/Manifests");
  useBrokenLinks().collectAnchor("tag/PresentationRequests");
  useBrokenLinks().collectAnchor("tag/Presentations/paths/~1v1~1presentations~1definitions/put");
  useBrokenLinks().collectAnchor("tag/Credentials/paths/~1v1~1credentials/put");
  useBrokenLinks().collectAnchor("offering-object");

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
        <ChatSearch />
        <MDXContent>
          <LanguageProvider>
            <LanguageOptionsProvider>
              <Layout {...props}>{props.children}</Layout>
            </LanguageOptionsProvider>
          </LanguageProvider>
        </MDXContent>
        <NewsletterSubscription />
      </GlitchWrapper>
    </SSRProvider>
  );
}
