import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { FcGoogle } from "react-icons/fc";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <main className="flex flex-col items-center justify-center h-[90%] m-4 p-4 sm:m-6 sm:p-6 md:m-8 md:p-8 lg:m-10 lg:p-10">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center text-gray-800 mb-6">
        Welcome to React Chat
      </h2>
      <img
        src="/logo512.png"
        alt="ReactJs logo"
        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mb-4"
      />
      <p className="text-base sm:text-lg lg:text-xl text-center text-gray-600 mb-8">
        Sign in with Google to chat with your fellow React Developers.
      </p>
      <button
        onClick={googleSignIn}
        className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out w-full sm:w-auto"
      >
        <FcGoogle className="mr-2 text-xl sm:text-2xl" />
        Sign in with Google
      </button>
    </main>
  );
};

export default Welcome;
