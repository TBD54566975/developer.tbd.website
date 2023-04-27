import React, { useEffect } from 'react';

import Web5QuickstartIntro from './_quickstart-01-intro.mdx';
import Web5QuickstartPrereqsAndInstallation from './_quickstart-02-prereqs-and-installation.mdx';
import Web5QuickstartCreateDid from './_quickstart-03-create-did.mdx';
import Web5QuickstartRegisterDid from './_quickstart-04-register-did.mdx';
import Web5QuickstartWriteDwn from './_quickstart-05-write-record.mdx';
import Web5QuickstartReadDwn from './_quickstart-06-read-record.mdx';
import Web5QuickstartUpdateDwn from './_quickstart-07-update-record.mdx';
import Web5QuickstartDeleteDwn from './_quickstart-08-delete-record.mdx';
import Web5QuickstartQueryDwn from './_quickstart-09-query-record.mdx';
import Web5QuickstartNextSteps from './_quickstart-10-next-steps.mdx';

import { Web5 } from '@tbd54566975/web5';

const web5 = new Web5();

let createRecordResult;

function parseDid() {
  try {
    return JSON.parse(didCreateOutputDetailsTextarea.value);
  } catch {
    return undefined;
  }
}

// function parseQuery() {
//   try {
//     return JSON.parse(dwnQueryOutputDetailsTextarea.value);
//   } catch {
//     return undefined;
//   }
// }

function update() {
  if (!parseDid()) {
    didRegisterInputButton.disabled = true;
    didRegisterOutput.innerHTML = '';
  }

  if (!didRegisterOutput.innerHTML) {
    dwnWriteInputFile.disabled = true;
    dwnWriteInputButton.disabled = true;
    dwnWriteInputProgress.style.visibility = 'hidden';
    dwnWriteOutputSummary.innerHTML = '...';
    dwnWriteOutputDetailsTextarea.value = '';

    // dwnQueryInputButton.disabled = true;
    // dwnQueryInputProgress.style.visibility = 'hidden';
    // dwnQueryOutputSummary.innerHTML = '...';
    // dwnQueryOutputDetailsTextarea.value = '';
  }

  if (dwnWriteOutputDetailsTextarea.value !== '') {
    dwnReadInputButton.disabled = false;
  }

  // if (!parseQuery()?.entries?.length) {
  //   dwnReadInputButton.disabled = true;
  //   dwnReadInputProgress.style.visibility = 'hidden';
  //   dwnReadOutput.innerHTML = '';

  //   dwnDeleteInputButton.disabled = true;
  //   dwnDeleteInputProgress.style.visibility = 'hidden';
  //   dwnDeleteOutputSummary.innerHTML = '...';
  //   dwnDeleteOutputDetailsTextarea.value = '';
  // }
}

async function didCreate() {
  let did = await web5.did.create('ion');
  return did;
}

async function didRegister(did) {
  await web5.did.manager.set(did.id, {
    connected: true,
    endpoint: 'app://dwn',
    keys: {
      ['#dwn']: {
        keyPair: did.keys.find((key) => key.id === 'dwn').keyPair,
      },
    },
  });
}

// async function dwnWritePNGRecord(did, data) {
//   let result = await web5.dwn.records.create(did.id, {
//     author: did.id,
//     data,
//     message: {
//       dataFormat: 'image/png',
//     },
//   });
//   createRecord = result;
//   return result;
// }

async function dwnWriteTextRecord(did, data) {
  createRecordResult = await web5.dwn.records.create(did.id, {
    author: did.id,
    data,
    message: {
      dataFormat: 'text/plain',
    },
  });
  return createRecordResult;
}

async function dwnUpdateTextRecord(data) {
  return await createRecordResult.record.update({ data });
}

// async function dwnQueryPNGRecords(did) {
//   let result = await web5.dwn.records.query(did.id, {
//     author: did.id,
//     message: {
//       filter: {
//         dataFormat: 'image/png',
//       },
//     },
//   });
//   return result;
// }

