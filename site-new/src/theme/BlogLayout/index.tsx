import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import BlogSidebar from "@theme/BlogSidebar";

import type { Props } from "@theme/BlogLayout";
import { useBlogContext } from "../BlogListContext/BlogListContext";
import Background from "@site/src/components/Background";
import Checkbox from "@site/src/components/Checkbox/Checkbox";
import Heading from "@theme/Heading";

const CheckboxLabel = ({ label }: { label: string }) => {
  return (
    <div className="relative ml-twist-core-spacing-7 flex gap-twist-core-spacing-2 text-lg leading-[25.2px] text-black">
      <span className="sidebar opacity-50">#</span>
      <span className="sidebar">{label}</span>
    </div>
  );
};

const SectionHeader = ({
  length,
  onClear,
  label,
}: {
  length: number;
  onClear: () => void;
  label: string;
}) => (
  <div className="mx-[35px] mb-twist-core-spacing-7 flex items-center border-0 border-b-[0.5px] border-solid pb-twist-core-spacing-5 text-black">
    <div className="flex items-center">
      <span className="eyebrow mt-1 pt-[4px]">{label}</span>
      {length > 0 && (
        <>
          <span className="eyebrow ml-twist-core-spacing-5 mr-twist-core-spacing-4 grid min-w-[18px] place-items-center bg-black pt-[6px] text-tbd-yellow">
            {length}
          </span>
          <button
            className="eyebrow unset cursor-pointer border border-solid px-[6px] pt-[6px]"
            onClick={onClear}
          >
            Clear
          </button>
        </>
      )}
    </div>
  </div>
);

export default function BlogLayout(props: Props): JSX.Element {
  const { sidebar, toc, children, ...layoutProps } = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;

  const blogContext = useBlogContext();

  // TODO: Implement filters

  return (
    <Layout {...layoutProps}>
      <div className="margin-vert--lg container">
        <div className="row">
          <BlogSidebar sidebar={sidebar} />
          <main
            className={clsx("col", {
              "col--7": hasSidebar,
              // "col--9 col--offset-1": !hasSidebar && !blogContext,
              "col--12": !hasSidebar && !blogContext,
              "col--9": !hasSidebar && blogContext,
            })}
          >
            {children}
          </main>
          {toc && !blogContext && <div className="col col--2">{toc}</div>}
          {blogContext && (
            <div className="col w-full">
              <div className="bg-tbd-yellow">
                <Background
                  bgColor="yellow"
                  className="bg-tbd-yellow-shade-1 px-[35px] py-twist-core-spacing-10"
                >
                  <Heading
                    as="h4"
                    className="mb-0 inline-block bg-tbd-yellow text-black"
                  >
                    Filter
                  </Heading>
                </Background>
                <div className="flex flex-col gap-twist-core-spacing-20 py-twist-core-spacing-12">
                  <section>
                    <SectionHeader
                      length={blogContext.selectedTags.length}
                      onClear={blogContext.clearSelectedTags}
                      label="Tags"
                    />
                    <div className="flex flex-col gap-twist-core-spacing-6 px-[35px]">
                      {blogContext.tags.map((tag) => {
                        let tagLabel: string;
                        if (typeof tag === "string") {
                          tagLabel = tag;
                        } else {
                          tagLabel = tag.label;
                        }
                        return (
                          <Checkbox
                            label={<CheckboxLabel label={tagLabel} />}
                            checked={blogContext.selectedTags.includes(
                              tagLabel,
                            )}
                            onCheckedChange={() => {
                              blogContext.toggleSelectedTags(tagLabel);
                            }}
                          />
                        );
                      })}
                    </div>
                  </section>
                  <section>
                    <SectionHeader
                      length={blogContext.selectedAuthorKeysOrNames.length}
                      onClear={blogContext.clearSelectedAuthorKeysOrNames}
                      label="Authors"
                    />
                    <div className="flex flex-col gap-twist-core-spacing-6 px-[35px]">
                      {blogContext.authors.map((author) => {
                        return (
                          <Checkbox
                            label={
                              <CheckboxLabel
                                label={author.name ?? author.key}
                              />
                            }
                            checked={
                              blogContext.selectedAuthorKeysOrNames.includes(
                                author.key,
                              ) ||
                              blogContext.selectedAuthorKeysOrNames.includes(
                                author.name,
                              )
                            }
                            onCheckedChange={() => {
                              blogContext.toggleSelectedAuthorKeysOrNames(
                                author.key ?? author.name,
                              );
                            }}
                          />
                        );
                      })}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
