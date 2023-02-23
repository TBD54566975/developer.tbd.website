import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import { useTooltipTrigger } from '@react-aria/tooltip';
import { useTooltipTriggerState } from '@react-stately/tooltip';
import Illustration from './Illustration';

export default function TooltipWrapper(props) {
  let state = useTooltipTriggerState(props);
  let ref = React.useRef();
  let parentRef = React.useRef();
  let { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref);
  return (
    <span className="relative not-prose" ref={parentRef}>
      <button
        className="bg-accent-cyan text-primary-black"
        ref={ref}
        {...triggerProps}
        onClick={() => {
          state.open(true);
        }}
      >
        {props.trigger}
      </button>
      {state.isOpen && (
        <Tooltip state={state} parentRef={parentRef} {...tooltipProps}>
          <div className="tooltipBorder w-96 pr-5 pt-[1.375rem] pl-5 pb-9 tablet:pb-5 text-lg">
            <div className="flex px-2 pb-4">
              <div className="-ml-3 pr-4 p-0 h-fit">
                <Illustration
                  img="/img/tooltip-info-icon.svg"
                  alt=""
                  imgStyle="mt-0 mb-0"
                />
              </div>
              <div className="h4 flex-auto h-fit">{props.trigger}</div>
              <div className="-mr-3 flex items-start">
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
            <p className="copy">{props.children}</p>
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
