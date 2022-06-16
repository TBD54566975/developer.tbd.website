/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { useWindowSize } from '@docusaurus/theme-common';
import DocSidebarDesktop from '@theme/DocSidebar/Desktop';
import DocSidebarMobile from '@theme/DocSidebar/Mobile';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { useEffect, useState } from 'react';

export default function DocSidebar(props) {
  const windowSize = useWindowSize(); // Desktop sidebar visible on hydration: need SSR rendering
  const [noRender, setNoRender] = useState(true);
  let shouldRenderSidebarDesktop =
    windowSize === 'desktop' || windowSize === 'ssr'; // Mobile sidebar not visible on hydration: can avoid SSR rendering

  let shouldRenderSidebarMobile = windowSize === 'mobile';

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      const splitPathname = window.location.pathname.split('/');
      if (splitPathname.length > 1 && splitPathname[1] === 'events') {
        setNoRender(true);
      } else {
        setNoRender(false);
      }
    }
  }, [ExecutionEnvironment.canUseDOM]);

  return (
    <>
      {!noRender && shouldRenderSidebarDesktop && (
        <DocSidebarDesktop {...props} />
      )}
      {!noRender && shouldRenderSidebarMobile && (
        <DocSidebarMobile {...props} />
      )}
    </>
  );
}
