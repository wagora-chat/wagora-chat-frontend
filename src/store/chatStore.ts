import {create} from "zustand";
import ChatRoom from "../components/chat/ChatRoom";

interface ChatRoom {
    id: number,
    name: string,
    color: string,
    memberCount: string,
    createdAt: string,
}

interface ChatStore {
    chatName: string | null,
    memberId: string | null,
    chatRoomList: ChatRoom[],
    setChatName: (chatMember: string) => void,
    setMemberId: (chatName: string) => void,
    setChatRoomList: (chatRoomList: ChatRoom[]) => void,
}

const useChatStore = create<ChatStore>((set) => ({
    chatName: null,
    memberId: null,
    chatRoomList: [],
    setChatName: (chatName: string) => set({ chatName }),
    setMemberId: (memberId: string) => set({ memberId }),
    setChatRoomList: (chatRoomList: ChatRoom[]) => set({ chatRoomList: chatRoomList }),
}));

export default useChatStore;