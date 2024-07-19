import JoinPage from "./pages/JoinPage";
import {Routes, Route} from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ChatRoomListPage from "./pages/ChatRoomListPage";
import Layout from "./components/layout/Layout";
import FindPasswordPage from "./pages/FindPasswordPage";
import {AuthProvider} from "./context/AuthContext";
import ProtectedRoute from "./route/ProtectedRoute";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'find'} element={<FindPasswordPage/>} />
                <Route path={'/join'} element={<JoinPage/>}/>
                <Route path={'/chats'} element={
                    <ProtectedRoute>
                        <Layout>
                            <ChatRoomListPage/>
                        </Layout>
                    </ProtectedRoute>}
                />
            </Routes>
        </AuthProvider>
    );
};

export default App;
