/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import { ThemeClassNames } from '@docusaurus/theme-common';
import styles from './styles.module.css';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLocation } from '@docusaurus/router';
import routes from './BreadCrumbsRoutes.json';
import Illustration from '@site/src/components/Illustration';

// TODO move to design system folder
function BreadcrumbsItemLink({ children, href }) {
  const className = 'breadcrumbs__link breadcrumbs-text';
  return href ? (
    <Link className={className} to={href} itemProp="item">
      <span itemProp="name" className="breadcrumbs-text">
        {children}
      </span>
    </Link>
  ) : (
    <span className={className} itemProp="item name">
      {children}
    </span>
  );
}

// TODO move to design system folder
function BreadcrumbsItem({ children, active, index }) {
  return (
    <li
      itemScope
      itemProp="itemListElement"
      itemType="https://schema.org/ListItem"
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active,
      })}
    >
      {children}
      <meta itemProp="position" content={String(index + 1)} />
    </li>
  );
}

function HomeBreadcrumbItem() {
  const homeHref = useBaseUrl('/');
  return (
    <li className="breadcrumbs__item">
      <Link
        className={clsx('breadcrumbs__link', styles.breadcrumbsItemLink)}
        href={homeHref}
      >
        <div>
          <div className="flex gap-2">
            <Illustration
              img="/img/Home-breadcrumbs-icon.svg"
              className="not-prose max-h-[17px] min-h-[17px]"
            ></Illustration>
            <div className="breadcrumbs-text">Home</div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default function TBDBreadcrumbs() {
  let location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    let { state } = location;
    let from = false;

    if (state && state.from) {
      from = state.from;
    }

    if (!from) {
      return null;
    }

    let { projectroutes } = routes;
    let lastRoute = projectroutes.filter((ele) => {
      return ele.href.includes(from);
    });

    let currentRoute = projectroutes.filter((ele) => {
      return ele.href.includes(location.pathname);
    });

    if (lastRoute.length > 0) {
      let tempbreadcrumbs = [
        {
          href: '/projects',
          label: 'Projects',
        },
        {
          href: lastRoute[0].href,
          label: lastRoute[0].label,
        },
      ];

      if (currentRoute.length > 0) {
        tempbreadcrumbs.push({
          href: currentRoute[0].href,
          label: currentRoute[0].label,
        });
      } else {
        let label = window?.document?.title ?? '';
        label = label.replace(' | TBD', '').replace('TBD', '---');
        tempbreadcrumbs.push({
          href: location.pathname,
          label: label ?? '---',
        });
      }
      if (
        breadcrumbs.length === tempbreadcrumbs.length &&
        breadcrumbs[breadcrumbs.length - 1].href ===
          tempbreadcrumbs[tempbreadcrumbs.length - 1].href
      ) {
        return;
      }
      setBreadcrumbs(tempbreadcrumbs);
    }
  }, [breadcrumbs]);

  /* return (
     <div>
       {from ? from : 'from not defined'}{' '}
       {lastRoute.length > 0 ? lastRoute[0].label : 'no last route found'}
     </div>
   ); */

  /*
   if (!breadcrumbs) {
     return null;
   }
 */
  return (
    <nav
      className={clsx(
        ThemeClassNames.docs.docBreadcrumbs,
        styles.breadcrumbsContainer,
      )}
      aria-label="breadcrumbs"
    >
      <ul
        className="breadcrumbs"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {/* { <HomeBreadcrumbItem />} */}
        {breadcrumbs.map((item, idx) => (
          <BreadcrumbsItem
            key={idx}
            active={idx === breadcrumbs.length - 1}
            index={idx}
          >
            <BreadcrumbsItemLink
              href={idx < breadcrumbs.length - 1 ? item.href : undefined}
            >
              {item.label}
            </BreadcrumbsItemLink>
          </BreadcrumbsItem>
        ))}
      </ul>
    </nav>
  );
}
