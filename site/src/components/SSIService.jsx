import React from 'react';

const SSIService = ({content, link, linkText}) => {
    return (
        <div>
            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            {/* <img src="site/static/img/heart.svg" alt="1" /> */}
                {/* <aside style={{ marginLeft: '10px' }}>Info</aside> */}
            {/* </div> */}
            {/* <p>Follow guide to <a href="/docs/ssi/run-ssi-service">Clone & Run SSI Service.</a> </p> */}
            <p>{content}
            {link && <a href={link}>{linkText || ''}</a>} </p>
        </div>
    );
};

export default SSIService;
