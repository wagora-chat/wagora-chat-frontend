import React, {ChangeEvent} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import useAuthStore from "../../store/authStore";
import {
    checkDuplicateEmail,
    checkDuplicateNickname,
    fileUpload,
    sendEmailCode,
    sendVerifyCode,
    signUp
} from "../../lib/api/auth";
import AuthError from "./AuthError";
import logo from "../../image/logo/modal_Logo_65x61.5.png";
import profileIcon from "../../image/icon/join_profile_110x110.png";
import plus from "../../image/icon/join_plus button_30x30.png";
import mail from "../../image/icon/join_mail button_30x30.png";
import check from "../../image/icon/join_check button_30x30.png";
import GrayButton from "../button/GrayButton";

interface FormData {
    email: string;
    verifyCode: string;
    nickname: string;
    password: string;
    checkPassword: string;
}

interface Props {
    setCompleted: (completed: boolean) => void;
}

const JoinForm: React.FC<Props> = ({ setCompleted }) => {
    const [checkEmail, setCheckEmail] = React.useState(false);
    const [checkNickname, setCheckNickname] = React.useState(false);
    const [checkVerifyCode, setCheckVerifyCode] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
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
        if (checkEmail && checkNickname && checkVerifyCode) { // 닉네임/이메일 중복 검사, 이메일 인증 여부 확인
            signUp({
                profile: path,
                email: data.email,
                nickname: data.nickname,
                password: data.password,
                checkPassword: data.checkPassword
            })
                .then(() => {
                    alert("회원가입 완료되었습니다 Let's make a Agora :)");
                    setCompleted(true);
                })
                .catch(() => alert("회원가입 실패"));
        } else alert('중복 검사 및 이메일 인증을 모두 완료해주세요');
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfile(file);
            handleSetProfile();
        }
    };

    const handleSetProfile = () => {
        fileUpload({file: profile})
            .then((response) => {
                alert("프로필 이미지가 설정되었습니다.");
                setPath(response.data.filePath); // 파일 전송 후 응답으로 받은 경로 저장
            })
            .catch(() => alert("파일 업로드 실패"));
    }

    const handleSendEmailCode = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        sendEmailCode({email})
            .then((response) => {
                if(response.status === 201) {
                    alert("인증 번호가 전송되었습니다.")
                }
            })
            .catch(() => alert("인증 실패"));
    }

    const handleCheckDuplicateEmail = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        checkDuplicateEmail({email})
            .then((response) => {
                if (!response.data.result) {
                    alert("사용 가능한 이메일입니다.");
                    setCheckEmail(true);
                } else {
                    setError("email", {type: "manual", message: "이미 사용 중인 이메일입니다."});
                }
            })
            .catch(() => alert("중복 검사 실패"));
    }

    const handleSendVerifyCode = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        sendVerifyCode({email}, {verifyCode})
            .then((response) => {
                if (response.status === 201) {
                    alert("인증 성공");
                    setCheckVerifyCode(true);
                }
            })
            .catch(() => alert("인증 번호를 다시 입력해주세요"));
    }

    const handleCheckDuplicateNickname = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        checkDuplicateNickname({nickname})
            .then((response) => {
                if (!response.data.result) {
                    alert("사용 가능한 이름입니다.");
                    setCheckNickname(true);
                } else {
                    setError("nickname", {type: "manual", message: "이미 사용 중인 이름입니다."});
                }
            })
            .catch(() => alert("중복 검사 실패"));
    }

    return (
        <div className="flex min-h-screen min-w-[37vw] justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col justify-center items-center w-fit h-fit">
                <img
                    src={logo}
                    alt="로고"
                    className="w-14 h-14 self-start"
                />

                <div className="relative mb-5">
                    <label htmlFor="profile">
                        <img
                            src={plus}
                            alt="프로필"
                            className="w-7 h-7 absolute right-0 top-0 cursor-pointer"
                        />
                    </label>

                    {path && <img
                        src={path}
                        alt="프로필"
                        className="w-28 h-28 rounded-full"
                    />}
                    {!path && <img
                        src={profileIcon}
                        alt="프로필"
                        className="w-28 h-28 rounded-full"
                    />}

                    <input
                        id="profile"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e)}
                        className="w-64 hidden"
                    />
                </div>

                <label
                    htmlFor="email"
                    className="font-noto-sans-kr font-bold text-sm text-charcoal mb-2 self-start"
                >email*</label>
                <div className="relative mb-2">
                    <input
                        id="email"
                        type="email"
                        disabled={checkEmail}
                        {...register("email", {
                            required: "이메일을 입력해주세요",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                message: "유효한 이메일 주소를 입력해주세요",
                            },
                        })}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-64 h-10 rounded-lg border-[1px] border-charcoal"
                    />
                    {checkEmail &&
                        <div>
                            <div className="text-center font-noto-sans-kr font-light text-xs text-charcoal mb-2">
                                Click on the icon and the code will be emailed<br/>Please check your mailbox
                            </div>
                            <button
                                className="absolute right-1 top-1 hover:opacity-50 h-8 w-8"
                                onClick={(e) => handleSendEmailCode(e)} // 이메일 인증 번호 전송 코드 넣기
                            >
                                <img
                                    src={mail}
                                    alt="메일"
                                    className="h-8 w-8"
                                />
                            </button>
                        </div>
                    }
                    {!checkEmail &&
                        <button
                            className="absolute right-1 top-1 hover:opacity-50 h-8 w-8"
                            onClick={(e) => handleCheckDuplicateEmail(e)}
                        >
                            <img
                                src={check}
                                alt="체크"
                                className="h-8 w-8"
                            />
                        </button>
                    }
                    {errors.email && <AuthError errorMassage={errors.email.message}/>}
                </div>

                <label
                    htmlFor="verify"
                    className="font-noto-sans-kr font-bold text-sm text-charcoal mb-2 self-start"
                >email confirm code*</label>
                <div className="relative mb-2">
                <input
                        id="verify"
                        type="text"
                        disabled={checkVerifyCode}
                        {...register("verifyCode", {required: "인증번호를 입력해주세요"})}
                        className="w-64 h-10 rounded-lg border-[1px] border-charcoal"
                        onChange={(e) => setVerifyCode(e.target.value)}
                    />
                    <button
                        className="absolute right-1 top-1 hover:opacity-50 h-8 w-8"
                        onClick={(e) => handleSendVerifyCode(e)}
                    >
                        <img
                            src={check}
                            alt="체크"
                            className="h-8 w-8"
                        />
                    </button>
                    {errors.verifyCode && <AuthError errorMassage={errors.verifyCode.message}/>}
                </div>

                <label
                    htmlFor="nickname"
                    className="font-noto-sans-kr font-bold text-sm text-charcoal mb-2 self-start"
                >username*</label>
                <div className="relative mb-2">
                    <input
                        id="nickname"
                        type="text"
                        disabled={checkNickname}
                        {...register("nickname", {required: "닉네임을 입력해주세요"})}
                        className="w-64 h-10 rounded-lg border-[1px] border-charcoal"
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <button
                        className="absolute right-1 top-1 hover:opacity-50 h-8 w-8"
                        onClick={(e) => handleCheckDuplicateNickname(e)}
                    >
                        <img
                            src={check}
                            alt="체크"
                            className="h-8 w-8"
                        />
                    </button>
                    {errors.nickname && <AuthError errorMassage={errors.nickname.message}/>}
                </div>

                <label
                    htmlFor="password"
                    className="font-noto-sans-kr font-bold text-sm text-charcoal mb-2 self-start"
                >password*</label>
                <div className="mb-2">
                    <input
                        id="password"
                        type="password"
                        {...register("password", {required: "비밀번호를 입력해주세요"})}
                        className="w-64 h-10 rounded-lg border-[1px] border-charcoal"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    {errors.password && <AuthError errorMassage={errors.password.message}/>}
                </div>

                <label
                    htmlFor="checkPassword"
                    className="font-noto-sans-kr font-bold text-sm text-charcoal mb-2 self-start"
                >confirm password*</label>
                <div className="mb-4">
                    <input
                        id="checkPassword"
                        type="password"
                        {...register("checkPassword", {
                            required: "비밀번호 확인을 입력해주세요",
                            validate: (value) => value === password || "비밀번호가 일치하지 않습니다",
                        })}
                        className="w-64 h-10 rounded-lg border-[1px] border-charcoal"
                    />
                    {errors.checkPassword && <AuthError errorMassage={errors.checkPassword.message}/>}
                </div>

                <GrayButton name="Join"/>
            </form>
        </div>
    );
};

export default JoinForm;