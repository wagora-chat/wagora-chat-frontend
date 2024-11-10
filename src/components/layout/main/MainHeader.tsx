import React, {useEffect, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../../../lib/api/auth";
import {useAuth} from "../../../context/AuthContext";
import logo from "../../../image/logo/text_logo_100x31.png";
import profile from "../../../image/icon/join_profile_110x110.png";

const MainHeader: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false); // 모달 상태
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const {member} = useAuth();

    const handleToggleClick = () => {
        setIsOpen(!isOpen);
    }
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) { // menuRef 요소 이외의 영역 클릭 시 모달 창 닫기
            setIsOpen(false);
        }
    };

    const handleLogout = () => {
        logout({
            nickname: member?.data.nickname
        }).then(r => {
            alert('로그아웃 되었습니다.')
            navigate('/')
        }).catch((error) => {
            alert('로그아웃 실패');
            console.log(error);
        })
    }

    useEffect(() => {
        // 컴포넌트가 마운트될 때 mousedown(마우스 클릭) 이벤트 리스너를 추가하고, 언마운트될 때 제거
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className='flex justify-between py-3 px-14'>
            <Link
                to='/chats'
            >
                <img
                    src={logo}
                    alt="로고"
                    className="w-28 h-9"
                />
            </Link>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div
                        className='mr-2 font-noto-sans-kr font-bold text-lg text-charcoal cursor-pointer'
                        onClick={handleToggleClick}
                    >{member?.nickname}</div>
                    {
                        member?.profilePath ?
                            <img
                                src={member.profilePath}
                                alt="프로필"
                                className="w-9 h-9 rounded-full"
                            />
                            :
                            <img
                                src={profile}
                                alt="프로필"
                                className="w-9 h-9 rounded-full"
                            />
                    }
                </div>

                {isOpen &&
                    <div
                        className="absolute right-14 p-2 mt-28 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        ref={menuRef}
                    >
                        <div
                            className="flex flex-col justify-center items-center gap-2 font-noto-sans-kr font-normal text-lg"
                        >
                            <div
                                className='cursor-pointer hover:text-charcoal'
                                onClick={handleLogout}
                            >
                                로그아웃
                            </div>
                            <div
                                className={'cursor-pointer hover:text-charcoal'}
                                onClick={() => navigate('/mypage')}
                            >
                                마이페이지
                            </div>
                        </div>
                    </div>
                }
            </div>
        </header>
    );
}

export default MainHeader;