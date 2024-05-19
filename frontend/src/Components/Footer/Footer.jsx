import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">Giới thiệu</h4>
            <p>
              TSport là cửa hàng chuyên giới thiệu, tư vấn và bán các sản phẩm
              liên quan tới thể thao
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Liên hệ</h4>
            <ul>
              <li>Email: TSport@gmail.com.vn</li>
              <li>Số điện thoại: 0392385673975</li>
              <li>Địa chỉ: Phố Nguyên Xá, Nhổn, Bắc Từ Liêm, Hà Nội</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Sản phẩm</h4>
            <ul>
              <li>
                <Link to="/" className="text-white hover:underline">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/product" className="text-white hover:underline">
                  Sản phẩm
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p>&copy; 2024 TSport company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
