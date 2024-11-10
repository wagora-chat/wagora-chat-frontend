import React from "react";
import {Link, useNavigate} from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../../lib/api/auth";
import AuthError from "./AuthError";
import {useAuth} from "../../context/AuthContext";
import logo from "../../image/logo/modal_Logo_65x61.5.png";
import GrayButton from "../button/GrayButton";

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const navigate = useNavigate();
    const { setMember } = useAuth(); // sessionStorage 값 갱신 함수

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        login({
            email: data.email,
            password: data.password,
        }).then((response) => {
            setMember(response.data.data);
            navigate('/chats'); // 회원정보 저장 후 채팅방으로 이동
        }).catch((error) => {
            alert("로그인 실패");
            console.error(error);
        });
    };

    return (
        <div className='flex min-h-screen min-w-[37vw] justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center w-fit h-fit'>
                <img
                    src={logo}
                    alt="로고"
                    className="w-14 h-14 mb-7 self-start"
                />

                <label
                    htmlFor="email"
                    className="font-noto-sans-kr font-bold text-sm text-charcoal mb-2 self-start"
                >email</label>

                <div className="mb-4">
                    <input
                        id="email"
                        type="text"
                        className="w-64 h-10 rounded-lg border-[1px] border-charcoal"
                        {...register("email", {
                            required: "이메일을 입력해주세요",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                message: "유효한 이메일 주소를 입력해주세요",
                            }
                        })}
                    />
                    {errors.email && <AuthError errorMassage={errors.email.message}/>}
                </div>

                <label
                    htmlFor="password"
                    className="font-noto-sans-kr font-bold text-sm text-charcoal mb-2 self-start"
                >password</label>

                <div className="mb-4">
                    <input
                        id="password"
                        type="password"
                        className="w-64 h-10 rounded-lg border-[1px] border-charcoal"
                        {...register("password", {required: "비밀번호를 입력해주세요"})}
                    />
                    {errors.password && <AuthError errorMassage={errors.password.message}/>}
                </div>
                <Link
                    to='/find'
                    className='mb-7 text-sm font-noto-sans-kr font-bold underline text-lavender self-start'
                >*Forget password?</Link>
                <GrayButton name="Login"/>
            </form>
        </div>
    );
}

export default LoginForm;