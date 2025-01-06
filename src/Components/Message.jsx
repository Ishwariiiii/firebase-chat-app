import React, { useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiDotsVertical } from "react-icons/bi";

const Message = ({ message, onDelete, onEdit }) => {
    const [user] = useAuthState(auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleDelete = () => {
        onDelete(message.id);
        setIsMenuOpen(false);
    };

    const handleEdit = () => {
        onEdit(message.id);
        setIsMenuOpen(false); 
    };

    return (
        <div className={`w-full flex items-start mt-3 ${message.uid === user?.uid ? "justify-end" : ""}`}>
            <div
                className={`max-w-[70%] flex items-start gap-3 p-3 rounded-lg mr-4 ${message.uid === user?.uid
                        ? "bg-gray-800 text-white ml-auto"
                        : "bg-gray-600 text-white"
                    }`}
            >
                <img
                    src={message?.avatar}
                    alt="user avatar"
                    className="w-10 h-10 rounded-full"
                />

                <div>
                    <p className="text-sm font-semibold">{message.name}</p>
                    <p className="text-base font-medium mt-1">{message.text}</p>
                </div>

                <BiDotsVertical
                    className="text-white cursor-pointer ml-auto"
                    onClick={toggleMenu}
                />

                {isMenuOpen && (
                    <div className="absolute flex flex-col bg-gray-700 rounded-lg mt-2 right-4">
                        <button
                            className="px-4 py-2 text-white text-sm hover:bg-gray-500"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                        <button
                            className="px-4 py-2 text-white text-sm hover:bg-gray-500"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>                                                                   
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message;