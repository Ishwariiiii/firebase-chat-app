import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  console.log(message,"message")

  return (
    <div className={`${message.uid === user?.uid ? "right" : ""}`}>
      <img
        src={message?.avatar}
        alt="user avatar"
      />
      <div >
        <p>{message.name}</p>
        <p >{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
