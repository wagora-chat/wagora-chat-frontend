import {Routes, Route} from "react-router-dom";
import React from "react";
import MainPage from "./pages/MainPage";
import ChatRoomListPage from "./pages/ChatRoomListPage";
import MainLayout from "./components/layout/main/MainLayout";
import FindPasswordPage from "./pages/FindPasswordPage";
import {AuthProvider} from "./context/AuthContext";
import ProtectedRoute from "./route/ProtectedRoute";
import SubLayout from "./components/layout/sub/SubLayout";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'find'} element={
                    <SubLayout>
                        <FindPasswordPage/>
                    </SubLayout>
                }/>
                <Route path={'/chats'} element={
                    <ProtectedRoute>
                        <MainLayout>
                            <ChatRoomListPage/>
                        </MainLayout>
                    </ProtectedRoute>}
                />
            </Routes>
        </AuthProvider>
    );
};

export default App;
