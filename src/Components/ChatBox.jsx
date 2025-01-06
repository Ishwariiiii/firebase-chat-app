import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { query, orderBy, onSnapshot, limit } from "firebase/firestore";
import Message from "./Message";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messageData"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessageData(sortedMessages);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messageData"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");

    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="messages-container">
        {messageData.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <form className="send-message" >
        <span ref={scroll}></span>

        <label htmlFor="messageInput" hidden>
          Enter Message
        </label>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="messageInput"
          name="messageInput"
          type="text"
          className="form-input__input"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
};

export default ChatBox;