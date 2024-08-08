import React from "react";

interface Props {
    name: string
    handleClick: (event: React.MouseEvent) => void
}

const PurpleButton: React.FC<Props> = ({ name, handleClick }) => {
    return (
        <button
            onClick={handleClick}
            className="flex items-center justify-center w-40 h-10 pb-3 py-2 rounded-3xl font-noto-sans-kr font-bold text-2xl text-snow border-lavender border bg-lavender hover:bg-ice hover:text-lavender"
        >{name}</button>
    );
}

export default PurpleButton;