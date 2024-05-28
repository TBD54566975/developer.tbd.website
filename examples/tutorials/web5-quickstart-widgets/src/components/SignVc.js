import React, { useState } from 'react';
import { signVc } from '../utils';

const SignVc = ({ vc, bearerDid, setSignedVc }) => {
    const [signedVc, setLocalSignedVc] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        setLoading(true);
        const signedVcResult = await signVc(vc, bearerDid);
        setLocalSignedVc(signedVcResult);
        setSignedVc(signedVcResult);
        setLoading(false);
    };

    return (
        <section id="sign-vc">
            <h1>Sign Verifiable Credential</h1>
            <div className="input">
                <pre><code>
                    const signedVc = await vc.sign({'{'} did: myBearerDid {'}'});
                </code></pre>
                <button onClick={handleRun} disabled={!vc || !bearerDid}>Run!</button>
                {loading && <progress />}
            </div>
            <div className="output">
                <details>
                    <summary><code>{signedVc ? "&#x2714; Signed!" : "..."}</code></summary>
                    <textarea value={signedVc ? JSON.stringify(signedVc, null, 2) : ""} readOnly />
                </details>
            </div>
        </section>
    );
};

export default SignVc;
