import React, {createContext, ReactNode, useContext } from "react";
import useSessionStorage from "../hooks/useSessionStorage";

interface Member {
    data: {
        nickname: string;
        accessToken: string;
        profilePath: string;
    }
}

interface AuthContextType {
    member: Member | null;
    setMember: (member: Member | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {// AuthContext 사용을 위한 커스텀 훅
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used as an AuthContext');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [member, setMember] = useSessionStorage<Member>('member', null); // sessionStorage 값(회원 정보), sessionStorage 갱신 함수

    return (
        <AuthContext.Provider value={{ member, setMember }}>
            {children}
        </AuthContext.Provider>
    );
};