import React, { useState } from 'react';
import { didCreate } from '../utils';

const DidCreate = ({ setWeb5, setMyDid }) => {
    const [output, setOutput] = useState('');

    const handleRun = async () => {
        const result = await didCreate();
        setWeb5(result.web5);
        setMyDid(result.did);
        setOutput(JSON.stringify(result.did, null, 2));
    };

    return (
        <section id="did-create">
            <h1>Create a Decentralized Identifier (DID)</h1>
            <div className="input">
                <pre><code>
                    {`const { web5, did: myDid } = await Web5.connect();`}
                </code></pre>
                <button onClick={handleRun}>Run!</button>
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
