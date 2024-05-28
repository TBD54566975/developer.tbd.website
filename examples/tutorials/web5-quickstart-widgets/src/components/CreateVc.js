import React, { useState, useEffect } from 'react';
import { createVc } from '../utils';

const CreateVc = ({ web5, aliceDid, bearerDid, setVc }) => {
    const [vc, setVC] = useState('');
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');

    const handleRun = async () => {
        setLoading(true);
        const user = username || '@alicesmith123';
        const vcResult = await createVc(web5, aliceDid, user);
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
                    {`const vc = await VerifiableCredential.create({
  type: 'Web5QuickstartCompletionCredential',
  issuer: aliceDid,
  subject: aliceDid,
  expirationDate: '2026-09-30T12:34:56Z',
  data: {
    username: username,
    completionDate: '2024-05-22',
    expertiseLevel: 'Beginner'
  }
});`}
                </code></pre>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleRun} disabled={!web5 || !aliceDid || !bearerDid}>Run!</button>
                {loading && <progress />}
            </div>
            <div className="output">
                <details>
                    <summary><code>{vc ? "&#x2714; Created!" : "..."}</code></summary>
                    <textarea value={vc ? vc : ""} readOnly />
                </details>
            </div>
        </section>
    );
};

export default CreateVc;
