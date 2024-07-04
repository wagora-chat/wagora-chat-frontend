import React from "react";
import SearchBar from "./SearchBar";
import ChatRoomList from "./ChatRoomList";

const ChatRoomListTemplate: React.FC = () => {
    return (
        <div>
            <SearchBar />
            <ChatRoomList />
        </div>
    );
}

export default ChatRoomListTemplate;