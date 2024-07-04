import React from "react";

const Header: React.FC = () => {
    return (
        <header className={'flex justify-between py-3 px-14'}>
            <div className='text-xl font-bold'>WAGORA</div>
            <div className='text-xl font-bold'>profile</div>
        </header>
    );
}

export default Header;