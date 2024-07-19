import client from "./client";

interface ChatRoomsParams {// chatName, memberId 없이 검색하면 전체 채팅방 조회
    chatName?: string | null;
    memberId?: string | null;
}

export const readChatRooms = (body: ChatRoomsParams) => client.get('/rooms', { params: body });