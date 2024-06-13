import create from 'zustand';

interface AuthState {
    profile: File | null;
    path: string
    email: string;
    nickname: string;
    password: string;
    checkPassword: string;
    setProfile: (profile: File) => void;
    setPath: (path: string) => void;
    setEmail: (email: string) => void;
    setNickname: (nickname: string) => void;
    setPassword: (password: string) => void;
    setCheckPassword: (checkPassword: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    profile: null,
    path: '',
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
    setProfile: (profile) => set({ profile }),
    setPath: (path) => set({ path }),
    setEmail: (email) => set({ email }),
    setNickname: (nickname) => set({ nickname }),
    setPassword: (password) => set({ password }),
    setCheckPassword: (checkPassword) => set({ checkPassword }),
}));

export default useAuthStore;