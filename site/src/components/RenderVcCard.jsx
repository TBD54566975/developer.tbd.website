import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Web5 } from '@web5/api';
import { DidDht } from '@web5/dids';
import { VerifiableCredential } from '@web5/credentials';
import { useHistory } from '@docusaurus/router';


const people = [
    { name: 'Angie Jones', urlParam: 'angie' },
    { name: 'Rizel Scarlet', urlParam: 'rizel' },
    { name: 'Ebony Louis', urlParam: 'ebony' },
    { name: 'Tania Chakraborty', urlParam: 'tania' },
    { name: 'Adewale Abati', urlParam: 'ace' },
    { name: 'Frank Hinek', urlParam: 'frank' },
    { name: 'Kia Richards', urlParam: 'kia' },
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
                const person = people.find(p => p.urlParam === met);
                if (!person) {
                    throw new Error(`Person with urlParam ${met} not found`);
                }

                // create did & connect
                const { web5, did: userDid } = await Web5.connect();
                const issuerDid = await DidDht.create({ publish: true });
                const schema = `https://schema.org/renderAtlScavengerHunt`;

                // Fetch all renderAtlScavengerHunt VCs for the user
                const { records } = await web5.dwn.records.query({
                    from: userDid,
                    message: {
                        filter: {
                            schema: schema,
                            dataFormat: 'application/json',
                        }
                    }
                });

                console.log("vc response", records);

                let existingVc = null;

                if (records.length > 0) {
                  console.log("checking if vc already exists")
                  // check if VC already exists for the person found
                  for (let record of records) {
                        const data = await record.data.json();
                        if (data.personUrlParam === person.urlParam) {
                            existingVc = data;
                            break;
                        }
                    }
                    if (existingVc) {
                      console.log("already exist")
                      setVcData({
                          name: person.name,
                          vcJwt: existingVc.vcJwt,
                          vcJwtQrCode: existingVc.vcJwtQrCode,
                          image: `/img/${met}VcCard.png`,
                      });
                      return;
                    }

                }

                // create person VC if not already created
                if(!existingVc) {
                  const vc = await VerifiableCredential.create({
                      type: ['VerifiableCredential', 'NetworkingCredential'],
                      issuer: issuerDid.uri,
                      subject: userDid,
                      issuanceDate: new Date().toISOString(),
                      data: {
                          met: person.name,
                          event: 'RenderATL',
                      },
                  });

                  const vcJwt = await vc.sign({ did: issuerDid });

                  // Create QRCode for signed VC
                  const vcJwtQrCode = await QRCode.toDataURL(vcJwt, {
                      color: {
                          dark: '#ADD8E6',
                          light: '#0000',
                      },
                  });

                  // Save the QR code and personURL to dwn
                  await web5.dwn.records.create({
                      data: {
                          vcJwtQrCode,
                          personUrlParam: person.urlParam,
                      },
                      message: {
                          schema: schema,
                          dataFormat: 'application/json',
                      },
                  });

                  setVcData({
                      name: person.name,
                      vcJwtQrCode,
                      image: `/img/${met}VcCard.png`,
                  });
                }

               //history.push('/renderatl-scavengerhunt');
            } catch (err) {
                setError(err.message);
            }
        };

        if (met) {
            createDidAndIssueVc();
        }
    }, [met]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!vcData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="vc-card">
            <img src={vcData.vcJwtQrCode} alt={`QR Code for ${vcData.name}`} className="qr-code" />
        </div>
    );
};

export default RenderVcCard;
