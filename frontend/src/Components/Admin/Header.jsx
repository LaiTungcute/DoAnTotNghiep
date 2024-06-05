import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const handleLogOut = () => {
    localStorage.clear();
  };
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-end items-center">
        <Link to="/login" onClick={handleLogOut}>
          Đăng xuất
        </Link>
      </div>
    </header>
  );
}

export default Header;
