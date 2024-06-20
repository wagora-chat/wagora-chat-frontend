import React, { ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuthStore from "../store/authStore";
import { checkDuplicateEmail, checkDuplicateNickname, fileUpload, sendVerifyCode, signUp } from "../lib/api/auth";
import AuthError from "./AuthError";

interface FormData {
    email: string;
    verifyCode: string;
    nickname: string;
    password: string;
    checkPassword: string;
}

const JoinForm: React.FC = () => {
    const [checkEmail, setCheckEmail] = React.useState(false);
    const [checkNickname, setCheckNickname] = React.useState(false);
    const [checkVerifyCode, setCheckVerifyCode] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm<FormData>();

    const {
        profile,
        path,
        email,
        nickname,
        password,
        verifyCode,
        setProfile,
        setPath,
        setEmail,
        setNickname,
        setPassword,
        setVerifyCode,
    } = useAuthStore();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        if(checkEmail && checkNickname && checkVerifyCode) {
            signUp({ path, email: data.email, nickname: data.nickname, password: data.password, checkPassword: data.checkPassword })
                .then(() => {
                    alert("회원가입 완료");
                })
                .catch(() => alert("회원가입 실패"));
        }
        else alert('중복 검사 및 이메일 인증을 모두 완료해주세요');
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfile(file);
        }
    };

    return (
        <div className="flex min-h-screen justify-center items-center border-2">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center w-96 h-[42rem] border-2 gap-8">
                <label htmlFor="profile">프로필</label>
                <input id="profile" type="file" accept="image/*" onChange={handleFileChange} />
                <button
                    className="border-2 border-gray-300 hover:bg-gray-400"
                    disabled={!profile}
                    onClick={(e) => {
                        e.preventDefault();
                        fileUpload({ file: profile })
                            .then((response) => {
                                alert("프로필 이미지가 설정되었습니다.");
                                setPath(response.data);
                            })
                            .catch(() => alert("파일 업로드 실패"));
                    }}
                >
                    프로필 등록
                </button>

                <div>
                    <label htmlFor="email">이메일</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "이메일을 입력해주세요",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                message: "유효한 이메일 주소를 입력해주세요",
                            },
                        })}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2"
                    />
                    <button
                        className="border-2 border-gray-300 hover:bg-gray-400"
                        onClick={(e) => {
                            e.preventDefault();
                            checkDuplicateEmail({ email })
                                .then((response) => {
                                    if (response.data.result) {
                                        alert("사용 가능한 이메일입니다.");
                                        setCheckEmail(true);
                                    } else {
                                        setError("email", { type: "manual", message: "이미 사용 중인 이메일입니다." });
                                    }
                                })
                                .catch(() => alert("중복 검사 실패"));
                        }}
                    >
                        중복 검사
                    </button>
                    {errors.email && <AuthError errorMassage={errors.email.message}/>}
                </div>
                <button className="border-2 border-gray-300 hover:bg-gray-400">이메일 인증하기</button>

                <div>
                    <label htmlFor="verify">인증번호</label>
                    <input
                        id="verify"
                        type="text"
                        {...register("verifyCode", { required: "인증번호를 입력해주세요" })}
                        className="border-2"
                        onChange={(e) => setVerifyCode(e.target.value)}
                    />
                    <button
                        className="border-2 border-gray-300 hover:bg-gray-400"
                        onClick={(e) => {
                            e.preventDefault();
                            sendVerifyCode({ email }, { verifyCode })
                                .then((response) => {
                                    if (response.data.email === email) {
                                        alert("인증 성공");
                                        setCheckVerifyCode(true);
                                    }
                                    else alert("인증 번호를 다시 입력해주세요");
                                })
                                .catch((error) => {
                                    console.log("에러 발생", error);
                                });
                        }}
                    >
                        인증번호 확인
                    </button>
                    {errors.verifyCode && <AuthError errorMassage={errors.verifyCode.message}/>}
                </div>

                <div>
                    <label htmlFor="nickname">유저 네임</label>
                    <input
                        id="nickname"
                        type="text"
                        {...register("nickname", { required: "닉네임을 입력해주세요" })}
                        className="border-2"
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <button
                        className="border-2 border-gray-300 hover:bg-gray-400"
                        onClick={(e) => {
                            e.preventDefault();
                            checkDuplicateNickname({ nickname })
                                .then((response) => {
                                    if (response.data.result) {
                                        alert("사용 가능한 이름입니다.");
                                        setCheckNickname(true);
                                    } else {
                                        setError("nickname", { type: "manual", message: "이미 사용 중인 이름입니다." });
                                    }
                                })
                                .catch(() => alert("중복 검사 실패"));
                        }}
                    >
                        중복 검사
                    </button>
                    {errors.nickname && <AuthError errorMassage={errors.nickname.message}/>}
                </div>

                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", { required: "비밀번호를 입력해주세요" })}
                        className="border-2"
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    {errors.password && <AuthError errorMassage={errors.password.message}/>}
                </div>

                <div>
                    <label htmlFor="checkPassword">비밀번호 확인</label>
                    <input
                        id="checkPassword"
                        type="password"
                        {...register("checkPassword", {
                            required: "비밀번호 확인을 입력해주세요",
                            validate: (value) => value === password || "비밀번호가 일치하지 않습니다",
                        })}
                        className="border-2"
                    />
                    {errors.checkPassword && <AuthError errorMassage={errors.checkPassword.message} />}
                </div>

                <button type="submit" className="border-2 border-gray-300 hover:bg-gray-400">
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default JoinForm;