import React, { useEffect, useState } from 'react';
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

                const { web5, did: userDid } = await Web5.connect();
                const issuerDid = await DidDht.create({ publish: true });
                const schema = `https://schema.org/renderAtlScavengerHunt`;

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
                    for (let record of records) {
                        const data = await record.data.json();
                        if (data.personUrlParam === person.urlParam) {
                            existingVc = data;
                            break;
                        }
                    }
                    if (existingVc) {
                        console.log("already exists")
                        setVcData({
                            name: person.name,
                            vcJwt: existingVc.vcJwt,
                            image: `/img/${met}VcCard.png`,
                        });
                        history.push('/renderatl-scavengerhunt');
                        return;
                    }
                }

                if (!existingVc) {
                    console.log("creating vc for", person.urlParam)
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

                    console.log(vc)

                    const vcJwt = await vc.sign({ did: issuerDid });

                    const { record } = await web5.dwn.records.create({
                        data: {
                            personUrlParam: person.urlParam,
                        },
                        message: {
                            schema: schema,
                            dataFormat: 'application/json',
                        },
                    });
                    const {status} = await record.send(userDid);

                    setVcData({
                        name: person.name,
                        vcJwt: vcJwt,
                        image: `/img/${met}VcCard.png`,
                    });

                    history.push('/renderatl-scavengerhunt');
                    console.log("VC created and state updated")
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
        return <div>Loading...</div>;
    }

    return (
        <div className="vc-card">
            {/* <img src={vcData.vcJwtQrCode} alt={`QR Code for ${vcData.name}`} className="qr-code" /> */}
        </div>
    );
};

export default RenderVcCard;