async function dwnReadDataFromRecordWithId() {
  // let result = await web5.dwn.records.read(did.id, {
  //   author: did.id,
  //   message: {
  //     recordId,
  //   },
  // });
  // return result;

  const { record } = createRecordResult;
  // const data = await record.read();
  console.log('record', record);
  return record.data.text;
}

async function dwnUpdateText() {
  // createRecord
  const { record } = createRecordResult;
  record.update({ data: 'This is an updated record' });
}

async function dwnDeleteRecordWithId() {
  // let result = await web5.dwn.records.delete(did.id, {
  //   author: did.id,
  //   message: {
  //     recordId,
  //   },
  // });

  const result = await createRecordResult.record.delete();
  return result;
}

let didCreateInputButton;
let didCreateOutputSummaryCode;
let didCreateOutputDetailsTextarea;

let didRegisterInputButton;
let didRegisterOutput;

let dwnWriteInputFile;
let dwnWriteInputButton;
let dwnWriteInputProgress;
let dwnWriteOutputSummary;
let dwnWriteOutputDetailsTextarea;

let dwnQueryInputButton;
let dwnQueryInputProgress;
let dwnQueryOutputSummary;
let dwnQueryOutputDetailsTextarea;

let dwnReadInputButton;
let dwnReadInputProgress;
let dwnReadOutput;

let dwnDeleteInputButton;
let dwnDeleteInputProgress;
let dwnDeleteOutputSummary;
let dwnDeleteOutputDetailsTextarea;

let dwnUpdateInputFile;
let dwnUpdateInputButton;
let dwnUpdateInputProgress;
let dwnUpdateOutput;

