import React from "react";
import person from "../../image/icon/mian_chat member icon_11x12.png";

interface Props {
    roomColor: string,
    roomName: string,
    memberCount: string,
}

const ChatRoom: React.FC<Props> = ({roomColor, roomName, memberCount}) => {
    return (
        <div
            className='flex items-center justify-between h-14'
        >
            <div
                className='w-1/5 flex items-center justify-start h-full'
            >
                {roomColor === "bubblegum" ? <div className="mr-14 border-2 border-bubblegum bg-bubblegum w-4 h-full rounded-br-xl rounded-tr-xl"></div> : null}
                {roomColor === "peach" ? <div className="mr-14 border-2 border-peach bg-peach w-4 h-full  rounded-br-xl rounded-tr-xl"></div> : null}
                {roomColor === "sunny" ? <div className="mr-14 border-2 border-sunny bg-sunny w-4 h-full  rounded-br-xl rounded-tr-xl"></div> : null}
                {roomColor === "teal" ? <div className="mr-14 border-2 border-teal bg-teal w-4 h-full  rounded-br-xl rounded-tr-xl"></div> : null}
                {roomColor === "sky" ? <div className="mr-14 border-2 border-sky bg-sky w-4 h-full  rounded-br-xl rounded-tr-xl"></div> : null}
                {roomColor === "periwinkle" ? <div className="mr-14 border-2 border-periwinkle bg-periwinkle w-4 h-full  rounded-br-xl rounded-tr-xl"></div> : null}

                <div className="mr-5 font-noto-sans-kr font-medium text-xl text-onyx w-28 h-8 truncate">
                    {roomName}
                </div>
                <img
                    src={person}
                    alt="사람"
                    className="w-4 h-4"
                />
                <div className="font-noto-sans-kr font-normal text-md text-charcoal">
                    {memberCount}
                </div>
            </div>

            <div
                onClick={() => alert("아직 준비중입니다.")}
                className="w-full h-full border-b-2 border-gray-200 flex items-center justify-between hover:bg-gray-200 cursor-pointer"
            >
                <div className="max-w-2xl ml-8 font-noto-sans-kr font-light text-lg text-charcoal truncate">와고라 너무 좋네요 인정합니다.</div>
                <div className="mr-72 font-noto-sans-kr font-light text-lg text-charcoal">PM 15:54</div>
            </div>
        </div>
    );
}

export default ChatRoom;