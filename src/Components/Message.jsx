import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  console.log(message,"message")

  return (
    <div className={`w-[100vw] flex items-center mt-3 ${message.uid === user?.uid ? "justify-end" : ""}`}>
    <div className={` w-[25%] flex items-center gap-2`}>
      <img
        src={message?.avatar}
        alt="user avatar"
      />
      <div >
        <p>{message.name}</p>
        <p >{message.text}</p>
      </div>
    </div>
    </div>
  );
};

export default Message;
