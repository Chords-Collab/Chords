import React, { useState } from "react";
import db from "./firebase";
import "./ChatInput.css";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
 

function ChatInput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      db.collection("rooms").doc(channelId).collection("messages").add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userimage: user.photoURL,
      });
    }
    chatRef.current.scrollIntoView({behavior: "smooth",});

    setInput("");
  };

 
  return (
    <div className="chatInput">
      <form>
        <div className="chatFields">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName?.toLowerCase()}`}/>
        </div>       
        <button className="send" type="submit" onClick={sendMessage}>
          Send
        </button>      
      </form>
     
      
    </div>
  );
}

export default ChatInput;
