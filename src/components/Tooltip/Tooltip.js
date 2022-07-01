import React, { useRef, useEffect } from 'react';
import { useTooltip } from '@react-aria/tooltip';
import { mergeProps } from '@react-aria/utils';

export default function Tooltip({ state, parentRef, ...props }) {
  let { tooltipProps } = useTooltip(props, state);
  let ref = useRef();
  useEffect(() => {
    if (state.isOpen) {
      console.log('window.innerWidth ', window.innerWidth);
      console.log('parentRef', parentRef.current.offsetLeft);
      console.log('ref', ref.current.offsetLeft);
    }
  }, [state, parentRef]);
  return (
    <span
      ref={ref}
      style={{
        position: 'absolute',
        left: '5px',
        top: '100%',
        marginTop: '10px',
        backgroundColor: 'var(--color-blue)',
        color: 'black',
        padding: '5px',
        maxWidth: '375px',
        zIndex: '100',
      }}
      {...mergeProps(props, tooltipProps)}
    >
      {props.children}
    </span>
  );
}
