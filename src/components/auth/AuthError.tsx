import React from "react";

interface Props {
    errorMassage: string | undefined;
}

const AuthError: React.FC<Props> = ({ errorMassage }) => {
    return (
        <div
            className='text-xs text-red-400'
        >{errorMassage}</div>
    );
}

export default AuthError;