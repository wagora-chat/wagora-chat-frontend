import React from "react";
import {Link} from "react-router-dom";
import useLoginStore from "../store/loginStore";
import {login} from "../lib/api/auth";

const LoginForm: React.FC = () => {
    const {
        email,
        password,
        setEmail,
        setPassword,
    } = useLoginStore();

    return (
        <div
            className={'flex min-h-screen justify-center items-center'}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    login({
                        email,
                        password,
                    }).then((response) => {
                        console.log('로그인 성공');
                        sessionStorage.setItem('member', JSON.stringify(response.data));
                    })
                        .catch((error) => {
                        console.error(error);
                    })
                }
            }
                className={'flex flex-col justify-center items-center w-96 h-96 border-2 gap-2'}
            >
                <label htmlFor="email">이메일</label>
                <input
                    id={'email'}
                    type="text"
                    className={'border-2'}
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                />

                <label htmlFor="password">비밀 번호</label>
                <input
                    id={'password'}
                    type="password"
                    className={'border-2'}
                    onChange={(e) => {setPassword(e.target.value)}}
                />

                <button
                    className='border-2 border-gray-300 hover:bg-gray-400'
                >로그인</button>
                <Link
                    className={'text-xs text-gray-500'}
                    to={'/'}
                >비밀번호 찾기</Link>
            </form>
        </div>
    );
}

export default LoginForm;