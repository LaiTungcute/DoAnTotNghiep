import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-400">
            Trang chủ
          </Link>
        </div>
        <div className="space-x-4">
          {!isLoggedIn ? (
            <Link to="/login" className="text-white hover:text-gray-400">
              Đăng nhập
            </Link>
          ) : (
            <FontAwesomeIcon
              icon={faUserCircle}
              style={{ color: "white", fontSize: "25px" }}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
