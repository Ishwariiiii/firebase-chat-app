import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  const isCurrentUser = user?.uid === message?.userId; 

  return (
    <div
      className={`flex items-center bg-slate-600 h-[50%] w-[50%] flex-row space-x-4 p-3 ml-80  ${
        isCurrentUser ? "justify-center" : "justify-center"
      }`}
    >
     
      {!isCurrentUser && (
        <img
          className="h-10 w-10 rounded-full"
          src={message?.avatar}
          alt="user avatar"
        />
      )}

  
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
     
        {!isCurrentUser && (
          <p className="text-sm font-semibold">{message?.name}</p>
        )}

   
        <p>{message?.text}</p>
      </div>

      {isCurrentUser && (
        <img
          className="h-10 w-10 rounded-full"
          src={message?.avatar}
          alt="user avatar"
        />
      )}
    </div>
  );
};

export default Message;
