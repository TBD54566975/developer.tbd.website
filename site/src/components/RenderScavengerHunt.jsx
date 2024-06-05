import React, { useEffect, useState } from 'react';
import { Web5 } from '@web5/api';

const people = [
    { name: 'Angie Jones', urlParam: 'angie' },
    { name: 'Rizel Scarlet', urlParam: 'rizel' },
    { name: 'Ebony Louis', urlParam: 'ebony' },
    { name: 'Tania Chakraborty', urlParam: 'tania' },
    { name: 'Adewale Abati', urlParam: 'ace' },
    { name: 'Frank Hinek', urlParam: 'frank' },
    { name: 'Kia Richards', urlParam: 'kia' },
];

const RenderScavengerHunt = () => {
  const [foundPeople, setFoundPeople] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
        return;
    }

    const fetchFoundVCs = async () => {
      // create did & connect
      const { web5, did: userDid } = await Web5.connect();
      const schema = `https://schema.org/renderAtlScavengerHunt`;

      // Fetch all renderAtlScavengerHunt VCs for the user
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
    }

    fetchFoundVCs();
  }, []);

  return (
    <div>
      <p>Find everyone to win!</p>
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop-lg:grid-cols-4 gap-4">
        {people.map((person) => {
          const found = foundPeople.find((vc) => vc.personUrlParam === person.urlParam);
          return (
            <a
              href='#'
              className={`explore-card no-underline w-70 h-56 border-[#282828] border-2 rounded-sm flex flex-col justify-between items-center transition-transform transform ${isHovered ? 'hover:-translate-y-1' : ''}`}
              style={{ boxShadow: isHovered ? '0 4px 8px rgba(33, 241, 255, 0.7)' : 'none' }}
              onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on hover
              onMouseLeave={() => setIsHovered(false)} // Set isHovered to false on mouse leave
              key={person.urlParam}
            >
              <img className={`m-auto h-1/2 p-4 bounce`} alt={person.name} src={`/img/${person.urlParam}VcCard.png`} />
              <div className="flex justify-between px-4 py-6 bg-[#282828] w-full">
                <p>{person.name} {found ? '✅' : '❌'}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default RenderScavengerHunt;
