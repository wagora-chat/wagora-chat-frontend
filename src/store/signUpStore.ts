import {sendEmailCode, signUp} from "../lib/api/auth";
import {devtools} from "zustand/middleware";
import {create} from "zustand";

interface UseSignUpStore {
    body: {
        "profile": string,
        "nickname": string,
        "email": string,
        "password": string,
        "checkPassword": string
    };
    submitForm: (body: UseSignUpStore['body']) => void;
    signUp: (body: UseSignUpStore['body']) => void;
}

const useSignUpStore = create<UseSignUpStore>()(
    devtools((set) => ({
        body: {
            profile: '',
            nickname: '',
            email: '',
            password: '',
            checkPassword: '',
        },
        submitForm: (body) => set({ body }),
        signUp: (body) => signUp({ body }),
    }))
);

export default useSignUpStore;