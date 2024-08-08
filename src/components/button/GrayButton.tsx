import React from "react";

interface Props {
    name: string,
}

const GrayButton: React.FC<Props> = ({ name}) => {
    return (
        <button
            className="flex items-center justify-center w-40 h-10 pb-3 py-2 rounded-3xl font-noto-sans-kr font-bold text-2xl text-snow border-charcoal border bg-charcoal hover:bg-snow hover:text-charcoal"
        >{name}</button>
    );
}

export default GrayButton;