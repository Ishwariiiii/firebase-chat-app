import React, { useState, useRef, useEffect } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiDotsVertical } from "react-icons/bi";
import { Menu, MenuItem } from "@mui/material";

const Message = ({ message, onDelete, onEdit }) => {
  const [user] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // To detect clicks outside the dropdown
  const buttonRef = useRef(null); // To track the button click

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleDelete = () => {
    onDelete(message.id);
    setIsMenuOpen(false);
  };

  const handleEdit = () => {
    onEdit(message.id);
    setIsMenuOpen(false);
  };

  // Close the menu if the user clicks outside of the menu or the button
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false); // Close the dropdown
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`w-full flex items-start mt-3 ${message.uid === user?.uid ? "justify-end" : ""}`}
    >
      <div
        className={`relative max-w-[70%] flex items-start gap-3 py-3 rounded-lg ${message.uid === user?.uid ? "bg-gray-800 text-white ml-auto pr-2 pl-7" : "bg-gray-600 pr-7 pl-2  text-white"}`}
      >
        <img
          src={message?.avatar}
          alt="user avatar"
          className="w-10 h-10 rounded-full"
        />

        <div className="flex-1">
          <p className="text-sm font-semibold truncate">{message.name}</p>
          <p className="text-base font-medium mt-1 text-ellipsis whitespace-nowrap sm:whitespace-normal sm:text-lg">
            {message.text}
          </p>
        </div>
        {message.uid === user?.uid && (
            <div className="relative inline-block text-left">
          <div >
            <button
              ref={buttonRef}
              type="button"
              onClick={toggleMenu}
              id="menu-button"
              aria-expanded={isMenuOpen ? "true" : "false"}
              aria-haspopup="true"
            >
              <BiDotsVertical
          className="text-white cursor-pointer ml-auto"
        /> 
            </button>
          </div>

          {/* Dropdown menu */}
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                <button
                  onClick={handleEdit}
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-1"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
        )}

        
      </div>
    </div>
  );
};

export default Message;
