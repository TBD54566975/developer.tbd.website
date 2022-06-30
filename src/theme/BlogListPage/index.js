/* eslint-disable react/prop-types */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogListPaginator from '@theme/BlogListPaginator';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import SearchMetadata from '@theme/SearchMetadata';
import clsx from 'clsx';
import { Divider, TextLink } from '@site/src/components';

function BlogListPageMetadata(props) {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props) {
  const { metadata, items, sidebar } = props;
  return (
    <BlogLayout sidebar={sidebar}>
      <div className="space-y-8">
        <h1 className="h1">Follow the Latest</h1>
        <p className="copy">
          {
            'Find the latest news and insights from the TBD community, and visit us on '
          }
          <TextLink
            href="https://github.com/TBD54566975"
            text="github"
            isExternalLink={true}
          />
          {' to become a contributor.'}
        </p>
        <div className="py-8">
          <Divider />
        </div>
      </div>

      {items.map(({ content: BlogPostContent }) => (
        <BlogPostItem
          key={BlogPostContent.metadata.permalink}
          frontMatter={BlogPostContent.frontMatter}
          assets={BlogPostContent.assets}
          metadata={BlogPostContent.metadata}
          truncated={BlogPostContent.metadata.truncated}
        >
          <BlogPostContent />
        </BlogPostItem>
      ))}
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
