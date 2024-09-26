import React, { useMemo, useState } from "react";
import { BlogContextProvider } from "./BlogListContext";
import type { Props } from "@theme/BlogListPage";

export type BlogItems = Props["items"];
type FrontMatter = BlogItems[0]["content"]["frontMatter"];
export type Tags = NonNullable<FrontMatter["tags"]>;
export type Authors = NonNullable<
  BlogItems[0]["content"]["metadata"]["authors"]
>;

type BlogListProviderProps = {
  children: (_obj: { filteredBlogItems: BlogItems }) => React.ReactNode;
  blogItems: BlogItems;
};

const BlogListProvider = ({
  children,
  blogItems: originalBlogItems,
}: BlogListProviderProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthorKeysOrNames, setSelectedAuthorKeysOrNames] = useState<
    string[]
  >([]);

  const toggleArrayItem =
    (setState: React.Dispatch<React.SetStateAction<string[]>>) =>
    (str: string) => {
      setState((prev) =>
        prev.includes(str)
          ? prev.filter((item) => item !== str)
          : [...prev, str],
      );
    };

  const toggleSelectedTags = toggleArrayItem(setSelectedTags);
  const toggleSelectedAuthorKeysOrNames = toggleArrayItem(
    setSelectedAuthorKeysOrNames,
  );

  const filteredBlogItems = useMemo(() => {
    let blogItems = [...originalBlogItems];

    if (selectedTags.length > 0) {
      blogItems = blogItems.filter((item) => {
        const tags = item.content.frontMatter.tags;
        if (tags) {
          return tags.some((tag) => {
            if (typeof tag === "string") return selectedTags.includes(tag);
            return selectedTags.includes(tag.label);
          });
        }
        return false;
      });
    }

    if (selectedAuthorKeysOrNames.length > 0) {
      blogItems = blogItems.filter((item) => {
        const authors = item.content.metadata.authors;
        if (authors) {
          return authors.some((author) => {
            if (author.key) {
              return selectedAuthorKeysOrNames.includes(author.key);
            } else {
              return selectedAuthorKeysOrNames.includes(author.name);
            }
          });
        }
        return false;
      });
    }

    return blogItems;
  }, [selectedTags, selectedAuthorKeysOrNames]);

  const allTags = Array.from(
    new Set(
      originalBlogItems.reduce<Tags>((acc, item) => {
        if (item.content.frontMatter.tags) {
          item.content.frontMatter.tags.forEach((tag) => {
            acc.push(tag);
          });
        }
        return acc;
      }, []),
    ),
  );

  const allAuthors = originalBlogItems
    .map((item) => {
      return item.content.metadata.authors;
    })
    .reduce<Authors>((acc, authors) => {
      if (authors) {
        authors.forEach((author) => {
          acc.push(author);
        });
      }
      return acc;
    }, []);

  const allUniqueAuthors = Array.from(
    new Map(allAuthors.map((author) => [author.key, author])).values(),
  );

  return (
    <BlogContextProvider
      value={{
        tags: allTags,
        authors: allUniqueAuthors,
        originalBlogItems,
        selectedAuthorKeysOrNames,
        selectedTags,
        toggleSelectedTags,
        toggleSelectedAuthorKeysOrNames,
        clearSelectedTags: () => setSelectedTags([]),
        clearSelectedAuthorKeysOrNames: () => setSelectedAuthorKeysOrNames([]),
      }}
    >
      {children({ filteredBlogItems })}
    </BlogContextProvider>
  );
};

export default BlogListProvider;
