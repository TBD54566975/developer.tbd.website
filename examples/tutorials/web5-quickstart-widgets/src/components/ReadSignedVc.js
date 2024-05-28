import React, { useState } from 'react';
import { readSignedVc } from '../utils';

const ReadSignedVc = ({ record, setReadSignedVc }) => {
    const [signedVc, setSignedVc] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        setLoading(true);
        const result = await readSignedVc(record);
        setSignedVc(result);
        setReadSignedVc(result);
        setLoading(false);
    };

    return (
        <section id="read-signed-vc">
            <h1>Read Signed Verifiable Credential</h1>
            <div className="input">
                <pre><code>
                    const readSignedVc = await record.data.text();
                </code></pre>
                <button onClick={handleRun} disabled={!record}>Run!</button>
                {loading && <progress />}
            </div>
            <div className="output">
                <details>
                    <summary><code>{signedVc ? "&#x2714; Read!" : "..."}</code></summary>
                    <textarea value={signedVc ? signedVc : ""} readOnly />
                </details>
            </div>
        </section>
    );
};

export default ReadSignedVc;
