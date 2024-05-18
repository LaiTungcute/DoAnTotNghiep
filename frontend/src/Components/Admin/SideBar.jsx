import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h1 className="text-xl font-bold mb-4">Quản lý cửa hàng</h1>
      <nav>
        <ul>
          <li>
            <Link to="/admin" className="block py-2">
              Quản lý sản phẩm
            </Link>
          </li>
          <li>
            <Link to="/admin/order" className="block py-2">
              Quản lý đơn hàng
            </Link>
          </li>
          <li>
            <Link to="/customers" className="block py-2">
              Quản lý khách hàng
            </Link>
          </li>
          <li>
            <Link to="/revenue" className="block py-2">
              Báo cáo
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
