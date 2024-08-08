import React from "react";
import cross from "../../image/icon/cross.png";

interface Props {
    handleClick: () => void;
}

const CloseButton: React.FC<Props> = ({ handleClick }) => {
    return (
        <button
            onClick={handleClick}
            className="w-8 h-8 m-0 hover:opacity-50"
        >
            <img src={cross} alt="닫기"/>
        </button>
    );
}

export default CloseButton;