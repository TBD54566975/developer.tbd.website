import React from 'react';
import { useTooltip } from '@react-aria/tooltip';
import { mergeProps } from '@react-aria/utils';

export default function Tooltip({ state, ...props }) {
  let { tooltipProps } = useTooltip(props, state);

  return (
    <span
      style={{
        position: 'absolute',
        left: '5px',
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
