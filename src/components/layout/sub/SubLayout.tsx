import React from "react";
import SubHeader from "./SubHeader";

const SubLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <SubHeader/>
            <main>{children}</main>
        </div>
    );
}

export default SubLayout;