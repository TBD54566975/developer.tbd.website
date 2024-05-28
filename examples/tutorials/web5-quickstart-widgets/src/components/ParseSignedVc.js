import React, { useState } from 'react';
import { parseSignedVc } from '../utils';

const ParseSignedVc = ({ readSignedVc }) => {
    const [parsedVc, setParsedVc] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        setLoading(true);
        const result = await parseSignedVc(readSignedVc);
        setParsedVc(JSON.stringify(result, null, 2));
        setLoading(false);
    };

    return (
        <section id="parse-signed-vc">
            <h1>Parse Signed Verifiable Credential</h1>
            <div className="input">
                <pre><code>
                    const parsedVc = VerifiableCredential.parseJwt({'{'} vcJwt: readSignedVc {'}'});
                </code></pre>
                <button onClick={handleRun} disabled={!readSignedVc}>Run!</button>
                {loading && <progress />}
            </div>
            <div className="output">
                <details>
                    <summary><code>{parsedVc ? "&#x2714; Parsed!" : "..."}</code></summary>
                    <textarea value={parsedVc ? parsedVc : ""} readOnly />
                </details>
            </div>
        </section>
    );
};

export default ParseSignedVc;
