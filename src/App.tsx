import JoinPage from "./pages/JoinPage";
import {Routes, Route} from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ChatRoomListPage from "./pages/ChatRoomListPage";
import Layout from "./components/layout/Layout";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainPage/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>
            <Route path={'/join'} element={<JoinPage/>}/>
            <Route path={'/chats'} element={<Layout><ChatRoomListPage/></Layout>}/>
        </Routes>
    );
};

export default App;
