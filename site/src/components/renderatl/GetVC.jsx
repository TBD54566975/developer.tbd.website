import React, { Suspense, useEffect, useState } from 'react';
import { useHistory } from '@docusaurus/router';
const RenderVcCard = React.lazy(() => import('./RenderVcCard'));



// Static data moved outside the component
const people = [
    { name: 'Angie Jones', urlParam: 'angie' },
    { name: 'Rizel Scarlet', urlParam: 'rizel' },
    { name: 'Ebony Louis', urlParam: 'ebony' },
    { name: 'Tania Chakraborty', urlParam: 'tania' },
    { name: 'Adewale Abati', urlParam: 'ace' },
    { name: 'Kia Richards', urlParam: 'kia' },
];

const GetVC = () => {
    const [person, setPerson] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const metParam = params.get('met');

        if (metParam) {
            const matchedPerson = people.find(p => p.urlParam === metParam);
            if (matchedPerson) {
                setPerson(matchedPerson);
            } else {
                console.error('No matching person found for the given URL parameter.');
                history.push('/renderatl-scavengerhunt');
            }
        } else {
            console.error('No URL parameter provided.');
            history.push('/renderatl-scavengerhunt');
        }
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {person ? (
              <>
                <h3>You just met {person.name}! 🎉🎉</h3>
                <h4>Issuing Verifiable Credential as proof...</h4>
                <RenderVcCard met={person.urlParam} />
              </>
            ) : (
                <p>Loading...</p>
            )}
        </Suspense>
    );
};

export default GetVC;
