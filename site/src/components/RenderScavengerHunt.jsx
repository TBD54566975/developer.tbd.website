import React, { useEffect, useState } from 'react';
import { Web5 } from '@web5/api';
import Confetti from 'react-confetti';

const people = [
    { name: 'Angie Jones', urlParam: 'angie' },
    { name: 'Rizel Scarlet', urlParam: 'rizel' },
    { name: 'Ebony Louis', urlParam: 'ebony' },
    { name: 'Tania Chakraborty', urlParam: 'tania' },
    { name: 'Adewale Abati', urlParam: 'ace' },
    { name: 'Kia Richards', urlParam: 'kia' },
];

const RenderScavengerHunt = () => {
  const [foundPeople, setFoundPeople] = useState([]);
  const [hoveredPerson, setHoveredPerson] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [allFound, setAllFound] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
        return;
    }

    const fetchFoundVCs = async () => {
      const { web5, did: userDid } = await Web5.connect();
      console.log("userdid from renderScavenger", userDid);
      const schema = `https://schema.org/renderAtlScavengerHunt`;

      const response = await web5.dwn.records.query({
          from: userDid,
          message: {
              filter: {
                  schema: schema,
                  dataFormat: 'application/json',
              }
          }
      });

      console.log("vc response", response);
      const availableVCs = [];
      for (let record of response.records) {
          const data = await record.data.json();
          console.log("vc data", data);
          availableVCs.push(data);
      }

      console.log("available vcs", availableVCs);

      setFoundPeople(availableVCs);

      if (availableVCs.length >= people.length) {
        setShowConfetti(true);
        setAllFound(true);
      }
    }

    fetchFoundVCs();
  }, []);

  return (
    <div>
      {showConfetti && <Confetti />}
      <p>Find everyone to win!</p>
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop-lg:grid-cols-4 gap-4">
        {people.map((person) => {
          const found = foundPeople.find((vc) => vc.personUrlParam === person.urlParam);
          return (
            <a
              href='#'
              className={`explore-card no-underline w-70 h-56 border-[#282828] border-2 rounded-sm flex flex-col justify-end items-center transition-transform transform hover:-translate-y-1 relative`}
              style={{
                boxShadow: hoveredPerson === person.urlParam ? '0 4px 8px rgba(33, 241, 255, 0.7)' : 'none',
                backgroundImage: `url(/img/${person.urlParam}VcCard.png)`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
              onMouseEnter={() => setHoveredPerson(person.urlParam)}
              onMouseLeave={() => setHoveredPerson(null)}
              key={person.urlParam}
            >
              <div className="flex justify-between px-4 py-6 bg-[#282828] bg-opacity-70 w-full">
                <p className="text-white">{person.name} {found ? '✅' : '❌'}</p>
              </div>
            </a>
          );
        })}
      </div>
      {allFound && (
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold">Congratulations! 🎉</h2>
          <p className="text-lg">You have found everyone! Please meet us at the prize booth to redeem your prize.</p>
        </div>
      )}
    </div>
  );
};

export default RenderScavengerHunt;
