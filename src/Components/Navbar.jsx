import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";

const NavBar = () => {
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-black text-white shadow-md">
      <h1 className="text-3xl font-bold">React Chat-App</h1>
      {user ? (
        <button
          onClick={signOut}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={googleSignIn}
          className="flex items-center justify-center bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          <FcGoogle className="mr-2 text-xl" />
          Sign in with Google
        </button>
      )}
    </nav>
  );
};

export default NavBar;
