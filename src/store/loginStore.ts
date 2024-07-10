import {create} from "zustand";
import {devtools} from "zustand/middleware";

interface LoginState {
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (email: string) => void;
}

const useLoginStore = create<LoginState>()(
    devtools((set) => ({
    email: '',
    password: '',
    setEmail: (email: string) => set({ email }),
    setPassword: (email: string) => set({ password: email }),
})));

export default useLoginStore;