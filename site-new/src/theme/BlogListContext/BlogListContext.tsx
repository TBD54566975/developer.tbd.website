import { createOptionalContext } from "@site/src/utils/helpers";
import { Authors, BlogItems, Tags } from "./BlogListProvider";

const [useBlogContext, BlogContextProvider] = createOptionalContext<{
  tags: Tags;
  authors: Authors;
  originalBlogItems: BlogItems;
  selectedTags: string[];
  toggleSelectedTags: (str: string) => void;
  selectedAuthorKeysOrNames: string[];
  toggleSelectedAuthorKeysOrNames: (str: string) => void;
  clearSelectedTags: () => void;
  clearSelectedAuthorKeysOrNames: () => void;
} | null>();

export { useBlogContext, BlogContextProvider };
