import React from "react";
import Provider from "@theme-original/Layout/Provider";
import type ProviderType from "@theme/Layout/Provider";
import type { WrapperProps } from "@docusaurus/types";
import { LanguageProvider } from "@site/src/context/LanguageSwitcher";

type Props = WrapperProps<typeof ProviderType>;

export default function ProviderWrapper(props: Props): JSX.Element {
  return (
    <>
      <LanguageProvider>
        <Provider {...props} />
      </LanguageProvider>
    </>
  );
}
