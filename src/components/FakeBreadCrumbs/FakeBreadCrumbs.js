import React from 'react';
import Link from '@docusaurus/Link';

function FakeBreadCrumbs(crumbs) {
  return (
    <div className="flex">
      {crumbs.map((crumb) => {
        const { url, label } = crumb;
        return (
          <div key={label}>
            <Link href={url}>{label}</Link>
            <span className="mx-2">/</span>
          </div>
        );
      })}
    </div>
  );
}

export default FakeBreadCrumbs;
