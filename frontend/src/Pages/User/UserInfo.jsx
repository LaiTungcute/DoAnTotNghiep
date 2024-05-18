import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Body from "../../Components/Body";

const UserInfoPage = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/login");
    localStorage.clear();
  };

  return (
    <>
      <Navbar />
      <Body>
        <div className="p-6">
          <h1 className="text-3xl font-semibold mb-6">Thông Tin Người Dùng</h1>

          {userInfo ? (
            <div className="bg-white p-4 rounded shadow-md">
              {/* Hiển thị thông tin người dùng */}
              <div className="mb-4">
                <p className="mt-1 text-gray-800 font-medium">
                  Tên: {userInfo.username}
                </p>
              </div>

              <div className="mb-4">
                <p className="mt-1 text-gray-800">Email: {userInfo.email}</p>
              </div>

              <div className="mb-4">
                <p className="mt-1 text-gray-800">
                  Số điện thoại:
                  {userInfo.phoneNumber}
                </p>
              </div>

              <button
                onClick={handleLogOut}
                className="w-full px-4 py-2 bg-red-400 text-white font-bold rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Đăng xuất
              </button>

              {/* Thêm các trường thông tin khác theo nhu cầu */}
            </div>
          ) : (
            <p>Đang tải thông tin người dùng...</p>
          )}
        </div>
      </Body>
    </>
  );
};

export default UserInfoPage;
