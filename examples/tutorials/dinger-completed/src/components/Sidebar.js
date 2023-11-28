export function Sidebar({
  groupedDings,
  activeRecipient,
  handleSetActiveRecipient,
  setRecipientDid,
  handleConfirmNewChat,
  handleCopyDid,
  handleStartNewChat,
  showNewChatInput,
  didCopied,
  recipientDid,
  isWeb5Connected,
}) {
  return (
    <aside>
      {Object.keys(groupedDings).map((recipient) => (
        <div
          key={recipient}
          className={`sidebar-item truncate ${
            activeRecipient === recipient ? "active" : ""
          }`}
          onClick={() => handleSetActiveRecipient(recipient)}
        >
          <h3>{recipient}</h3>
        </div>
      ))}
      {activeRecipient === null && showNewChatInput && (
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Recipient DID"
            name="recipientDid"
            id="recipientDid"
            aria-label="Recipient DID"
            value={recipientDid}
            onChange={(e) => setRecipientDid(e.target.value)}
            onFocus={() => setRecipientDid("")}
          />
          <button className="confirm" onClick={handleConfirmNewChat}>
            Confirm
          </button>
        </div>
      )}
      <div className="button-group">
        {isWeb5Connected && (
        <button className="fixed-button button" id="copy-did-button" onClick={handleCopyDid}>
            {didCopied ? "DID Copied!" : "Copy DID"}
        </button>
        )}
        <div className="fixed-button button" onClick={handleStartNewChat}>
          <span>Create +</span>
        </div>
      </div>
    </aside>
  );
}
