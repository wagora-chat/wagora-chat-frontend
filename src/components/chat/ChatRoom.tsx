import React from "react";

interface Props {
    roomColor: string,
    roomName: string,
    memberCount: string,
}

const ChatRoom: React.FC<Props> = ({roomColor, roomName, memberCount}) => {
    return (
        <div
            className='flex items-center justify-between p-4'
        >
            <div
                className='flex items-center justify-center gap-2'
            >
                <div>{roomColor}</div>
                <div>{roomName}</div>
                <div>{memberCount}</div>
            </div>

            <div>
                마지막 채팅
            </div>

            <div>
                마지막 채팅 시간
            </div>
        </div>
    );
}

export default ChatRoom;