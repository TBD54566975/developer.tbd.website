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
let did;
let bearerDid;
let createRecordResult;

let didCreate;
let getBearerDid;
let createQuickstartVc;
let signQuickstartVc;
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
    createVcInputText.disabled = true;
    createVcInputButton.disabled = true;
    createVcInputProgress.style.visibility = 'hidden';
    createVcOutputSummary.innerHTML = '...';
    createVcOutputDetailsTextarea.value = '';
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


let createVcInputText;
let createVcInputButton;
let createVcInputProgress;
let createVcOutputSummary;
let createVcOutputDetailsTextarea;

let signVcInputText;
let signVcInputButton;
let signVcInputProgress;
let signVcOutputSummaryCode;
let signVcOutputDetailsTextarea;

function Web5Quickstart() {
  
  useEffect(() => {
    const loadWeb5 = async () => {
      const codeSnippetsUtils = await import('../../src/util/code-snippets');
      didCreate = codeSnippetsUtils.didCreate;
      getBearerDid = codeSnippetsUtils.getBearerDid;
      createQuickstartVc = codeSnippetsUtils.createQuickstartVc;
      signQuickstartVc = codeSnippetsUtils.signQuickstartVc;
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

    createVcInputText = document.querySelector('#create-vc .input input');
    createVcInputButton = document.querySelector('#create-vc .input button');
    createVcInputProgress = document.querySelector(
      '#create-vc .input progress',
    );
    createVcOutputSummary = document.querySelector(
      '#create-vc .output details summary',
    );
    createVcOutputDetailsTextarea = document.querySelector(
      '#create-vc .output details textarea',
    );

    signVcInputText = document.querySelector('#sign-vc .input input');
    signVcInputButton = document.querySelector('#sign-vc .input button');
    signVcInputProgress = document.querySelector(
      '#sign-vc .input progress',
    );
    signVcOutputSummaryCode = document.querySelector(
      '#sign-vc .output details summary',
    );
    signVcOutputDetailsTextarea = document.querySelector(
      '#sign-vc .output details textarea',
    );


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

      
      const performGetBearerId = getBearerDid(web5, did);
      performGetBearerId().then(bearerDid => {

         
        getBearerIdOutputSummaryCode.innerHTML = '&#x2714; Bearer DID created!';
        getBearerIdInputProgress.style.visibility = 'hidden';
        getBearerIdInputButton.disabled = false;
        createVcInputText.disabled = false;
        });

    
      // getBearerIdOutputDetailsTextarea.value = JSON.stringify(result, null, 2);

      // getBearerIdInputButton.disabled = false;
      // getBearerIdInputProgress.style.visibility = 'hidden';
    });

    createVcInputButton.addEventListener('click', async () => {

      createVcInputButton.disabled = true;
      createVcInputProgress.style.visibility = 'visible';

      let inputName = createVcInputText.value;

      const performCreateQuickstartVc = createQuickstartVc(web5, did, inputName);
      performCreateQuickstartVc().then(vc => {
        console.log(vc);
        createVcInputButton.disabled = false;
        createVcInputProgress.style.visibility = 'hidden';
        createVcOutputSummary.innerHTML = JSON.stringify(vc.vcDataModel.credentialSubject, null, 2);

      });
    });

    signVcInputButton.addEventListener('click', async () => {
      signVcInputButton.disabled = true;
      signVcInputProgress.style.visibility = 'visible';

      // // Assuming 'web5' and 'didUri' are available here
      // const result = await getBearerId(web5, "your-did-uri"); // Adjust 'your-did-uri' accordingly


      const performSignVc = signQuickstartVc(web5, did);
      performSignVc().then(signedVc => {
        signVcOutputSummaryCode.innerHTML = signedVc;
        signVcInputProgress.style.visibility = 'hidden';
        signVcInputButton.disabled = false;
      //  createVcInputText.disabled = false;
      });


      // getBearerIdOutputDetailsTextarea.value = JSON.stringify(result, null, 2);

      // getBearerIdInputButton.disabled = false;
      // getBearerIdInputProgress.style.visibility = 'hidden';
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

      <section id="create-vc">
        <div className="input input-container">
          <label htmlFor="create-vc-input">Your message</label>
          <input
            placeholder="Write name in me!"
            type="text"
            disabled
            id="create-vc-input"
          />
        </div>
        <div className="sandbox-container">
          <div className="input">
            <button>Run ›</button>
            <label className="sr-only" htmlFor="create-vc-progress">
              Create Vc Progress
            </label>
            <progress id="create-vc-progress"></progress>
          </div>
          <div className="output">
            <details>
              <summary>
                <code>
                  <span className="sandbox-placeholder">
                    Your VC will appear here
                  </span>
                </code>
              </summary>
              <textarea readOnly></textarea>
            </details>
          </div>
        </div>
      </section>

      <Web5QuickstartSignVc />

      <section id="sign-vc" className="sandbox-container">
        <div className="input">
          <button>Run ›</button>
          <label className="sr-only" htmlFor="sign-vc-progress">
            Signed VC Progress
          </label>
          <progress id="sign-vc-progress"></progress>
        </div>
        <div className="output">
          <details className="sandbox-details">
            <summary>
              <code>
                <span className="sandbox-placeholder">
                  Your JWT will appear here
                </span>
              </code>
            </summary>
            <textarea spellCheck="false"></textarea>
          </details>
        </div>
      </section>

      <Web5QuickStartWriteVcToDwn />
      <Web5QuickstartReadVcFromDwn />
      <Web5QuickstartParseVc />
      <Web5QuickstartNextSteps />
    </div>
  );
}

export default Web5Quickstart;
