import React from "react";
import {Link, useNavigate} from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { sendTempPassword } from "../../lib/api/auth";
import AuthError from "./AuthError";

interface FindPasswordFormInputs {
    email: string;
}

const FindPasswordForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FindPasswordFormInputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FindPasswordFormInputs> = (data) => {
        sendTempPassword({
            email: data.email,
        }).then((response) => {
            alert("이메일로 임시 비밀번호가 발급 되었습니다.");
            navigate('/');
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className='flex min-h-screen justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center w-96 h-96 border-2 gap-3'>
                <label htmlFor="email">이메일</label>
                <input
                    id="email"
                    type="text"
                    className='border-2'
                    {...register("email", {
                        required: "이메일을 입력해주세요",
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                            message: "유효한 이메일 주소를 입력해주세요",
                        }
                    })}
                />
                {errors.email && <AuthError errorMassage={errors.email.message} />}

                <button className='border-2 border-gray-300 hover:bg-gray-400'>임시 비밀번호 발급</button>
            </form>
        </div>
    );
}

export default FindPasswordForm;