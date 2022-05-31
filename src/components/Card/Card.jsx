import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button';
import { Illustration } from '../Illustration';


export const Card = ({ icon, content, link }) => {
    return (
        <div className="w-12/12 flex mb-5 justify-between flex-col h-80 p-3.5 border-yellow">
          <Illustration
            img={icon}
            className={'w-6 p-3 aspect-square relative text-primary-black tbd-social-icon'}
            imgStyle={'tbd-social-icon'}
          />
          <h3 className='h3'>WEBX</h3>
           <div className="w-10/12 ">
              {content} 
           </div>
           <div className="bottom-0 mb-0">
              <Button label={'View Project'} url={link} /> 
            </div>
            <Illustration
              img={'/img/project-divider.svg'}
              className={'w-12/12 project-divider mt-5 relative'}
            />
        </div>
    )
}

Card.propTypes = {
    icon: PropTypes.string,
    content: PropTypes.string.required,
    link: PropTypes.string.required
};

export default Card;
  