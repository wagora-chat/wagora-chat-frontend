import React, {useEffect, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../../lib/api/auth";

interface Member {
    nickname: string;
    profilePath: string;
}

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const memberStr = sessionStorage.getItem('member');
    let member: Member | null = null;

    if (memberStr) {
        try {
            member = JSON.parse(memberStr) as Member;
        } catch (e) {
            console.error('Error parsing member from sessionStorage', e);
        }
    }

    const handleToggleClick = () => { setIsOpen(!isOpen); }
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };
    const onLogout = () => {
        logout({
            nickname: member?.nickname
        }).then(r => {
            alert('로그아웃 되었습니다.')
            navigate('/')
        }).catch((error) => {
            alert('로그아웃 실패');
            console.log(error);
        })
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header
            className={'flex justify-between py-2 px-14'}>
            <Link
                className='text-xl font-bold p-2'
                to={'/chats'}
            >WAGORA</Link>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div
                        className='text-md font-bold cursor-pointer'
                        onClick={handleToggleClick}
                    >{member?.nickname}</div>
                    <img
                        className="w-10 h-10 rounded-full shadow-md"
                        src={member?.profilePath} alt="프로필"
                    />
                </div>

                {isOpen &&
                    <div
                        className="absolute right-14 p-2 mt-28 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        ref={menuRef}
                    >
                        <div
                            className="flex flex-col justify-center items-center gap-2"
                        >
                            <div
                                className={'cursor-pointer'}
                                onClick={onLogout}
                            >
                                로그아웃</div>
                            <div
                                className={'cursor-pointer'}
                                onClick={() => navigate('/mypage')}
                            >
                                마이페이지</div>
                        </div>
                    </div>
                }
            </div>
        </header>
    );
}

export default Header;