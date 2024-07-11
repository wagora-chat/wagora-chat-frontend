import React from "react";
import {Link} from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className={'flex justify-between py-3 px-14'}>
            <Link to={'/chats'} className='text-xl font-bold'>WAGORA</Link>
            <div className='text-xl font-bold'>profile</div>
        </header>
    );
}

export default Header;