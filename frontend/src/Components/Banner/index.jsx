import React from "react";
import { useNavigate } from "react-router-dom";
// import Adidas from "../../imgs/AdidasUltra.png";

const Banner = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/product");
  };
  return (
    <div
      className="relative bg-cover bg-center h-96"
      style={{ backgroundImage: `url(/AdidasUltra.png)` }}
    >
      {/* <img src="../../imgs/AdidasUltra.png" alt="" /> */}
      {/* Overlay tối để tăng độ tương phản với nội dung */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Nội dung của banner */}
      <div className="relative flex flex-col items-center justify-center h-full text-white">
        {/* Tiêu đề */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Chào mừng đến với TSport Của Chúng Tôi
        </h1>

        {/* Mô tả */}
        <p className="text-lg md:text-xl mb-6">
          Khám phá những sản phẩm tuyệt vời của các hãng thể thao hàng đầu thế
          giới.
        </p>

        {/* Nút */}
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Tìm hiểu thêm
        </button>
      </div>
    </div>
  );
};

export default Banner;
