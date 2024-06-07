import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const people = [
    { name: 'Angie Jones', urlParam: 'angie' },
    { name: 'Rizel Scarlett', urlParam: 'rizel' },
    { name: 'Ebony Louis', urlParam: 'ebony' },
    { name: 'Tania Chakraborty', urlParam: 'tania' },
    { name: 'Adewale Abati', urlParam: 'ace' },
    { name: 'Kia Richards', urlParam: 'kia' },
];

const RenderScavengerHunt = () => {
  const [foundPeople, setFoundPeople] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const fetchFoundVCs = async () => {
      const { Web5 } = await import('@web5/api');
      const { web5, did: userDid } = await Web5.connect();
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

      const availableVCs = [];
      for (let record of response.records) {
          const data = await record.data.json();
          availableVCs.push(data);
      }

      setFoundPeople(availableVCs);

      if (availableVCs.length >= people.length) {
        setShowConfetti(true);
      }
    }

    fetchFoundVCs();
  }, []);

  return (
    <div>
      {showConfetti && <Confetti />}
      {showConfetti ? (
        <div className="mt-4 mb-4 pb-4 text-center">
          <h2 className="text-2xl font-bold">Congratulations! 🎉</h2>
          <p className="text-lg">You have found everyone! Please meet us at x to redeem your prize.</p>
        </div>
      ) : (
        <p className="pb-4">Can you find all members of the TBD team at RenderATL 2024? Find them all and win a prize! 🎁</p>
      )}
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop-lg:grid-cols-4 gap-4">
        {people.map((person) => {
          const found = foundPeople.find((vc) => vc.personUrlParam === person.urlParam);
          return (
            <a href='#' className={`explore-card no-underline w-70 h-56 border-[#282828] border-2 rounded-sm flex flex-col justify-end items-center transition-transform transform hover:-translate-y-1 relative`}
            style={{
              boxShadow: found ? '0 4px 8px rgba(33, 241, 255, 0.7)' : 'none',
              backgroundImage: `url(/img/${person.urlParam}VcCard.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
            key={person.urlParam}
            >
              {!found && <div className="absolute inset-0 bg-black bg-opacity-50"></div>}
              <div className="flex justify-between px-4 py-6 bg-[#282828] bg-opacity-70 w-full z-10 relative">
                <p className="text-white z-20 relative">{person.name} {found ? '✅' : '❌'}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default RenderScavengerHunt;
