import React, { useState } from 'react';
import { executeParseSignedVc } from '../../../utils/executableCode';
import { parseSignedVcSnippet } from '../../../utils/codeSnippets';


const ParseSignedVc = ({ readSignedVc }) => {
    const [parsedVc, setParsedVc] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        setLoading(true);
        const result = await executeParseSignedVc(readSignedVc);
        setParsedVc(JSON.stringify(result, null, 2));
        setLoading(false);
    };

    return (
        <section id="parse-signed-vc">
            <h1>Parse Signed Verifiable Credential</h1>
            <div className="input">
                <pre><code>
                    {parseSignedVcSnippet}
                </code></pre>
                <button onClick={handleRun} disabled={!readSignedVc}>Run!</button>
                {loading && <progress />}
            </div>
            <div className="output">
                <details>
                    <summary><code>{parsedVc ? "Toggle to see your parsed VC" : "..."}</code></summary>
                    <textarea value={parsedVc ? parsedVc : ""} readOnly />
                </details>
            </div>
        </section>
    );
};

export default ParseSignedVc;