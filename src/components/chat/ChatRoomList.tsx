import React, {useEffect} from "react";
import {readChatRooms} from "../../lib/api/chat";
import useChatStore from "../../store/chatStore";
import ChatRoom from "./ChatRoom";

interface ChatRoomData {
    color: string
    name: string,
    memberCount: string,
}

const ChatRoomList: React.FC = () => {
    const {
        chatRoomList,
        setChatRoomList,
    } = useChatStore();

    useEffect(() => {
        readChatRooms({})
            .then(r => {
                setChatRoomList(r.data);
        })
            .catch(() => alert('채팅방을 불러오지 못 했습니다.'));
    }, []);

    return (
        <div>
            {
                chatRoomList.map((chatRoom: ChatRoomData) => (
                    <ChatRoom roomColor={chatRoom.color} roomName={chatRoom.name} memberCount={chatRoom.memberCount} />
                ))
            }
        </div>
    );
}

export default ChatRoomList;