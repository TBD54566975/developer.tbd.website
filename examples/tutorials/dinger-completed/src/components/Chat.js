export function Chat({
  activeRecipient,
  sortedDings,
  myDid,
  handleSubmit,
  noteValue,
  setNoteValue,
  setErrorMessage,
  errorMessage,
}) {
  return (
    <div className="conversation">
      <h3>
        Conversation with <span className="truncate">{activeRecipient}</span>
      </h3>
      <ul>
        {sortedDings
          .filter(
            (ding) =>
              ding.sender === activeRecipient ||
              ding.recipient === activeRecipient
          )
          .map((ding, index) => (
            <li
              key={index}
              className={
                ding.sender === myDid
                  ? "my-chat-bubble"
                  : "recipient-chat-bubble"
              }
            >
              <p>
                <strong>{ding.sender === myDid ? "You" : "Recipient"}:</strong>{" "}
                {ding.note}
              </p>
            </li>
          ))}
      </ul>
      <div className="input-error-container">
        <div className="input-group">
          <input
            type="text"
            placeholder="Type a note..."
            value={noteValue}
            name="note"
            id="note"
            aria-label="Note"
            onChange={(e) => {
              setNoteValue(e.target.value);
              if (e.target.value.trim()) {
                setErrorMessage("");
              }
            }}
            onFocus={() => setNoteValue("")}
          />
          <button type="submit" onClick={handleSubmit}>
            Send
          </button>
        </div>
        <p
          className="error-message"
          style={{
            opacity: errorMessage ? "1" : "0",
            maxHeight: errorMessage ? "50px" : "0",
          }}
        >
          {errorMessage}
        </p>
      </div>
    </div>
  );
}
