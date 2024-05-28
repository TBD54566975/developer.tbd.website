import React, { useState } from 'react';
import { getBearerDid } from '../utils';

const GetBearerDid = ({ web5, myDid, setBearerDid }) => {
    const [bearerDid, setLocalBearerDid] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        setLoading(true);
        const myBearerDid = await getBearerDid(web5, myDid);
        setLocalBearerDid(myBearerDid);
        setBearerDid(myBearerDid);
        setLoading(false);
    };

    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    };

    return (
        <section id="get-bearer-did">
            <h1>Get Bearer DID</h1>
            <div className="input">
                <pre><code>
                    const {'{ did: myBearerDid }'} = await web5.agent.identity.get({'{ didUri: myDid }'});
                </code></pre>
                <button onClick={handleRun} disabled={!web5 || !myDid}>Run!</button>
                {loading && <progress />}
            </div>
            <div className="output">
                <details>
                    <summary><code>{bearerDid ? "&#x2714; Retrieved!" : "..."}</code></summary>
                    <textarea value={bearerDid ? JSON.stringify(bearerDid, getCircularReplacer(), 2) : ""} readOnly />
                </details>
            </div>
        </section>
    );
};

export default GetBearerDid;
