import React, {useState} from "react";
import Logo from "../../image/logo/home_Logo_198x209.png";
import ReversePurpleButton from "../button/ReversePurpleButton";
import JoinForm from "../auth/JoinForm";
import LoginForm from "../auth/LoginForm";
import AuthModal from "../modal/AuthModal";
import AuthCompleteBox from "../auth/AuthCompleteBox";

const MainTemplate: React.FC = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isJoinOpen, setIsJoinOpen] = useState(false);
    const [completed, setCompleted] = useState(false);

    const openLoginModal = () => {
        setIsLoginOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginOpen(false);
    };

    const openJoinModal = () => {
        setIsJoinOpen(true);
    };

    const closeJoinModal = () => {
        setIsJoinOpen(false);
    };

    return (
        <div
            className={'flex min-h-screen justify-center items-center bg-ice'}
        >
            <div
                className={'flex flex-col justify-center items-center w-1/2 h-1/2'}
            >
                <img
                    src={Logo} alt="로고"
                    className="w-48 h-52 mb-7"
                />

                <div
                    className="mb-5 text-5xl font-black font-noto-sans-kr"
                >WAGORA</div>

                <div
                    className="mb-9 text-sm font-noto-sans-kr font-light text-center"
                >와고라는 이용자에게 자유로운 아고라를 제공하여<br/> 많은 사람들이 보다 쉽게 다양한 모임을 가질 수 있도록 돕습니다.</div>

                <div className="flex flex-col justify-center items-center gap-4">
                    <ReversePurpleButton
                        handleClick={openLoginModal}
                        name="Login"
                    />
                    <ReversePurpleButton
                        handleClick={openJoinModal}
                        name="Join"/>
                </div>
            </div>

            <AuthModal isOpen={isLoginOpen} onClose={closeLoginModal}>
                <LoginForm />
            </AuthModal>
            <AuthModal isOpen={isJoinOpen} onClose={closeJoinModal}>
                {!completed && <JoinForm setCompleted={setCompleted}/>}
                {completed && <AuthCompleteBox />}
            </AuthModal>
        </div>
    );
}

export default MainTemplate;