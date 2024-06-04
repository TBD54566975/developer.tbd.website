import React, { Suspense, useEffect, useState } from 'react';
const RenderVcCard = React.lazy(() => import('../components/RenderVcCard'));

const GetVC = () => {
    const [met, setMet] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const metParam = params.get('met');
            if (metParam) {
                setMet(metParam);
            }
        }
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {met ? <RenderVcCard met={met} /> : <div>Loading...</div>}
        </Suspense>
    );
};

export default GetVC;
