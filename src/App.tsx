import JoinPage from "./pages/JoinPage";
import {Routes, Route} from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainPage/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>
            <Route path={'/join'} element={<JoinPage/>}/>
        </Routes>
    );
};

export default App;
