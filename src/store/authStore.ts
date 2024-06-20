import create from 'zustand';

interface AuthState {
    profile: File | null;
    path: string | null;
    email: string;
    nickname: string;
    password: string;
    verifyCode: string;
    setProfile: (profile: File) => void;
    setPath: (path: string) => void;
    setEmail: (email: string) => void;
    setNickname: (nickname: string) => void;
    setPassword: (email: string) => void;
    setVerifyCode: (verifyCode: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    profile: null,
    path: null,
    email: '',
    nickname: '',
    password: '',
    verifyCode: '',
    setProfile: (profile) => set({ profile }),
    setPath: (path) => set({ path }),
    setEmail: (email) => set({ email }),
    setNickname: (nickname) => set({ nickname }),
    setPassword: (email) => set({ password: email }),
    setVerifyCode: (verifyCode: string) => set({ verifyCode }),
}));

export default useAuthStore;