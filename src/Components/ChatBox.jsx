import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import Message from "./Message";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messagesData, setMessagesData] = useState([])
  const scroll = useRef();


  useEffect(() => {
    const q = query(
      collection(db, "messages"),
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
      setMessagesData(sortedMessages);
    });
    return () => unsubscribe;
  }, []);


  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
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

      {messagesData?.map((data) => (
        <Message key={message.id} message={data} />
      ))}
      <span ref={scroll}></span>

      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>

      <div className="flex items-center space-x-4 ml-80">
        <input
          id="messageInput"
          name="messageInput"
          type="text"
          className="h-12 w-80 p-3 rounded-md bg-gray-200 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>


    </div>
  );
};
export default ChatBox;