import React, { useEffect } from 'react';

import Web5QuickstartIntro from './_quickstart-01-intro.mdx';
import Web5QuickstartPrereqsAndInstallation from './_quickstart-02-prereqs-and-installation.mdx';
import Web5QuickstartCreateDid from './_quickstart-03-create-did.mdx';
import Web5QuickstartWriteDwn from './_quickstart-05-write-record.mdx';
import Web5QuickstartReadDwn from './_quickstart-06-read-record.mdx';
import Web5QuickstartUpdateDwn from './_quickstart-07-update-record.mdx';
import Web5QuickstartDeleteDwn from './_quickstart-08-delete-record.mdx';
import Web5QuickstartNextSteps from './_quickstart-10-next-steps.mdx';

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

    dwnWriteInputText = document.querySelector('#dwn-write .input input');
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

    dwnQueryInputButton = document.querySelector('#dwn-query .input button');
    dwnQueryInputProgress = document.querySelector(
      '#dwn-query .input progress',
    );
    dwnQueryOutputSummary = document.querySelector(
      '#dwn-query .output details summary',
    );
    dwnQueryOutputDetailsTextarea = document.querySelector(
      '#dwn-query .output details textarea',
    );

    dwnReadInputButton = document.querySelector('#dwn-read .input button');
    dwnReadInputProgress = document.querySelector('#dwn-read .input progress');
    dwnReadOutput = document.querySelector('#dwn-read .output');

    dwnUpdateInputFile = document.querySelector('#dwn-update .input input');
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

    dwnWriteInputText.addEventListener('input', () => {
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

      let data = dwnWriteInputText.value;

      let result = await createTextRecord(web5, data);

      createRecordResult = result.record;

      dwnWriteOutputDetailsTextarea.value +=
        JSON.stringify(result, null, 2) + '\n';

      dwnWriteOutputDetailsTextarea.scrollTop =
        dwnWriteOutputDetailsTextarea.scrollHeight;

      dwnWriteOutputSummary.innerHTML = '&#x2714; Written to DWN!';

      dwnWriteInputButton.disabled = false;
      dwnWriteInputProgress.style.visibility = 'hidden';
      // dwnQueryInputButton.disabled = false;
      if (dwnWriteOutputDetailsTextarea.value !== '') {
        dwnReadInputButton.disabled = false;
      }
      update();
    });

    dwnReadInputButton.addEventListener('click', async () => {
      dwnReadInputButton.disabled = true;
      dwnReadInputProgress.style.visibility = 'visible';

      dwnReadOutput.innerHTML = '';

      console.log('createRecordResult', createRecordResult);

      const result = await createRecordResult.data.text();

      dwnReadOutput.innerHTML = `${result}`;

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
      await createRecordResult.update({ data });
      const textResult = await createRecordResult.data.text();

      dwnUpdateOutput.innerHTML = `${textResult}`;

      dwnDeleteInputButton.disabled = false;
      dwnUpdateInputProgress.style.visibility = 'hidden';
      update();
    });

    dwnDeleteInputButton.addEventListener('click', async () => {
      dwnDeleteInputButton.disabled = true;
      dwnDeleteInputProgress.style.visibility = 'visible';

      dwnDeleteOutputSummary.innerHTML = '...';

      const result = await web5.dwn.records.delete({
        from: parseDid(),
        message: { recordId: createRecordResult.id },
      });

      dwnDeleteOutputDetailsTextarea.value +=
        JSON.stringify(result, null, 2) + '\n';

      dwnDeleteOutputDetailsTextarea.scrollTop =
        dwnDeleteOutputDetailsTextarea.scrollHeight;

      dwnDeleteOutputSummary.innerHTML = `&#x2714; Record deleted!`;

      dwnReadInputButton.disabled = true;
      dwnDeleteInputProgress.style.visibility = 'hidden';
      dwnUpdateInputButton.disabled = true;
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

      <Web5QuickstartWriteDwn />
      <section id="dwn-write">
        <div className="input input-container">
          <label htmlFor="dwn-write-input">Your message</label>
          <input
            placeholder="Write text in me!"
            type="text"
            disabled
            id="dwn-write-input"
          />
        </div>
        <div className="sandbox-container">
          <div className="input">
            <button disabled>Run ›</button>
            <label className="sr-only" htmlFor="dwn-write-progress">
              Write progress
            </label>
            <progress id="dwn-write-progress"></progress>
          </div>
          <div className="output">
            <details>
              <summary>
                <code>
                  <span className="sandbox-placeholder">
                    Your message will appear here
                  </span>
                </code>
              </summary>
              <textarea readOnly></textarea>
            </details>
          </div>
        </div>
      </section>

      <Web5QuickstartReadDwn />
      <section id="dwn-read" className="sandbox-container">
        <div className="input">
          <button disabled>Run ›</button>
          <label className="sr-only" htmlFor="dwn-read-progress">
            Read progress
          </label>
          <progress id="dwn-read-progress"></progress>
        </div>
        <div className="output">
          <code>
            <span className="sandbox-placeholder">
              Your read result will appear here
            </span>
          </code>
        </div>
      </section>

      <Web5QuickstartUpdateDwn />
      <section id="dwn-update">
        <div className="input input-container">
          <label htmlFor="dwn-update-input">Your updated message</label>
          <input
            placeholder="Update me!"
            type="text"
            disabled
            id="dwn-update-input"
          />
        </div>
        <div className="sandbox-container">
          <div className="input">
            <button disabled>Run ›</button>
            <label className="sr-only" htmlFor="dwn-update-progress">
              Update progress
            </label>
            <progress id="dwn-update-progress"></progress>
          </div>
          <div className="output">
            <code>
              <span className="sandbox-placeholder">
                Your updated message will appear here
              </span>
            </code>
          </div>
        </div>
      </section>

      <Web5QuickstartDeleteDwn />
      <section id="dwn-delete" className="sandbox-container">
        <div className="input">
          <button disabled>Run ›</button>
          <label className="sr-only" htmlFor="dwn-delete-progress">
            Delete progress
          </label>
          <progress id="dwn-delete-progress"></progress>
        </div>
        <div className="output">
          <details>
            <summary>
              <code>
                <span className="sandbox-placeholder">
                  The result of your delete operation will appear here
                </span>
              </code>
            </summary>
            <textarea readOnly></textarea>
          </details>
        </div>
      </section>

      <div className="w-full max-w-container">
        <hr className="bg-slash-dark border-none h-2" />
      </div>

      <Web5QuickstartNextSteps />
    </div>
  );
}

export default Web5Quickstart;
