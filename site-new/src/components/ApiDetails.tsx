import React from "react";

interface Detail {
  data: {
    field: string;
    type?: string;
    isOptional?: boolean;
    isObject?: boolean;
    value: React.ReactNode;
  };
}

interface ApiDetailsProps {
  details: Detail[];
}

const ApiDetails: React.FC<ApiDetailsProps> = ({ details }) => {
  return (
    <div className="desktop:grid-cols-3 grid grid-cols-1 gap-6">
      {details.map((detail, index) => (
        <React.Fragment key={index}>
          <div>
            <code>{detail.data.field}</code>
            {detail.data.type && (
              <>
                <br />
                <span className="small-label data-type">
                  {detail.data.type}
                </span>
              </>
            )}
            {detail.data.isOptional && (
              <>
                <br />
                <span className="small-label optional-field">optional</span>
              </>
            )}
          </div>
          <div className="col-span-2">
            {detail.data.isObject ? (
              <>
                <details>
                  <summary className="cursor-pointer">Show parameters</summary>
                  <br /> <br /> <br />
                  <div className="shift-object-left">{detail.data.value}</div>
                </details>
              </>
            ) : (
              <>{detail.data.value}</>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ApiDetails;
