import React from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";
import ProductManagement from "./Products/ProductManagment";

function Dashboard({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        {/* <ProductManagement /> */}
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
