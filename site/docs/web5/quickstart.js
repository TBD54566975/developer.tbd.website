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

let web5;
let did;
let bearerId;
let createRecordResult;

let didCreate;
let getBearerId;
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

let didCreateInputButton;
let didCreateInputProgress;
let didCreateOutputSummaryCode;
let didCreateOutputDetailsTextarea;

let getBearerIdInputButton;
let getBearerIdInputProgress;
let getBearerIdOutputSummaryCode;
let getBearerIdOutputDetailsTextarea;


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
      getBearerId = codeSnippetsUtils.getBearerId;
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

    getBearerIdInputButton = document.querySelector('#get-bearer-id .input button');
    getBearerIdInputProgress = document.querySelector('#get-bearer-id .input progress');
    getBearerIdOutputSummaryCode = document.querySelector('#get-bearer-id .output details summary code');
    getBearerIdOutputDetailsTextarea = document.querySelector('#get-bearer-id .output details textarea');

    // event listeners

    didCreateInputButton.addEventListener('click', async () => {
      didCreateInputButton.disabled = true;
      didCreateInputProgress.style.visibility = 'visible';

      const performDidCreate = didCreate();
      performDidCreate().then(result => {
        did = result.did;
        web5 = result.web5;
  
        didCreateOutputSummaryCode.innerHTML = did;
        didCreateInputButton.disabled = false;
        didCreateInputProgress.style.visibility = 'hidden';
      });
      update();
    });

    didCreateOutputDetailsTextarea.addEventListener('input', () => {
      didCreateOutputSummaryCode.innerHTML = parseDid()?.internalId ?? '...';

      update();
    });

    // Adding an event listener inside the useEffect or DOMContentLoaded callback
    getBearerIdInputButton.addEventListener('click', async () => {
      getBearerIdInputButton.disabled = true;
      getBearerIdInputProgress.style.visibility = 'visible';

      // // Assuming 'web5' and 'didUri' are available here
      // const result = await getBearerId(web5, "your-did-uri"); // Adjust 'your-did-uri' accordingly

      
      const performGetBearerId = getBearerId(web5, did);
        performGetBearerId().then(bearerId => {
   
          console.log(bearerId)
          const rebuiltBearerIdentity = {
            did: {
             document: bearerId.did.document,
              keyManager: {
                _agent: 'Web5UserAgent',
                _algorithmInstances: bearerId.did.keyManager._algorithmInstances,
                _keyStore: bearerId.did.keyManager._keyStore,
              },
              uri: bearerId.did.uri,
              metadata: bearerId.did.metadata,

            },
            metadata: bearerId.metadata,
          }

          const htmlContent = objectToDetailsHTML(rebuiltBearerIdentity, 'BearerIdentity');
       //   console.log(htmlContent)
          bearerId = bearerId;
          getBearerIdOutputSummaryCode.innerHTML = htmlContent;
        });

    
      // getBearerIdOutputDetailsTextarea.value = JSON.stringify(result, null, 2);

      // getBearerIdInputButton.disabled = false;
      // getBearerIdInputProgress.style.visibility = 'hidden';
    });

  }, []);

  function objectToDetailsHTML(data, name = 'Root') {
    if (typeof data !== 'object' || data === null) {
      return `<div>${name}: ${String(data)}</div>`;  // Handle non-object and null
    }

    const details = Object.keys(data).map(key => {
      return objectToDetailsHTML(data[key], key);
    }).join('');

    return `<details><summary>${name}</summary>${details}</details>`;
  }

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

      <section id="get-bearer-id" className="sandbox-container">
        <div className="input">
          <button>Run ›</button>
          <label className="sr-only" htmlFor="get-bearer-id-progress">
            Bearer Identity Creation Progress
          </label>
          <progress id="get-bearer-id-progress"></progress>
        </div>
        <div className="output">
          <details className="sandbox-details">
            <summary>
              <code>
                <span className="sandbox-placeholder">
                  Your Bearer Identity will appear here
                </span>
              </code>
            </summary>
            <textarea spellCheck="false"></textarea>
          </details>
        </div>
      </section>

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
