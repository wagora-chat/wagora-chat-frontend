import React from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import useLoginStore from "../../store/loginStore";
import { login } from "../../lib/api/auth";
import AuthError from "./AuthError";

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        login({
            email: data.email,
            password: data.password,
        }).then((response) => {
            console.log('로그인 성공');
            sessionStorage.setItem('member', JSON.stringify(response.data));
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

                <label htmlFor="password">비밀 번호</label>
                <input
                    id="password"
                    type="password"
                    className='border-2'
                    {...register("password", { required: "비밀번호를 입력해주세요" })}
                />
                {errors.password && <AuthError errorMassage={errors.password.message} />}

                <button className='border-2 border-gray-300 hover:bg-gray-400'>로그인</button>
                <Link className='text-xs text-gray-500' to='/'>비밀번호 찾기</Link>
            </form>
        </div>
    );
}

export default LoginForm;