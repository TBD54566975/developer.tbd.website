import React, { useState, useEffect } from 'react';
import { executeCreateVc } from '../../utils/executableCode';
import { createVcSnippet } from '../../utils/codeSnippets';

const CreateVc = ({ web5, aliceDid, bearerDid, setVc }) => {
    const [vc, setVC] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    const handleRun = async () => {
        setLoading(true);
        const user = name || '@alicesmith123';
        const vcResult = await executeCreateVc(aliceDid, user);
        setVc(vcResult);
        setVC(JSON.stringify(vcResult, null, 2));
        setLoading(false);
    };

    useEffect(() => {
        setVC('');
    }, [aliceDid, bearerDid]);

    return (
        <section id="create-vc">
            <h1>Create Verifiable Credential</h1>
            <div className="input">
                <pre><code>
                    {createVcSnippet}
                </code></pre>
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleRun} disabled={!web5 || !aliceDid || !bearerDid}>Run!</button>
                {loading && <progress />}
            </div>
            <div className="output">
                <details>
                    <summary><code>{vc ? "Toggle to see your VC" : "..."}</code></summary>
                    <textarea value={vc ? vc : ""} readOnly />
                </details>
            </div>
        </section>
    );
};

export default CreateVc;