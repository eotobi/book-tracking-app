import React from "react";
import Helmet from "next/head";

const Layout = ({ children }) => {
    return (
        <>
            <Helmet>
                <title>Books Tracking App</title>
            </Helmet>
            <div className="container my-3">
                {children}
            </div>
        </>
    );

};

export default Layout;