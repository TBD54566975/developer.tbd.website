import React, { useState } from 'react';
import DidCreate from '../components/DidCreate';
import GetBearerDid from '../components/GetBearerDid';
import CreateVc from '../components/CreateVc';
import SignVc from '../components/SignVc';
import WriteVc from '../components/WriteVc';
import ReadSignedVc from '../components/ReadSignedVc';
import ParseSignedVc from '../components/ParseSignedVc';

const Home = () => {
  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);
  const [record, setRecord] = useState(null);
  const [vc, setVc] = useState(null);
  const [bearerDid, setBearerDid] = useState(null);
  const [signedVc, setSignedVc] = useState(null);
  const [readSignedVc, setReadSignedVc] = useState(null);

  return (
    <main>
      <h1>Web5</h1>
      <DidCreate setWeb5={setWeb5} setMyDid={setMyDid} />
      <GetBearerDid web5={web5} myDid={myDid} setBearerDid={setBearerDid} />
      <CreateVc web5={web5} aliceDid={myDid} bearerDid={bearerDid} setVc={setVc} />
      <SignVc vc={vc} bearerDid={bearerDid} setSignedVc={setSignedVc} />
      <WriteVc web5={web5} signedVc={signedVc} setRecord={setRecord} />
      <ReadSignedVc record={record} setReadSignedVc={setReadSignedVc} />
      <ParseSignedVc readSignedVc={readSignedVc} />
    </main>
  );
};

export default Home;
