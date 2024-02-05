import Header from "@/components/AdminPanel/Header";
import Footer from "@/components/AdminPanel/Footer";
import Sidebar from "@/components/AdminPanel/sidebar";
import React, { useState } from "react"

const AdminLayout = ({ children }) => {


    return (
        <div>
            <div class="page">
                <div class="page-main">
                    <Header />
                    <div>
                        <Sidebar />
                        {children}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}


export default AdminLayout;