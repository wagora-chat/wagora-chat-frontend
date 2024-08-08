import React from "react";
import MainHeader from "./MainHeader";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <MainHeader />
            <main>{children}</main>
        </div>
    );
}

export default MainLayout;