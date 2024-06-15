import React from "react";
import {Link} from "react-router-dom";

const MainTemplate: React.FC = () => {
    return (
        <div
            className={'flex min-h-screen justify-center items-center'}
        >
            <div
                className={'flex flex-col justify-center items-center w-96 h-96 border-2 gap-2'}
            >
                <Link
                    to={'/login'}
                    className='border-2 border-gray-300 hover:bg-gray-400 text-xl'
                >Login
                </Link>

                <Link
                    to={'/join'}
                    className='border-2 border-gray-300 hover:bg-gray-400 text-xl'
                >Join
                </Link>
            </div>

        </div>
    );
}

export default MainTemplate;