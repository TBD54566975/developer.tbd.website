import React, { Suspense } from 'react';
const RenderScavengerHunt = React.lazy(() => import('./RenderScavengerHunt'));

// Static data moved outside the component
const people = [
    { name: 'Angie Jones', urlParam: 'angie' },
    { name: 'Rizel Scarlet', urlParam: 'rizel' },
    { name: 'Ebony Louis', urlParam: 'ebony' },
    { name: 'Tania Chakraborty', urlParam: 'tania' },
    { name: 'Adewale Abati', urlParam: 'ace' },
    { name: 'Kia Richards', urlParam: 'kia' },
];

const ScavengerHunt = () => {
    return (
        <Suspense fallback={<div className="flex justify-center items-center mt-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
            <RenderScavengerHunt />
        </Suspense>
    );
};

export default ScavengerHunt;
