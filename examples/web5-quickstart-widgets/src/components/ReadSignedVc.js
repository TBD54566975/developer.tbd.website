import React, { useState } from 'react';
import { executeReadSignedVc } from '../../utils/executableCode';
import { readSignedVcSnippet } from '../../utils/codeSnippets';

const ReadSignedVc = ({ record, setReadSignedVc }) => {
    const [signedVc, setSignedVc] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        setLoading(true);
        const result = await executeReadSignedVc(record);
        setSignedVc(result);
        setReadSignedVc(result);
        setLoading(false);
    };

    return (
        <section id="read-signed-vc">
            <h1>Read Signed Verifiable Credential</h1>
            <div className="input">
                <pre><code>
                    {readSignedVcSnippet}
                </code></pre>
                <button onClick={handleRun} disabled={!record}>Run!</button>
                {loading && <progress />}
            </div>
            <div className="output">
                <details>
                    <summary><code>{signedVc ? "Toggle to see the read result" : "..."}</code></summary>
                    <textarea value={signedVc ? signedVc : ""} readOnly />
                </details>
            </div>
        </section>
    );
};

export default ReadSignedVc;