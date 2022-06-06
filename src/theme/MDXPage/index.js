/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import TOC from '@theme/TOC';
import TOCCollapsible from '@theme/TOCCollapsible';

import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import styles from './styles.module.css';
export default function MDXPage(props) {
  const { content: MDXPageContent } = props;
  const {
    metadata: { title, description, frontMatter },
  } = MDXPageContent;
  const { wrapperClassName, hide_table_of_contents: hideTableOfContents } =
    frontMatter;
  return (
    <HtmlClassNameProvider
      className={clsx(
        wrapperClassName ?? ThemeClassNames.wrapper.mdxPages,
        ThemeClassNames.page.mdxPage,
      )}
    >
      <PageMetadata title={title} description={description} />
      <Layout>
        <main className="container--fluid margin-vert--lg">
          {!hideTableOfContents && MDXPageContent.toc && (
            <div className="docusaurus-desktop:hidden">
              <TOCCollapsible
                toc={MDXPageContent.toc}
                minHeadingLevel={frontMatter.toc_min_heading_level}
                maxHeadingLevel={frontMatter.toc_max_heading_level}
              />
            </div>
          )}
          <div className={clsx('row', styles.mdxPageWrapper)}>
            <div
              className={clsx(
                'col',
                !hideTableOfContents &&
                  'docusaurus-desktop:max-w-[75%] docusaurus-desktop:flex-[0_0_75%] desktop:max-w-[80%] desktop:flex-[0_0_80%]',
              )}
            >
              <MDXContent>
                <MDXPageContent />
              </MDXContent>
            </div>
            {!hideTableOfContents && MDXPageContent.toc && (
              <div className="col docusaurus-desktop:max-w-[25%] docusaurus-desktop:flex-[0_0_25%] desktop:max-w-[20%] desktop:flex-[0_0_20%] pr-0">
                <TOC
                  toc={MDXPageContent.toc}
                  minHeadingLevel={frontMatter.toc_min_heading_level}
                  maxHeadingLevel={frontMatter.toc_max_heading_level}
                />
              </div>
            )}
          </div>
        </main>
      </Layout>
    </HtmlClassNameProvider>
  );
}
