import React, { useEffect, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import { createAndIssueVC } from '../../vcUtils'; 

const people = [
    { name: 'Adewale Abati', urlParam: 'ace' },
    { name: 'Angie Jones', urlParam: 'angie' },
    { name: 'Daniel Buchner', urlParam: 'daniel' },
    { name: 'Ebony Louis', urlParam: 'ebony' },
    { name: 'Kirah Sapong', urlParam: 'kirah' },
    { name: 'Tania Chakraborty', urlParam: 'tania' }, 
];

const RenderVcCard = ({ met }) => {
  const [vcData, setVcData] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const createDidAndIssueVc = async () => {
      try {
        const vcData = await createAndIssueVC(met);
        if (vcData) {
          setVcData({
            name: people.find(p => p.urlParam === met).name,
            vcJwt: vcData.vcJwt,
            image: `/img/${met}VcCard.png`,
          });
          history.push('/wad-scavengerhunt');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (met) {
      createDidAndIssueVc();
    }
  }, [met, history]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!vcData) {
    return <div className="flex justify-center items-center mt-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>;
  }

  return (
    <div className="vc-card">
    </div>
  );
};

export default RenderVcCard;
