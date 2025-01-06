import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { query, orderBy, onSnapshot, limit } from "firebase/firestore";
import Message from "./Message";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  const [editedMessage, setEditedMessage] = useState(""); // New state for the edited message
  const [messageBeingEditedId, setMessageBeingEditedId] = useState(null); // Track which message is being edited
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

 
  const handleDeleteMessage = async (messageId) => {
    try {
      const messageRef = doc(db, "messageData", messageId);
      await deleteDoc(messageRef);
      console.log("Message deleted");
    } catch (error) {
      console.error("Error deleting message: ", error);
    }
  };

  
  const handleEditMessage = async (messageId) => {
    const messageToEdit = messageData.find((msg) => msg.id === messageId);
    setEditedMessage(messageToEdit.text);
    setMessageBeingEditedId(messageId); 
  };

 
  const saveEditedMessage = async (event) => {
    event.preventDefault();
    if (editedMessage.trim() === "") {
      alert("Message cannot be empty");
      return;
    }

    const messageRef = doc(db, "messageData", messageBeingEditedId);
    await updateDoc(messageRef, {
      text: editedMessage,
      updatedAt: serverTimestamp(), 
    });
    setEditedMessage(""); 
    setMessageBeingEditedId(null);
  };

  return (
    <div>
      <div className="">
        {messageData.map((message) => (
          <Message
            key={message.id}
            message={message}
            onDelete={handleDeleteMessage}
            onEdit={handleEditMessage} 
          />
        ))}
      </div>

      <form className="send-message">
        <span ref={scroll}></span>

        <label htmlFor="messageInput" hidden>
          Enter Message
        </label>

        <input
          value={messageBeingEditedId ? editedMessage : message}
          onChange={(e) => {
            if (messageBeingEditedId) {
              setEditedMessage(e.target.value);
            } else {
              setMessage(e.target.value);
            }
          }}
          id="messageInput"
          name="messageInput"
          type="text"
          className="bg-gray-300 p-3 rounded-full h-[8vh] text-black"
          placeholder="Type a message..."
        />
        {messageBeingEditedId ? (
          <button onClick={saveEditedMessage} className="bg-blue-800 hover:bg-blue-900 h-[8vh] rounded-full ml-2 text-white w-[6%]">
            Save
          </button>
        ) : (
          <button onClick={sendMessage} className="bg-blue-800 hover:bg-blue-900 h-[8vh] rounded-full ml-2 text-white w-[6%]">
            Send
          </button>
        )}
      </form>
    </div>
  );
};
export default ChatBox;