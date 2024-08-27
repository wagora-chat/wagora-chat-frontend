import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { sendTempPassword } from "../../lib/api/auth";
import AuthError from "./AuthError";
import PurpleButton from "../button/PurpleButton";
import logo from "../../image/logo/forgot password_Logo_139x143.png";

interface FindPasswordFormInputs {
    email: string;
}

interface Props {
    setCompleted: (completed: boolean) => void;
}

const FindPasswordForm: React.FC<Props> = ({ setCompleted }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FindPasswordFormInputs>();

    const onSubmit: SubmitHandler<FindPasswordFormInputs> = (data) => {
        sendTempPassword({
            email: data.email,
        }).then((response) => {
            alert("이메일로 임시 비밀번호가 발급 되었습니다.");
            setCompleted(true);
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className='flex min-h-screen justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center w-fit h-fit'>
                <div className="flex flex-col justify-center items-center w-fit h-fit">
                    <img
                        src={logo}
                        alt="로고"
                        className="w-48 h-52 mb-4"
                    />
                    <div className="mb-4 font-noto-sans-kr font-black text-onyx text-3xl">
                        Forgot the password?
                    </div>
                    <div className="mb-12 font-noto-sans-kr font-light text-xl text-charcoal">
                        Please enter your email address<br/>to issue a temporary password.
                    </div>
                </div>
                <div className="mb-7 flex flex-col justify-center items-center w-fit h-fit">
                    <label
                        htmlFor="email"
                        className="font-noto-sans-kr font-bold text-sm text-charcoal mb-2 self-start"
                    >email*</label>
                    <input
                        id="email"
                        type="text"
                        {...register("email", {
                            required: "이메일을 입력해주세요",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                message: "유효한 이메일 주소를 입력해주세요",
                            }
                        })}
                        className="w-64 h-10 rounded-lg border-[1px] border-charcoal"
                    />
                    {errors.email && <AuthError errorMassage={errors.email.message} />}
                </div>

                <PurpleButton name="Enter" handleClick={() => {}} />
            </form>
        </div>
    );
}

export default FindPasswordForm;