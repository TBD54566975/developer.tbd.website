import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";

export default function HomeBreadcrumbItem(): JSX.Element {
  const homeHref = useBaseUrl("/");

  const handleBackClick = (event) => {
    event.preventDefault();
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = homeHref;
    }
  };

  return (
    <li className="breadcrumbs__item">
      <Link
        aria-label={translate({
          id: "theme.docs.breadcrumbs.home",
          message: "Home page",
          description: "The ARIA label for the home page in the breadcrumbs",
        })}
        className="breadcrumbs__link"
        href={homeHref}
        onClick={handleBackClick}
      >
        <img
          src={useBaseUrl("/img/arrow.svg")}
          alt="Home Icon"
          className="h-[20px] w-[20]px align-middle mr-2"
        />
      </Link>
    </li>
  );
}
