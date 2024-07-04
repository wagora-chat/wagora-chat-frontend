import client from "./client";

interface ChatRoomsParams {
    chatName?: string | null;
    memberId?: string | null;
}

export const readChatRooms = (body: ChatRoomsParams) => client.get('/rooms', {params: body});