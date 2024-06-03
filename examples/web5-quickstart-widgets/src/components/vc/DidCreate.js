import React, { useState } from 'react';
import { executeDidCreate } from '../../../utils/executableCode';
import { didCreateSnippet } from '../../../utils/codeSnippets';

const DidCreate = ({ setWeb5, setMyDid }) => {
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        setLoading(true);
        try {
            const result = await executeDidCreate();
            setWeb5(result.web5);
            setMyDid(result.did);
            setOutput(JSON.stringify(result.did, null, 2));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="did-create">
            <h1>Create a Decentralized Identifier (DID)</h1>
            <div className="input">
                <pre><code>
                    {didCreateSnippet}
                </code></pre>
                <button onClick={handleRun}>Run!</button>
                {loading && <progress />}
            </div>
            <div className="output">
                <details>
                    <summary><code>Hit "Run" above to create DID</code></summary>
                    <textarea value={output} readOnly />
                </details>
            </div>
        </section>
    );
};

export default DidCreate;