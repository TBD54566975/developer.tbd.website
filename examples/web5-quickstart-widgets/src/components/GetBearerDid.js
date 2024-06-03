import React, { useState } from 'react';
import { executeGetBearerDid } from '../../utils/executableCode';
import { getBearerDidSnippet } from '../../utils/codeSnippets';
const GetBearerDid = ({ web5, myDid, setBearerDid }) => {
    const [bearerDid, setLocalBearerDid] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        setLoading(true);
        const myBearerDid = await executeGetBearerDid(web5, myDid);
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
                    {getBearerDidSnippet}
                </code></pre>
                <button onClick={handleRun} disabled={!web5 || !myDid}>Run!</button>
                {loading && <progress />}
            </div>
            <div className="output">
                <details>
                    <summary><code>{bearerDid ? "Toggle to see your Bearer DID" : "..."}</code></summary>
                    <textarea value={bearerDid ? JSON.stringify(bearerDid, getCircularReplacer(), 2) : ""} readOnly />
                </details>
            </div>
        </section>
    );
};

export default GetBearerDid;