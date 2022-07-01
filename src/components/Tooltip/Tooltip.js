import React, { useRef, useEffect, useState } from 'react';
import { useTooltip } from '@react-aria/tooltip';
import { mergeProps } from '@react-aria/utils';

export default function Tooltip({ state, parentRef, ...props }) {
  let { tooltipProps } = useTooltip(props, state);
  let ref = useRef();
  const [leftShift, setLeftShift] = useState(0);
  useEffect(() => {
    if (state.isOpen) {
      console.log('window.innerWidth ', window.innerWidth);
      console.log('parentRef', parentRef.current.offsetLeft);
      const offsetParent = parentRef.current.offsetLeft;
      const windowWidth = window.innerWidth;
      console.log('ref', ref.current.offsetLeft);
      let leftShift = 0;
      console.log('offsetParent+ 383', offsetParent + 383);
      if (windowWidth < offsetParent + 400) {
        setLeftShift(windowWidth - (offsetParent + 400));
        console.log('leftShift', offsetParent + 400 - windowWidth);
      }
    }
  }, [state, parentRef, leftShift]);
  return (
    <span
      ref={ref}
      style={{
        position: 'absolute',
        left: leftShift + 'px',
        top: '100%',
        marginTop: '10px',
        backgroundColor: 'var(--color-blue)',
        color: 'black',
        padding: '5px',
        zIndex: '100',
      }}
      {...mergeProps(props, tooltipProps)}
    >
      {props.children}
    </span>
  );
}
