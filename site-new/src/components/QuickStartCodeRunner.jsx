import React, { useState, useRef } from "react";
import JsonView from "react18-json-view";
import "@site/src/css/web5-quickstart.css";
import "react18-json-view/src/style.css";
import { useQuickstartExecutionContext } from "@site/src/components/QuickstartExecutionContext";

// Don't delete. Need this for now due to webpack / docusaurus config
const importFunction = async (name) =>
  (await import("../old-util/code-snippets.js"))[name];

const executeFunctions = {
  executeDidCreate: () => importFunction("executeDidCreate"),
  executeGetBearerDid: () => importFunction("executeGetBearerDid"),
  executeCreateVc: () => importFunction("executeCreateVc"),
  executeSignVc: () => importFunction("executeSignVc"),
  executeWriteVcToDwn: () => importFunction("executeWriteVcToDwn"),
  executeReadVcFromDwn: () => importFunction("executeReadVcFromDwn"),
  executeParseVc: () => importFunction("executeParseVc"),
};

const QuickstartCodeRunner = ({
  executeCodeName,
  viewJsonObj = false,
  stepIndex,
  collapseLevel,
  defaultInputValue,
  customPlaceholder,
  autoOpenDetails = true,
}) => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const detailsRef = useRef(null);
  const { stepsCompleted, markStepCompleted } = useQuickstartExecutionContext();

  const handleRun = async () => {
    setLoading(true);
    try {
      const executeCode = await executeFunctions[executeCodeName]();
      const result = await executeCode(inputValue.trim() || defaultInputValue);
      setOutput(result);
      if (detailsRef.current && autoOpenDetails) {
        detailsRef.current.open = true;
      }
      markStepCompleted(stepIndex);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      if (detailsRef.current && autoOpenDetails) {
        detailsRef.current.open = true;
      }
    }
    setLoading(false);
  };

  const isEnabled = stepsCompleted.includes(stepIndex - 1) || stepIndex === 0;

  return (
    <section className="sandbox-container">
      <div className="input">
        {defaultInputValue && (
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        )}
        <button onClick={handleRun} disabled={!isEnabled || loading}>
          Run {">"}
        </button>
        {loading && <progress />}
      </div>
      <div className="output">
        <details className="sandbox-details" ref={detailsRef}>
          <summary>
            {viewJsonObj ? (
              output ? (
                <JsonView
                  enableClipboard={false}
                  dark={true}
                  src={output}
                  collapsed={collapseLevel ?? 2}
                />
              ) : (
                <code>
                  <span className="sandbox-placeholder">
                    {customPlaceholder}
                  </span>
                </code>
              )
            ) : output ? (
              <code>{output}</code>
            ) : (
              <code>
                <span className="sandbox-placeholder">{customPlaceholder}</span>
              </code>
            )}
          </summary>
        </details>
      </div>
    </section>
  );
};

export default QuickstartCodeRunner;
