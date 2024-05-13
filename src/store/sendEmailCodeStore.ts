import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {sendEmailCode} from "../lib/api/auth";

interface UseSendEmailCodeStore {
    email: string;
    changeEmail: (email: string) => void;
    sendEmailCode: (email: string) => void;
}

const useSendEmailCodeStore = create<UseSendEmailCodeStore>()(
    devtools((set) => ({
            email: "",
            changeEmail: (email: string) => set({ email }),
            sendEmailCode: (email: string) => sendEmailCode({ email }),
        })
    )
);

export default useSendEmailCodeStore;