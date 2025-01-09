import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { query, orderBy, onSnapshot, limit } from "firebase/firestore";
import Message from "./Message";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  const [editedMessage, setEditedMessage] = useState("");
  const [messageBeingEditedId, setMessageBeingEditedId] = useState(null);
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
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto flex-grow pb-4 px-5  h-[77vh]">
        {messageData.map((message) => (
          <Message
            key={message.id}
            message={message}
            onDelete={handleDeleteMessage}
            onEdit={handleEditMessage}
          />
        ))}
        <span ref={scroll}></span>
      </div>

      <form className="flex items-center p-4 bg-gray-800 border-t border-gray-700 space-x-2 sm:space-x-4">
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
          className="flex-1 bg-gray-300 px-3 rounded-full h-[6vh] text-black sm:h-10 sm:px-4 sm:text-lg"
          placeholder="Type a message..."
        />
        {messageBeingEditedId ? (
          <button
            onClick={saveEditedMessage}
            className="bg-blue-800 hover:bg-blue-900 h-[6vh] sm:h-10 rounded-full text-white w-[20%] sm:w-[10%] flex items-center justify-center"
          >
            Save
          </button>
        ) : (
          <button
            onClick={sendMessage}
            className="bg-blue-800 hover:bg-blue-900 h-[6vh] sm:h-10 rounded-full text-white w-[20%] sm:w-[10%] flex items-center justify-center"
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
};

export default ChatBox;
