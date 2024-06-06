import React, { Suspense, useEffect, useState } from 'react';
import { useHistory } from '@docusaurus/router';
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
    const [person, setPerson] = useState(null);
    const history = useHistory();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RenderScavengerHunt />
        </Suspense>
    );
};

export default ScavengerHunt;
