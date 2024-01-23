

import Header from "@/components/Employee/Header";
import Footer from "@/components/Employee/Footer";
import Sidebar from "@/components/Employee/sidebar";
import React from "react";

const EmployeeLayout = ({ children }) => {


  return (
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
  );
}

export default EmployeeLayout;