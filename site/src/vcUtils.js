const people = [
    { name: 'Adewale Abati', urlParam: 'ace' },
    { name: 'Angie Jones', urlParam: 'angie' },
    { name: 'Daniel Buchner', urlParam: 'daniel' },
    { name: 'Ebony Louis', urlParam: 'ebony' },
    { name: 'Kirah Sapong', urlParam: 'kirah' },
    { name: 'Tania Chakraborty', urlParam: 'tania' },  
  ];
  
  export const createAndIssueVC = async (metParam) => {
    if (typeof window === 'undefined') {
      throw new Error('Web5 operations can only be performed in a browser environment');
    }
  
    const { Web5 } = await import('@web5/api');
    const { DidDht } = await import('@web5/dids');
    const { VerifiableCredential } = await import('@web5/credentials');
  
    const person = people.find(p => p.urlParam === metParam);
    if (!person) {
      throw new Error(`Person with urlParam ${metParam} not found`);
    }
  
    const { web5, did: userDid } = await Web5.connect();
    const issuerDid = await DidDht.create({ publish: true });
    const schema = `https://schema.org/wadScavengerHunt`;
  
    const { records } = await web5.dwn.records.query({
      from: userDid,
      message: {
        filter: {
          schema: schema,
          dataFormat: 'application/json',
        }
      }
    });
  
    let existingVc = null;
  
    if (records.length > 0) {
      for (let record of records) {
        const data = await record.data.json();
        if (data.personUrlParam === person.urlParam) {
          existingVc = data;
          break;
        }
      }
      if (existingVc) {
        return existingVc;
      }
    }
  
    if (!existingVc) {
      const vc = await VerifiableCredential.create({
        type: ['VerifiableCredential', 'NetworkingCredential'],
        issuer: issuerDid.uri,
        subject: userDid,
        issuanceDate: new Date().toISOString(),
        data: {
          met: person.name,
          event: 'WAD',
        },
      });
  
      const vcJwt = await vc.sign({ did: issuerDid });
  
      const { record } = await web5.dwn.records.create({
        data: {
          personUrlParam: person.urlParam,
          vcJwt: vcJwt,
        },
        message: {
          schema: schema,
          dataFormat: 'application/json',
        },
      });
  
      await record.send(userDid);
  
      return {
        personUrlParam: person.urlParam,
        vcJwt: vcJwt,
      };
    }
  };
  