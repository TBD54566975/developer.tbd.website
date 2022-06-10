import React from 'react';
import { ButtonGroup } from '../ButtonGroup';
const IconTextButton = ({ data }) => {
  return (
    <div className="max-w-[235px]">
      <img src={data.data.src} alt="" className="h-6 w-6" />
      <div className="mt-1 mb-6">
        <h2 className="h2  w-[116px] uppercase text-accent-cyan">
          {data.data.text}
        </h2>
      </div>
      <div>
        <ButtonGroup buttons={data.data.buttons} />
      </div>
    </div>
  );
};

export default IconTextButton;
