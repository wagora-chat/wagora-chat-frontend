import React from "react";
import logo from "../../../image/logo/text_logo_100x31.png";
import {Link} from "react-router-dom";

const SubHeader: React.FC = () => {
    return (
        <header className='flex fixed justify-start py-4 px-14'>
            <Link
                to='/'
                className=""
            >
                <img
                    src={logo}
                    alt="로고"
                    className="w-28 h-9"
                />
            </Link>
        </header>
    );
}

export default SubHeader;