import useSendEmailCodeStore from "../store/sendEmailCodeStore";
import React from "react";
import useSignUpStore from "../store/signUpStore";
import {useForm} from "react-hook-form";

const JoinForm = () => {
    const {email, changeEmail} = useSendEmailCodeStore();
    const {body, signUp, submitForm} = useSignUpStore();

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeEmail(e.target.value);
    };

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    return (
        <div className='flex min-h-screen justify-center items-center border-2'>
            <form
                onSubmit={handleSubmit(async (data) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    console.log(data)
                    submitForm(data);
                    signUp(body);
                })}
                className='flex flex-col justify-center items-center w-96 h-96 border-2'>
                <div {...register("profile")} className='border-2 w-20 h-20 text-center'>프로필</div>
                <label htmlFor="email">이메일</label>
                <input
                    id="email" type="email" {...register("email")} value={email} onChange={handleChangeEmail}
                />
                <button className='border-2 border-gray-300 hover:bg-gray-400'>이메일 인증하기</button>

                <label htmlFor="username">유저 네임</label>
                <input id="username" type="text" {...register("nickname")}/>

                <label htmlFor="password">비밀번호</label>
                <input id="password" type="password" {...register("password")}/>

                <label htmlFor="confirm">비밀번호 확인</label>
                <input id="confirm" type="password" {...register("checkPassword")}/>
                <button className='border-2 border-gray-300 hover:bg-gray-400'>회원가입</button>
            </form>
        </div>
    );
}

export default JoinForm;