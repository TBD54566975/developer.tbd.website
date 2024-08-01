import React, { useEffect, useState, useRef } from 'react';
import Confetti from 'react-confetti';
import ProgressBar from './ProgressBar';
import { QrReader } from 'react-qr-reader';
import Button from '../Button';
import { createAndIssueVC } from '../../vcUtils';

const people = [
  { name: 'Adewale Abati', urlParam: 'ace' },
  { name: 'Angie Jones', urlParam: 'angie' },
  { name: 'Daniel Buchner', urlParam: 'daniel' },
  { name: 'Ebony Louis', urlParam: 'ebony' },
  { name: 'Kirah Sapong', urlParam: 'kirah' },
  { name: 'Tania Chakraborty', urlParam: 'tania' },
];

const RenderScavengerHunt = () => {
  const [foundPeople, setFoundPeople] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [processing, setProcessing] = useState(false);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchFoundVCs = async () => {
      const { Web5 } = await import('@web5/api');
      const { web5, did: userDid } = await Web5.connect();
      const schema = `https://schema.org/wadScavengerHunt`;

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
    };

    fetchFoundVCs();
  }, []);

  const handleScan = async (result) => {
    if (result && !processing) {
      setProcessing(true);
      const url = new URL(result);
      const params = url.searchParams;
      const metParam = params.get('met');

      if (metParam) {
        try {
          const personAlreadyFound = foundPeople.some(person => person.personUrlParam === metParam);

          if (!personAlreadyFound) {
            const vcData = await createAndIssueVC(metParam);
            const updatedFoundPeople = [...foundPeople, { personUrlParam: metParam }];
            setFoundPeople(updatedFoundPeople);

            if (updatedFoundPeople.length >= people.length) {
              setShowConfetti(true);
            }
          } else {
            console.log('Person already found:', metParam);
          }
        } catch (err) {
          console.error('Error issuing VC:', err);
        } finally {
          setScanning(false);
          setProcessing(false);
        }
      } else {
        console.error('metParam not found in QR code');
        setScanning(false);
        setProcessing(false);
      }
    }
  };

  const handleError = (err) => {
    console.error('QR Reader Error:', err);
    setScanning(false);
    setProcessing(false);
  };

  const handleScanDebounced = (result) => {
    clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      handleScan(result);
    }, 500);
  };

  return (
    <div>
      {showConfetti && <Confetti />}
      <div className="text-center pb-4">
        {showConfetti ? (
          <div className="mt-4 mb-4">
            <h2 className="text-2xl font-bold">Congratulations! 🎉</h2>
            <p className="text-lg">You have found everyone! Collect your SWAG!! 🥳</p>
          </div>
        ) : (
          <>
            <h1 className="pt-4">Come Find Us</h1>
            <p>Find all 6 members of the TBD team at WeAreDevelopers World Congress! Scan their QR codes to collect all Verifiable Credentials and win a prize! 🎁</p>
            <br />
            <p>Learn more about the magic of <a href="/docs/web5/verifiable-credentials/what-are-vcs" style={{ color: 'cyan', textDecoration: 'underline' }}>Verifiable Credentials</a>. ✨</p>
            <div className="mt-4 mb-4">
              <div className="flex justify-center mb-8">
                <Button
                  label={scanning ? 'Stop Scanning' : 'Start Scanning'}
                  url="#"
                  className="mb-4"
                  onClick={() => {
                    setScanning(!scanning);
                    setProcessing(false);
                  }}
                />
              </div>
              {scanning && (
                <QrReader
                  delay={300}
                  style={{ width: '100%' }}
                  onError={handleError}
                  onResult={handleScanDebounced}
                  constraints={{ facingMode: 'environment' }}
                />
              )}
              <ProgressBar value={foundPeople.length} max={people.length} />
            </div>
          </>
        )}
      </div>
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop-lg:grid-cols-3 gap-4">
        {people.map((person) => {
          const found = foundPeople.find((vc) => vc.personUrlParam === person.urlParam);
          return (
            <a href='#' className={`explore-card no-underline w-70 h-56 border-[#282828] border-2 rounded-sm flex flex-col justify-end items-center transition-transform transform hover:-translate-y-1 relative`}
              style={{
                boxShadow: found ? '0 4px 8px rgba(33, 241, 255, 0.7)' : 'none',
                backgroundImage: `url(/img/${person.urlParam}VcCard.png)`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
              key={person.urlParam}
            >
              {!found && <div className="absolute inset-0 bg-black bg-opacity-50"></div>}
              <div className="flex justify-between px-4 py-4 bg-[#282828] bg-opacity-70 w-full z-10 relative">
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
