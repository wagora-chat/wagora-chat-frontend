import React from "react";
import useAuthStore from "../store/authStore";
import {signUp} from "../lib/api/auth";

const JoinForm: React.FC = () => {
    const {
        profile,
        email,
        nickname,
        password,
        checkPassword,
        setProfile,
        setEmail,
        setNickname,
        setPassword,
        setCheckPassword,
    } = useAuthStore();

    return (
        <div className='flex min-h-screen justify-center items-center border-2'>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log({
                        profile,
                        email,
                        nickname,
                        password,
                        checkPassword
                    })
                    signUp(
                        {
                            profile,
                            email,
                            nickname,
                            password,
                            checkPassword
                        }
                    ).then((response) => {
                        console.log('회원가입 성공:', response.data);
                    })
                        .catch((error) => {
                            if (error.response) {
                                // 서버 응답이 2xx 이외의 상태 코드인 경우
                                console.error('회원가입 실패:', error.response.data);
                            } else if (error.request) {
                                // 요청이 만들어졌지만 응답을 받지 못한 경우
                                console.error('응답 없음:', error.request);
                            } else {
                                // 요청을 설정하는 동안 오류가 발생한 경우
                                console.error('요청 설정 오류:', error.message);
                            }
                        });
                }}
                className='flex flex-col justify-center items-center w-96 h-96 border-2'
            >

                <div>
                    <label htmlFor="profile">프로필</label>
                    <input
                        id="profile"
                        type="file"
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}
                    />
                    <button
                        className='border-2 border-gray-300 hover:bg-gray-400'
                        onClick={() => {alert('파일 업로드 API 호출 예정')}}
                    >프로필 등록</button>
                </div>

                <div>
                    <div>
                        <label htmlFor="email">이메일</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className='border-2 border-gray-300 hover:bg-gray-400'
                            onClick={() => {alert('중복검사 API 호출 예정')}}
                        >중복 검사
                        </button>
                    </div>
                    <button className='border-2 border-gray-300 hover:bg-gray-400'>이메일 인증하기</button>
                </div>

                <div>
                    <label htmlFor="nickname">유저 네임</label>
                    <input
                        id="nickname"
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <button
                        className='border-2 border-gray-300 hover:bg-gray-400'
                        onClick={() => {alert('중복검사 API 호출 예정')}}
                    >중복 검사</button>
                </div>

                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="checkPassword">비밀번호 확인</label>
                    <input
                        id="checkPassword"
                        type="password"
                        value={checkPassword}
                        onChange={(e) => setCheckPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className='border-2 border-gray-300 hover:bg-gray-400'
                >회원가입</button>
            </form>
        </div>
    );
}

export default JoinForm;