function Web5Quickstart() {
  useEffect(() => {
    // query selectors

    didCreateInputButton = document.querySelector('#did-create .input button');
    didCreateInputButton = document.querySelector('#did-create .input button');
    didCreateOutputSummaryCode = document.querySelector(
      '#did-create .output details summary code',
    );
    didCreateOutputDetailsTextarea = document.querySelector(
      '#did-create .output details textarea',
    );

    didRegisterInputButton = document.querySelector(
      '#did-register .input button',
    );
    didRegisterOutput = document.querySelector('#did-register .output');

    dwnWriteInputFile = document.querySelector(
      '#dwn-write .input input[type="text"]',
    );
    dwnWriteInputButton = document.querySelector('#dwn-write .input button');
    dwnWriteInputProgress = document.querySelector(
      '#dwn-write .input progress',
    );
    dwnWriteOutputSummary = document.querySelector(
      '#dwn-write .output details summary',
    );
    dwnWriteOutputDetailsTextarea = document.querySelector(
      '#dwn-write .output details textarea',
    );

    // dwnQueryInputButton = document.querySelector('#dwn-query .input button');
    // dwnQueryInputProgress = document.querySelector(
    //   '#dwn-query .input progress',
    // );
    // dwnQueryOutputSummary = document.querySelector(
    //   '#dwn-query .output details summary',
    // );
    // dwnQueryOutputDetailsTextarea = document.querySelector(
    //   '#dwn-query .output details textarea',
    // );

    dwnReadInputButton = document.querySelector('#dwn-read .input button');
    dwnReadInputProgress = document.querySelector('#dwn-read .input progress');
    dwnReadOutput = document.querySelector('#dwn-read .output');

    dwnUpdateInputFile = document.querySelector(
      '#dwn-update .input input[type="text"]',
    );
    dwnUpdateInputButton = document.querySelector('#dwn-update .input button');
    dwnUpdateInputProgress = document.querySelector(
      '#dwn-update .input progress',
    );
    dwnUpdateOutput = document.querySelector('#dwn-update .output');

    dwnDeleteInputButton = document.querySelector('#dwn-delete .input button');
    dwnDeleteInputProgress = document.querySelector(
      '#dwn-delete .input progress',
    );
    dwnDeleteOutputSummary = document.querySelector(
      '#dwn-delete .output details summary',
    );
    dwnDeleteOutputDetailsTextarea = document.querySelector(
      '#dwn-delete .output details textarea',
    );

    // event listeners

    didCreateInputButton.addEventListener('click', async () => {
      let did = await didCreate();
      console.log(did);

      didCreateOutputSummaryCode.innerHTML = did.internalId;
      didCreateOutputDetailsTextarea.value = JSON.stringify(did, null, 2);

      didRegisterInputButton.disabled = false;
      console.log(didCreateInputButton);
      didRegisterOutput.innerHTML = '';
      update();
    });

    didCreateOutputDetailsTextarea.addEventListener('input', () => {
      didCreateOutputSummaryCode.innerHTML = parseDid()?.internalId ?? '...';

      didRegisterInputButton.disabled = false;
      didRegisterOutput.innerHTML = '';
      update();
    });

    didRegisterInputButton.addEventListener('click', async () => {
      didRegisterInputButton.disabled = true;

      let did = parseDid();
      await didRegister(did);

      didRegisterOutput.innerHTML = '&#x2714; DID stored!';

      dwnWriteInputFile.disabled = false;
      // dwnQueryInputButton.disabled = false;
      update();
    });

    dwnWriteInputFile.addEventListener('input', () => {
      dwnWriteInputButton.disabled = false;
      dwnWriteOutputSummary.innerHTML = '...';
      dwnWriteOutputDetailsTextarea.value = '';
      update();
    });

    dwnWriteInputButton.addEventListener('click', async () => {
      dwnWriteInputButton.disabled = true;
      dwnWriteInputProgress.style.visibility = 'visible';

      dwnWriteOutputSummary.innerHTML = '...';

      let did = parseDid();
      // for (let file of dwnWriteInputFile.files) {
      //   let buffer = await file.arrayBuffer();
      //   let data = new Uint8Array(buffer);
      //   // let result = await dwnWritePNGRecord(did, data);

      //   dwnWriteOutputDetailsTextarea.value +=
      //     JSON.stringify(result, null, 2) + '\n';
      // }

      let data = dwnWriteInputFile.value;

      let result = await dwnWriteTextRecord(did, data);

      dwnWriteOutputDetailsTextarea.value +=
        JSON.stringify(result, null, 2) + '\n';

      dwnWriteOutputDetailsTextarea.scrollTop =
        dwnWriteOutputDetailsTextarea.scrollHeight;

      dwnWriteOutputSummary.innerHTML = '&#x2714; Written to DWN!';

      dwnWriteInputButton.disabled = false;
      dwnWriteInputProgress.style.visibility = 'hidden';
      // dwnQueryInputButton.disabled = false;
      update();
    });

    // dwnQueryInputButton.addEventListener('click', async () => {
    //   dwnQueryInputButton.disabled = true;
    //   dwnQueryInputProgress.style.visibility = 'visible';

    //   dwnQueryOutputSummary.innerHTML = '...';
    //   dwnQueryOutputDetailsTextarea.value = '';

    //   let did = parseDid();
    //   // let result = await dwnQueryPNGRecords(did);
    //   let result = await dwnUpdateText();

    //   dwnQueryOutputSummary.innerHTML = `&#x2714; Placeholder`;
    //   dwnQueryOutputDetailsTextarea.value = JSON.stringify(
    //     result,
    //     (key, value) => (key !== 'encodedData' ? value : undefined),
    //     2,
    //   );

    //   dwnQueryInputButton.disabled = false;
    //   dwnQueryInputProgress.style.visibility = 'hidden';
    //   dwnReadInputButton.disabled = false;
    //   dwnDeleteInputButton.disabled = false;
    //   update();
    // });

    dwnReadInputButton.addEventListener('click', async () => {
      dwnReadInputButton.disabled = true;
      dwnReadInputProgress.style.visibility = 'visible';

      dwnReadOutput.innerHTML = '';

      let did = parseDid();
      // let query = parseQuery();
      // const { record } = createRecordResult;

      // for (let { recordId } of query.entries) {
      let result = await createRecordResult.record.data.text();
      //   let dataStream = await result.record.data.stream();
      //   let dataBytes = await web5.dwn.sdk.DataStream.toBytes(dataStream);

      //   let img = dwnReadOutput.appendChild(document.createElement('img'));
      //   img.src = URL.createObjectURL(new Blob([dataBytes]));
      // }

      dwnReadOutput.innerHTML = `Your read result: ${result}`;

      dwnUpdateInputFile.disabled = false;
      dwnUpdateInputButton.disabled = false;
      dwnReadInputProgress.style.visibility = 'hidden';
      update();
    });

    dwnUpdateInputFile.addEventListener('input', () => {
      dwnUpdateInputButton.disabled = false;
      update();
    });

    dwnUpdateInputButton.addEventListener('click', async () => {
      dwnUpdateInputButton.disabled = true;
      dwnUpdateInputProgress.style.visibility = 'visible';

      let data = dwnUpdateInputFile.value;

      const textResult = await createRecordResult.record.data.text();

      dwnUpdateOutput.innerHTML = `Your update result: ${textResult}`;

      dwnDeleteInputButton.disabled = false;
      dwnUpdateInputProgress.style.visibility = 'hidden';
      update();
    });

    dwnDeleteInputButton.addEventListener('click', async () => {
      dwnDeleteInputButton.disabled = true;
      dwnDeleteInputProgress.style.visibility = 'visible';

      dwnDeleteOutputSummary.innerHTML = '...';

      let did = parseDid();
      // let query = parseQuery();
      // for (let { recordId } of query.entries) {
      //   let result = await dwnDeleteRecordWithId(did, recordId);
      // dwnDeleteOutputDetailsTextarea.value +=
      //   JSON.stringify(result, null, 2) + '\n';
      // }

      let result = await dwnDeleteRecordWithId();

      dwnDeleteOutputDetailsTextarea.value +=
        JSON.stringify(result, null, 2) + '\n';

      dwnDeleteOutputDetailsTextarea.scrollTop =
        dwnDeleteOutputDetailsTextarea.scrollHeight;

      dwnDeleteOutputSummary.innerHTML = `&#x2714; Record deleted!`;

      dwnReadInputButton.disabled = true;
      dwnDeleteInputProgress.style.visibility = 'hidden';
      update();
    });
  }, []);
  return (
    <div>
      <Web5QuickstartIntro />

      <Web5QuickstartPrereqsAndInstallation />

      <Web5QuickstartCreateDid />

      <section id="did-create">
        <div className="input">
          <button>Run!</button>
        </div>
        <div className="output">
          <details>
            <summary>
              <code>...</code>
            </summary>
            <textarea></textarea>
          </details>
        </div>
      </section>

      <Web5QuickstartRegisterDid />
      <section id="did-register">
        <div className="input">
          <button disabled>Run!</button>
        </div>
        <div className="output"></div>
      </section>

      <Web5QuickstartWriteDwn />

      <section id="dwn-write">
        <div className="input">
          <input placeholder="Write text in me!" type="text" disabled />
          <button disabled>Run!</button>
          <progress></progress>
        </div>
        <div className="output">
          <details>
            <summary>...</summary>
            <textarea readOnly></textarea>
          </details>
        </div>
      </section>

      <Web5QuickstartReadDwn />
      <section id="dwn-read">
        <div className="input">
          <button disabled>Run!</button>
          <progress></progress>
        </div>
        <div className="output"></div>
      </section>

      <Web5QuickstartUpdateDwn />
      <section id="dwn-update">
        <div className="input">
          <input placeholder="Update me!" type="text" disabled />
          <button disabled>Run!</button>
          <progress></progress>
        </div>
        <div className="output"></div>
      </section>

      <Web5QuickstartDeleteDwn />

      {/* <Web5QuickstartQueryDwn />
      <section id="dwn-query">
        <div className="input">
          <button disabled>Run!</button>
          <progress></progress>
        </div>
        <div className="output">
          <details>
            <summary>...</summary>
            <textarea readOnly></textarea>
          </details>
        </div>
      </section> */}

      <section id="dwn-delete">
        <div className="input">
          <button disabled>Run!</button>
          <progress></progress>
        </div>
        <div className="output">
          <details>
            <summary>...</summary>
            <textarea readOnly></textarea>
          </details>
        </div>
      </section>
      <Web5QuickstartNextSteps />
    </div>
  );
}

export default Web5Quickstart;
