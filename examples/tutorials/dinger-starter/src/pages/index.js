import { Web5 } from "@web5/api";
import { useState, useEffect } from "react";
import { NoChatSelected } from "@/components/NoChatSelected";
import { Sidebar } from "@/components/Sidebar";
import { Chat } from "@/components/Chat";

export default function Home() {

  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);
  const [activeRecipient, setActiveRecipient] = useState(null);

  const [receivedDings, setReceivedDings] = useState([]);
  const [sentDings, setSentDings] = useState([]);

  const [noteValue, setNoteValue] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [recipientDid, setRecipientDid] = useState("");

  const [didCopied, setDidCopied] = useState(false);
  const [showNewChatInput, setShowNewChatInput] = useState(false);

  const allDings = [...receivedDings, ...sentDings];

  const sortedDings = allDings.sort(
    (a, b) => new Date(a.timestampWritten) - new Date(b.timestampWritten)
  );

  const groupedDings = allDings.reduce((acc, ding) => {
    const recipient = ding.sender === myDid ? ding.recipient : ding.sender;
    if (!acc[recipient]) acc[recipient] = [];
    acc[recipient].push(ding);
    return acc;
  }, {});

  useEffect(() => {
    const initWeb5 = async () => {
      console.log(`this log is in initWeb5`);

      if (web5 && did) {
        await configureProtocol(web5);
        await fetchDings(web5, did);
      }
    };
    initWeb5();
  }, []);

  useEffect(() => {
    if (!web5 || !myDid) return;
    const intervalId = setInterval(async () => {
      console.log(`this log is in intervalId`);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [web5, myDid]);

  const configureProtocol = async (web5) => {
    console.log(`this log is in configureProtocol`);
  };

  const constructDing = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const ding = {
      sender: myDid,
      note: noteValue,
      recipient: recipientDid,
      timestampWritten: `${currentDate} ${currentTime}`,
    };
    return ding;
  };

  const writeToDwn = async (ding) => {
    console.log(`this log is in writeToDwn`);
  };

  const sendRecord = async (record) => {
    console.log(`this log is in sendRecord`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!noteValue.trim()) {
      setErrorMessage('Please type a message before sending.');
      return;
    }

    const ding = constructDing();
    const record = await writeToDwn(ding);
    const { status } = await sendRecord(record);

    console.log("Send record status", status);

    await fetchDings(web5, myDid);
  };

  const handleCopyDid = async () => {
    if (myDid) {
      try {
        await navigator.clipboard.writeText(myDid);
        setDidCopied(true);

        setTimeout(() => {
          setDidCopied(false);
        }, 3000);
      } catch (err) {
        console.log("Failed to copy DID: " + err);
      }
    }
  };

  const fetchDings = async (web5, did) => {
    console.log(`this log is in fetchDings`);
  };

  const handleStartNewChat = () => {
    setActiveRecipient(null);
    setShowNewChatInput(true);
  };

  const handleSetActiveRecipient = (recipient) => {
    setRecipientDid(recipient);
    setActiveRecipient(recipient);
    setShowNewChatInput(false);
  };

  const handleConfirmNewChat = () => {
    setActiveRecipient(recipientDid);
    setActiveRecipient(recipientDid);
    setShowNewChatInput(false);
    if (!groupedDings[recipientDid]) {
      groupedDings[recipientDid] = [];
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Dinger</h1>
      </header>
      <main>
        <Sidebar
          groupedDings={groupedDings}
          activeRecipient={activeRecipient}
          handleSetActiveRecipient={handleSetActiveRecipient}
          handleCopyDid={handleCopyDid}
          handleStartNewChat={handleStartNewChat}
          showNewChatInput={showNewChatInput}
          didCopied={didCopied}
          handleConfirmNewChat={handleConfirmNewChat}
          setRecipientDid={setRecipientDid}
          recipientDid={recipientDid}
        />
        <section>
          {activeRecipient ? (
            <Chat
              activeRecipient={activeRecipient}
              sortedDings={sortedDings}
              myDid={myDid}
              handleSubmit={handleSubmit}
              noteValue={noteValue}
              setNoteValue={setNoteValue}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          ) : (
            <NoChatSelected />
          )}
        </section>
      </main>
    </div>
  );
}