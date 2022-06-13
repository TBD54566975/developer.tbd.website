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
    <span className="relative">
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
              <div className="-ml-3 pr-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 11H13V17H11V11Z" fill="black" />
                  <path d="M13 7H11V9H13V7Z" fill="black" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 3H7V5H5V7H3V17H5V19H7V21H17V19H19V17H21V7H19V5H17V3ZM17 5V7H19V17H17V19H7V17H5V7H7V5H17Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="font-bold text-lg flex-auto">{props.trigger}</div>
              <div className="-mr-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 5H7V7H5V5Z" fill="black" />
                  <path d="M9 9H7V7H9V9Z" fill="black" />
                  <path d="M11 11H9V9H11V11Z" fill="black" />
                  <path
                    d="M13 11H11V13H9V15H7V17H5V19H7V17H9V15H11V13H13V15H15V17H17V19H19V17H17V15H15V13H13V11Z"
                    fill="black"
                  />
                  <path d="M15 9V11H13V9H15Z" fill="black" />
                  <path d="M17 7V9H15V7H17Z" fill="black" />
                  <path d="M17 7V5H19V7H17Z" fill="black" />
                </svg>
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
