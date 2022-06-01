import React from 'react';
import { Tooltip } from '../Tooltip';
import { useTooltipTrigger } from '@react-aria/tooltip';
import { useTooltipTriggerState } from '@react-stately/tooltip';

export default function TooltipWrapper(props) {
  let state = useTooltipTriggerState(props);
  let ref = React.useRef();

  let { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref);

  return (
    <span style={{ position: 'relative' }}>
      <span
        className="bg-accent-cyan text-primary-black"
        ref={ref}
        {...triggerProps}
      >
        {props.trigger}
      </span>
      {state.isOpen && (
        <Tooltip state={state} {...tooltipProps}>
          {props.children}
        </Tooltip>
      )}
    </span>
  );
}

//<TooltipWrapper trigger="extra">This is the tool tip content</TooltipWrapper>
