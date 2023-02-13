/* eslint-disable react/prop-types */
import React from 'react';
import TooltipWrapper from './TooltipWrapper';

const TextWithTooltip = ({ content }) => {
  return (
    <>
      {content.map((item, index) => {
        if (item.type === 'text') {
          return <span key={index}>{item.data}</span>;
        }
        if (item.type === 'tooltip') {
          return (
            <TooltipWrapper key={index} trigger={item.data.trigger}>
              {item.data.text}
            </TooltipWrapper>
          );
        }
      })}
    </>
  );
};

export default TextWithTooltip;
