import React from 'react';
import PropTypes from 'prop-types';

const ApiDetails = ({ details }) => {
  return (
    <div className="grid grid-cols-1 desktop:grid-cols-3 gap-6">
      {details.map((detail) => (
           <> 
           <div>
                <code>{detail.data.field}</code>
                {detail.data.isOptional ? (
                    <>
                    <br/>
                    <small style={{color:'#24f2ff', fontStyle:'italic'}}>Optional</small>
                    </>
                    ) : null
                }
            </div>
            <div className="col-span-2">
                {detail.data.isObject ? (
                    <>
                    Object containing:
                    <br/><br/>
                    </>) : null
                }
                {detail.data.value}
            </div>
            </>
      ))}
    </div>
  );
};


ApiDetails.propTypes = {
  details: PropTypes.array.isRequired,
};

export default ApiDetails;
