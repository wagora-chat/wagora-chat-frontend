import React from "react";
import '../../App.css';
import CloseButton from "../button/CloseButton";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const AuthModal: React.FC<Props> = ({ isOpen, onClose, children }) => {
    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-end transition-transform duration-300 ${isOpen ? 'transform translate-x-0' : 'transform translate-x-full'}`}
            onClick={onClose}
        >
            <div
                className="bg-white h-full w-5/12 p-4 flex"
                onClick={(e) => e.stopPropagation()}
            >
                <CloseButton handleClick={onClose} />
                {children}
            </div>
        </div>
    );
}

export default AuthModal;