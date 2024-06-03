import React, { useState } from 'react';
import { executeSignVc } from '../../utils/executableCode';
import { signVcSnippet } from '../../utils/codeSnippets';

const SignVc = ({ vc, bearerDid, setSignedVc }) => {
    const [signedVc, setLocalSignedVc] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        setLoading(true);
        const signedVcResult = await executeSignVc(vc, bearerDid);
        setLocalSignedVc(signedVcResult);
        setSignedVc(signedVcResult);
        setLoading(false);
    };

    return (
        <section id="sign-vc">
            <h1>Sign Verifiable Credential</h1>
            <div className="input">
                <pre><code>
                    {signVcSnippet}
                </code></pre>
                <button onClick={handleRun} disabled={!vc || !bearerDid}>Run!</button>
                {loading && <progress />}
            </div>
            <div className="output">
                <details>
                    <summary><code>{signedVc ? "Toggle to see your JSON Web Token(JWT)" : "..."}</code></summary>
                    <textarea value={signedVc ? JSON.stringify(signedVc, null, 2) : ""} readOnly />
                </details>
            </div>
        </section>
    );
};

export default SignVc;