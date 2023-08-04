import { Web5 } from "@tbd54566975/web5/browser";

let web5;
let myDid;
let record;

 export async function didCreate() {
  return await Web5.connect();
}

export async function createTextRecord(textData) {
  const result = await web5.dwn.records.create({
    data: textData,
    message: {
      dataFormat: "text/plain",
    },
  });

  record = result.record;
  return result;
} 

export async function dwnUpdateDataFromRecordWithId(data) {
  await record.update({ data });
  return await record.data.text();
}

export async function dwnReadDataFromRecordWithId() {
  return await record.data.text();
}

export async function dwnDeleteRecordWithId() {
  await record.delete();
  record = null;
}

/* ========== Web5 ========== */
/* ========================== */

// TODO: co-locate any scripts that reference/manipulate the dom with the html, as test are failing otherwise.
document.querySelector("progress").remove();

let didCreateInputButton = document.querySelector("#did-create .input button");
let didCreateOutputSummaryCode = document.querySelector(
  "#did-create .output details summary code"
);
let didCreateOutputDetailsTextarea = document.querySelector(
  "#did-create .output details textarea"
);

let dwnWriteInputFile = document.querySelector(
  '#dwn-write .input input[type="text"]'
);
let dwnWriteInputButton = document.querySelector("#dwn-write .input button");
let dwnWriteInputProgress = document.querySelector(
  "#dwn-write .input progress"
);
let dwnWriteOutputSummary = document.querySelector(
  "#dwn-write .output details summary code"
);
let dwnWriteOutputDetailsTextarea = document.querySelector(
  "#dwn-write .output details textarea"
);

let dwnReadInputButton = document.querySelector("#dwn-read .input button");
let dwnReadInputProgress = document.querySelector("#dwn-read .input progress");
let dwnReadOutput = document.querySelector("#dwn-read .output");

let dwnUpdateInputFile = document.querySelector(
  '#dwn-update .input input[type="text"]'
);
let dwnUpdateInputButton = document.querySelector("#dwn-update .input button");
let dwnUpdateInputProgress = document.querySelector(
  "#dwn-update .input progress"
);
let dwnUpdateOutput = document.querySelector("#dwn-update .output");

let dwnDeleteInputButton = document.querySelector("#dwn-delete .input button");
let dwnDeleteInputProgress = document.querySelector(
  "#dwn-delete .input progress"
);
let dwnDeleteOutputSummary = document.querySelector(
  "#dwn-delete .output details summary"
);
let dwnDeleteOutputDetailsTextarea = document.querySelector(
  "#dwn-delete .output details textarea"
);
let registered = false;

function update() {
  if (!myDid) {
    registered = false;
  }

  if (!registered) {
    record = null;
  }

  if (document.activeElement !== didCreateOutputDetailsTextarea) {
    didCreateOutputSummaryCode.innerHTML = myDid
      ? "&#x2714; Created!"
      : "Error";
    didCreateOutputDetailsTextarea.value = myDid
      ? JSON.stringify(myDid, null, 2)
      : "";
  }

  let noRecord = !record;

  dwnWriteInputFile.disabled = !registered;
  dwnWriteInputButton.disabled = !registered || !dwnWriteInputFile.value;
  dwnWriteOutputSummary.innerHTML = !noRecord ? "&#x2714; Written!" : "...";
  dwnWriteOutputDetailsTextarea.value = !noRecord ? record : "";

  dwnReadInputButton.disabled = noRecord;

  dwnUpdateInputFile.disabled = noRecord;
  dwnUpdateInputButton.disabled = noRecord || !dwnUpdateInputFile.value;

  dwnDeleteInputButton.disabled = noRecord;
  dwnDeleteOutputSummary.innerHTML = noRecord ? `&#x2714; Deleted!` : "...";
  dwnDeleteOutputDetailsTextarea.value = noRecord
    ? JSON.stringify(record, null, 2)
    : "";
}

didCreateInputButton.addEventListener("click", async () => {
  const result = await didCreate();
  myDid = result.did;
  web5 = result.web5;
  registered = true;
  update();
});
didCreateOutputDetailsTextarea.addEventListener("input", () => {
  try {
    did = JSON.parse(didCreateOutputDetailsTextarea.value);
  } catch {
    did = null;
  }

  registered = false;
  update();
});

dwnWriteInputFile.addEventListener("input", () => {
  update();
});

dwnWriteInputButton.addEventListener("click", async () => {
  dwnWriteInputButton.disabled = true;
  dwnWriteInputProgress.style.visibility = "visible";
  dwnWriteOutputSummary.innerHTML = "...";
  await createTextRecord(dwnWriteInputFile.value);
  dwnWriteOutputDetailsTextarea.value = "ALR WHAT";
  dwnWriteInputButton.disabled = false;
  dwnWriteInputProgress.style.visibility = "hidden";

  update();
});

dwnReadInputButton.addEventListener("click", async () => {
  dwnReadInputButton.disabled = true;
  dwnReadInputProgress.style.visibility = "visible";

  dwnReadOutput.innerHTML = "";
  dwnReadOutput.innerHTML = await dwnReadDataFromRecordWithId();

  dwnReadInputButton.disabled = false;
  dwnReadInputProgress.style.visibility = "hidden";
  update();
});

dwnUpdateInputFile.addEventListener("input", () => {
  update();
});

dwnUpdateInputButton.addEventListener("click", async () => {
  dwnUpdateInputButton.disabled = true;
  dwnUpdateInputProgress.style.visibility = "visible";
  dwnUpdateOutput.innerHTML = "";
  let updateValue = dwnUpdateInputFile.value;
  dwnUpdateOutput.innerHTML = await dwnUpdateDataFromRecordWithId(updateValue);
  dwnUpdateInputButton.disabled = false;
  dwnUpdateInputProgress.style.visibility = "hidden";
  update();
});

dwnDeleteInputButton.addEventListener("click", async () => {
  dwnDeleteInputButton.disabled = true;
  dwnDeleteInputProgress.style.visibility = "visible";
  dwnDeleteOutputSummary.innerHTML = "...";
  dwnDeleteOutputDetailsTextarea.value = "";
  await dwnDeleteRecordWithId();
  dwnDeleteInputProgress.style.visibility = "hidden";

  update();
});
 