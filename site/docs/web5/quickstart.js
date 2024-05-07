import React, { useEffect } from 'react';

import Web5QuickstartIntro from './_quickstart-01-intro.mdx';
import Web5QuickstartPrereqsAndInstallation from './_quickstart-02-prereqs-and-installation.mdx';
import Web5QuickstartCreateDid from './_quickstart-03-create-did.mdx';
import Web5QuickStartGetBearerIdentity from './_quickstart-04-get-bearer-id.mdx';
import Web5QuickstartCreateVc from './_quickstart-05-create-vc.mdx';
import Web5QuickstartSignVc from './_quickstart-06-sign-vc.mdx';
import Web5QuickStartWriteVcToDwn from './_quickstart-07-write-vc-to-dwn.mdx';
import Web5QuickstartReadVcFromDwn from './_quickstart-08-read-vc-from-dwn.mdx';
import Web5QuickstartParseVc from './_quickstart-09-parse-vc.mdx';

import Web5QuickstartNextSteps from './_quickstart-10-next-steps.mdx';
import { Web5 } from '@web5/api';

let web5;
let createRecordResult;

let didCreate;
let createTextRecord;

function parseDid() {
  try {
    return JSON.parse(didCreateOutputDetailsTextarea.value);
  } catch {
    return undefined;
  }
}

function update() {
  if (!didCreateOutputSummaryCode.innerHTML) {
    dwnWriteInputText.disabled = true;
    dwnWriteInputButton.disabled = true;
    dwnWriteInputProgress.style.visibility = 'hidden';
    dwnWriteOutputSummary.innerHTML = '...';
    dwnWriteOutputDetailsTextarea.value = '';
  }
}

async function dwnUpdateTextRecord(data) {
  return await createRecordResult.update({ data });
}

async function dwnReadDataFromRecordWithId() {
  const { record } = createRecordResult;

  const readResult = await record.data.text();
  return readResult;
}

async function dwnUpdateText() {
  const { record } = createRecordResult;
  record.update({ data: 'This is an updated record' });
}

async function dwnDeleteRecordWithId() {
  const result = await createRecordResult.record.delete();
  return result;
}

let didCreateInputButton;
let didCreateInputProgress;
let didCreateOutputSummaryCode;
let didCreateOutputDetailsTextarea;

let dwnWriteInputText;
let dwnWriteInputButton;
let dwnWriteInputProgress;
let dwnWriteOutputSummary;
let dwnWriteOutputDetailsTextarea;

function Web5Quickstart() {
  useEffect(() => {
    const loadWeb5 = async () => {
      const codeSnippetsUtils = await import('../../src/util/code-snippets');
      didCreate = codeSnippetsUtils.didCreate;
      createTextRecord = codeSnippetsUtils.createTextRecord;
    };
    loadWeb5();

    // query selectors

    didCreateInputButton = document.querySelector('#did-create .input button');
    didCreateInputProgress = document.querySelector(
      '#did-create .input progress',
    );
    didCreateOutputSummaryCode = document.querySelector(
      '#did-create .output details summary code',
    );
    didCreateOutputDetailsTextarea = document.querySelector(
      '#did-create .output details textarea',
    );

    // event listeners

    didCreateInputButton.addEventListener('click', async () => {
      didCreateInputButton.disabled = true;
      didCreateInputProgress.style.visibility = 'visible';
      let result = await didCreate();

      let did = result.did;

      web5 = result.web5;

      console.log(did);

      didCreateOutputSummaryCode.innerHTML = did;

      dwnWriteInputButton.disabled = false;
      dwnWriteInputText.disabled = false;
      console.log(didCreateInputButton);
      didCreateInputButton.disabled = false;
      didCreateInputProgress.style.visibility = 'hidden';
      update();
    });

    didCreateOutputDetailsTextarea.addEventListener('input', () => {
      didCreateOutputSummaryCode.innerHTML = parseDid()?.internalId ?? '...';

      //didRegisterInputButton.disabled = false;
      //didRegisterOutput.innerHTML = '';
      update();
    });
  }, []);

  return (
    <div>
      <Web5QuickstartIntro />

      <div className="w-full max-w-container">
        <hr className="bg-slash-dark border-none h-2" />
      </div>

      <Web5QuickstartPrereqsAndInstallation />

      <div className="w-full max-w-container">
        <hr className="bg-slash-dark border-none h-2" />
      </div>

      <Web5QuickstartCreateDid />

      <section id="did-create" className="sandbox-container">
        <div className="input">
          <button>Run ›</button>
          <label className="sr-only" htmlFor="did-create-progress">
            DID Creation Progress
          </label>
          <progress id="did-create-progress"></progress>
        </div>
        <div className="output">
          <details class="sandbox-details">
            <summary>
              <code>
                <span className="sandbox-placeholder">
                  Your DID will appear here
                </span>
              </code>
            </summary>
            <textarea spellCheck="false"></textarea>
          </details>
        </div>
      </section>

      <Web5QuickStartGetBearerIdentity />
      <Web5QuickstartCreateVc />
      <Web5QuickstartSignVc />
      <Web5QuickStartWriteVcToDwn />
      <Web5QuickstartReadVcFromDwn />
      <Web5QuickstartParseVc />
      <Web5QuickstartNextSteps />
    </div>
  );
}

export default Web5Quickstart;
