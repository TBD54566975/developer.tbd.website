import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Web5 } from '@web5/api';
import { DidDht } from '@web5/dids';
import { VerifiableCredential } from '@web5/credentials';

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
                const schema = `https://schema.org/renderAtl${met}`;

                // Check if a VC already exists for this person
                const response = await web5.dwn.records.query({
                    from: userDid,
                    message: {
                        filter: {
                            schema: schema,
                            dataFormat: 'application/json',
                        }
                    }
                });

                if (response.records.length > 0) {
                    console.log("already exist")
                    const existingVc = response.records[0].data;
                    setVcData({
                        name: person.name,
                        vcJwt: existingVc.vcJwt,
                        vcJwtQrCode: existingVc.vcJwtQrCode,
                        image: `/img/${met}VcCard.png`,
                    });
                    return;
                }

                // create met VC
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
            <h3>VC for {vcData.name}</h3>
            <img src={`/img/${met}VcCard.png`} alt="VC image without QR code" className="vc-image" />
            <img src={vcData.vcJwtQrCode} alt={`QR Code for ${vcData.name}`} className="qr-code" />
        </div>
    );
};

export default RenderVcCard;
