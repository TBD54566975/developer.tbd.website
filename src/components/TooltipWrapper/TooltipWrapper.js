import React from 'react';
import PropTypes from 'prop-types';
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

TooltipWrapper.propTypes = {
  /**
   * trigger: Test that onhover reveals the tooltip
   */
  trigger: PropTypes.string.isRequired,

  /**
   * children: Children populate the tooltip and are revealed onhover
   */
  children: PropTypes.any.isRequired,
};

/*
<TooltipWrapper trigger="extra">This is the tool tip content</TooltipWrapper>
*/
