import React, {ChangeEvent} from "react";
import useAuthStore from "../store/authStore";
import {CheckDuplicateEmail, CheckDuplicateNickname, fileUpload, signUp} from "../lib/api/auth";

const JoinForm: React.FC = () => {
    const [checkDuplicateNickname, setCheckDuplicateNickname] = React.useState<boolean>(true);
    const [checkDuplicateEmail, setCheckDuplicateEmail] = React.useState<boolean>(true);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfile(file);
        }
    };

    const {
        profile,
        path,
        email,
        nickname,
        password,
        checkPassword,
        setProfile,
        setPath,
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
                    signUp(
                        {
                            path,
                            email,
                            nickname,
                            password,
                            checkPassword
                        }
                    ).then((response) => {
                        alert('회원가입 완료');
                    })
                        .catch(() => alert('회원가입 실패'));
                }}
                className='flex flex-col justify-center items-center w-96 h-96 border-2'
            >

                <div>
                    <label htmlFor="profile">프로필</label>
                    <input
                        id="profile"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <button
                        className='border-2 border-gray-300 hover:bg-gray-400'
                        disabled={!profile}
                        onClick={(e) => {
                            e.preventDefault();
                            fileUpload({file: profile}).then((response) => {
                            alert('프로필 이미지가 설정되었습니다.');
                            setPath(response.data);
                        })
                            .catch(() => alert('파일 업로드 실패'));
                        }}
                    >프로필 등록</button>
                </div>

                <div>
                    <div>
                        <label htmlFor="email">이메일</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            readOnly={!checkDuplicateEmail}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className='border-2 border-gray-300 hover:bg-gray-400'
                            onClick={(e) => {
                                e.preventDefault();
                                CheckDuplicateEmail({email : email}).then((response) => {
                                    if(response.data.result) {
                                        alert("사용 가능한 이메일입니다.");
                                        setCheckDuplicateEmail(false);
                                    }
                                    else alert("이미 사용 중인 이메일입니다.");
                                })
                                    .catch(() => alert("중복 검사 실패"));
                            }}
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
                        readOnly={!checkDuplicateNickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <button
                        className='border-2 border-gray-300 hover:bg-gray-400'
                        onClick={(e) => {
                            e.preventDefault();
                            CheckDuplicateNickname({nickname: nickname}).then((response) => {
                                if(response.data.result) {
                                    alert("사용 가능한 이름입니다.");
                                    setCheckDuplicateNickname(false);
                                }
                                else alert("이미 사용 중인 이름입니다.");
                            })
                                .catch(() => alert("중복 검사 실패"));
                        }}
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
                    disabled={checkDuplicateNickname && checkDuplicateEmail}
                >회원가입</button>
            </form>
        </div>
    );
}

export default JoinForm;