import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  const isCurrentUser = user?.uid === message?.userId;  // Check if the message is from the current user

  return (
    <div
      className={`flex items-center space-x-4 p-3 ${
        isCurrentUser ? "justify-center" : "justify-center"
      }`}
    >
      {/* Message Avatar */}
      {!isCurrentUser && (
        <img
          className="h-10 w-10 rounded-full"
          src={message?.avatar}
          alt="user avatar"
        />
      )}

      {/* Message Content */}
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {/* Message sender name */}
        {!isCurrentUser && (
          <p className="text-sm font-semibold">{message?.name}</p>
        )}

        {/* Message text */}
        <p>{message?.text}</p>
      </div>

      {/* Avatar for current user (optional) */}
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
