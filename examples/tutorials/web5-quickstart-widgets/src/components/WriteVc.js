import React, { useState } from 'react';
import { writeVc } from '../utils';

const WriteVc = ({ web5, signedVc, setRecord }) => {
    const [localRecord, setLocalRecord] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        setLoading(true);
        const result = await writeVc(web5, signedVc);
        setLocalRecord(result);
        setRecord(result);
        setLoading(false);
    };

    return (
        <section id="write-vc-to-dwn">
            <h1>Write Verifiable Credential to DWN</h1>
            <div className="input">
                <pre><code>
                    {`const { record } = await web5.dwn.records.create({
  data: signedVc,
  message: {
    schema: 'Web5QuickstartCompletionCredential',
    dataFormat: 'application/vc+jwt',
  }
});`}
                </code></pre>
                <button onClick={handleRun} disabled={!web5 || !signedVc}>Run!</button>
                {loading && <progress />}
            </div>
            <div className="output">
                <details>
                    <summary><code>{localRecord ? "&#x2714; Written!" : "..."}</code></summary>
                    <textarea value={localRecord ? JSON.stringify(localRecord, null, 2) : ""} readOnly />
                </details>
            </div>
        </section>
    );
};

export default WriteVc;
