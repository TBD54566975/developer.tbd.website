import React from 'react';
import PropTypes from 'prop-types';

const ApiDetails = ({ details }) => {
  return (
    <div className="grid grid-cols-1 desktop:grid-cols-3 gap-6">
      {details.map((detail) => (
           <> 
           <div>
                <code>{detail.data.field}</code>
                {detail.data.type ? (
                    <>
                    <br/>
                    <span className="small-label data-type">
                      {detail.data.type}
                    </span>
                    </>
                    ) : null
                }
                {detail.data.isOptional ? (
                    <>
                    <br/>
                    <span className="small-label optional-field">
                      optional
                    </span>
                    </>
                    ) : null
                }
            </div>
            <div className="col-span-2">
                {detail.data.isObject ? (
                    <>
                    <details>
                      <summary>Show parameters</summary>
                      <br/> <br/> <br/>
                      <div className="shift-object-left">
                        {detail.data.value}
                      </div>
                    </details>
                    </>) : (<>{detail.data.value}</>)
                }
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
