import useSendEmailCodeStore from "../store/sendEmailCodeStore";
import React from "react";

const JoinForm = () => {
    const {email, changeEmail} = useSendEmailCodeStore();

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeEmail(e.target.value);
    };

    return (
        <div>
            <label htmlFor="email">이메일</label>
            <input id="email" type="email" value={email} onChange={handleChangeEmail}/>
            <button>이메일 인증하기</button>
        </div>
    );
}

export default JoinForm;