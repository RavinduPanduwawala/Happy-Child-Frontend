import React from "react";
import SideBar from "../components/sidebar";

// Authenticated Layout = After Login
const NonAuthLayout = ({children}) => {
    return (
        <div style={{ display: "flex" }}>
            <SideBar />
            <div style={{ flex: 1, backgroundImage: "url('https://www.shutterstock.com/image-photo/hands-holding-green-happy-smile-600nw-2060680337.jpg')", backgroundSize: 'cover' }} className="px-4 pt-5">{children}</div>
        </div>
    )
}

export default NonAuthLayout