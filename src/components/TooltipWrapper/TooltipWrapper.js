import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '../Tooltip';
import { useTooltipTrigger } from '@react-aria/tooltip';
import { useTooltipTriggerState } from '@react-stately/tooltip';
import { Illustration } from '../Illustration';

export default function TooltipWrapper(props) {
  let state = useTooltipTriggerState(props);
  let ref = React.useRef();

  let { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref);

  return (
    <span className="relative not-prose">
      <span
        className="bg-accent-cyan text-primary-black"
        ref={ref}
        {...triggerProps}
      >
        {props.trigger}
      </span>
      {state.isOpen && (
        <Tooltip state={state} {...tooltipProps}>
          <div className="pr-5 pl-5 pb-5  tooltipBorder w-96">
            <div className="flex justify-items-center p-2">
              <div className="-ml-3 pr-4 p-0">
                <Illustration
                  img="/img/tooltip-info-icon.svg"
                  alt=""
                  imgStyle="mt-0 mb-0"
                />
              </div>
              <div className="font-bold text-lg flex-auto">{props.trigger}</div>
              <div className="-mr-3">
                <button ref={ref} {...triggerProps}>
                  <Illustration
                    img="/img/tooltip-x-icon.svg"
                    alt=""
                    imgStyle="mt-0 mb-0"
                  />
                </button>
              </div>
            </div>

            <div className="flex-grow border-t-2 border-black p-2"></div>
            {props.children}
          </div>
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
