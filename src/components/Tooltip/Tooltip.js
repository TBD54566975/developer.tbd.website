/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import { useTooltip } from '@react-aria/tooltip';
import { mergeProps } from '@react-aria/utils';

export default function Tooltip({ state, parentRef, ...props }) {
  let { tooltipProps } = useTooltip(props, state);
  let ref = useRef();
  const [leftShift, setLeftShift] = useState(0);
  useEffect(() => {
    if (state.isOpen) {
      const offsetParent = parentRef.current.offsetLeft;
      const windowWidth = window.innerWidth;
      let sizeTooltip = 430;
      if (windowWidth < 768) {
        sizeTooltip = 405;
      }
      if (windowWidth < offsetParent + sizeTooltip) {
        setLeftShift(windowWidth - (offsetParent + sizeTooltip));
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
        zIndex: '100',
      }}
      {...mergeProps(props, tooltipProps)}
    >
      {props.children}
    </span>
  );
}
