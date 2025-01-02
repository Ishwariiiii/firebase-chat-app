import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase"
import { FcGoogle } from "react-icons/fc";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <main className="flex flex-col items-center justify-center h-[90%] m-7 p-6">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
        Welcome to React Chat
      </h2>
      <img
        src="/logo512.png"
        alt="ReactJs logo"
        className="w-24 h-24 mb-4"
      />
      <p className="text-lg text-center text-gray-600 mb-8">
        Sign in with Google to chat with your fellow React Developers.
      </p>
      <button
        onClick={googleSignIn}
        className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out"
      >
        <FcGoogle className="mr-2 text-xl" />
        Sign in with Google
      </button>
    </main>
  );
};

export default Welcome;
