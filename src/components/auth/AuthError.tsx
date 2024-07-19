import React from "react";

interface Props {
    errorMassage: string | undefined;
}

const AuthError: React.FC<Props> = ({ errorMassage }) => {
    // form 에러 메시지 컴포넌트
    return (
        <div
            className='text-xs text-red-400'
        >{errorMassage}</div>
    );
}

export default AuthError;