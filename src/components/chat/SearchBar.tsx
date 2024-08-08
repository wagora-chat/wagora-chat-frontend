import React, {ChangeEvent, useState} from "react";
import chatPlus from "../../image/icon/main_make chatroom button_35x35.png";
import magnifier from "../../image/icon/main_search icon_21x22.png";

const SearchBar: React.FC = () => {
    const [searchType, setSearchType] = useState('Agoraname');
    const [query, setQuery] = useState('');

    const handleSearchTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchType(event.target.value);
    };

    return (
        <div
            className='w-full h-12 bg-lavender flex justify-center items-center'
        >
            <div className="flex mr-2 w-3/5 h-8 relative">
                <div className="flex items-center">
                    <select
                        value={searchType}
                        onChange={handleSearchTypeChange}
                        className="h-full w-44 pl-7 font-noto-sans-kr font-medium text-lg text-charcoal rounded-l-lg focus:outline-none"
                    >
                        <option value="Agoraname">Agoraname</option>
                        <option value="username">Username</option>
                    </select>
                </div>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full h-full rounded-r-lg"
                />
                <img
                    src={magnifier}
                    alt="돋보기"
                    className="w-5 h-5 absolute top-1.5 right-4"
                />
            </div>

            <button>
                <img
                    src={chatPlus}
                    alt="채팅방 만들기"
                    className="h-8 w-8"
                />
            </button>
        </div>
    );
}

export default SearchBar;