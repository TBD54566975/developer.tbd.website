import React, { Suspense } from 'react';
const RenderScavengerHunt = React.lazy(() => import('./RenderScavengerHunt'));

const ScavengerHunt = () => {
    return (
        <Suspense fallback={<div className="flex justify-center items-center mt-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
            <RenderScavengerHunt />
        </Suspense>
    );
};

export default ScavengerHunt;
