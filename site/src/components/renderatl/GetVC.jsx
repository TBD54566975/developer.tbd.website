import React, { Suspense, useEffect, useState } from 'react';
import { useHistory } from '@docusaurus/router';
const RenderVcCard = React.lazy(() => import('./RenderVcCard'));


const people = [
    { name: 'Adewale Abati', urlParam: 'ace' },
    { name: 'Angie Jones', urlParam: 'angie' },
    { name: 'Daniel Buchner', urlParam: 'daniel' },
    { name: 'Ebony Louis', urlParam: 'ebony' },
    { name: 'Kirah Sapong', urlParam: 'kirah' },
    { name: 'Tania Chakraborty', urlParam: 'tania' }, 
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
                history.push('/wad-scavengerhunt');
            }
        } else {
            console.error('No URL parameter provided.');
            history.push('/wad-scavengerhunt');
        }
    }, []);

    return (
        <Suspense fallback={<div className="flex justify-center items-center mt-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
            {person ? (
              <>
                <h2>You just met {person.name}! 🎉🎉</h2>
                <h4 className="text-cyan-300">Issuing Verifiable Credential as proof...</h4>
                <RenderVcCard met={person.urlParam} />
              </>
            ) : (
                <div className="flex justify-center items-center mt-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
            )}
        </Suspense>

    );
};

export default GetVC;