import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const handleChange = () => {
    navigate("/");
  };
  return (
    <>
      <div className="font-bold text-3xl">
        Bạn không đủ quyền để vào trang này
      </div>
      <button
        onClick={() => handleChange()}
        className="mr-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Về trang chủ
      </button>
    </>
  );
};

export default Error;
