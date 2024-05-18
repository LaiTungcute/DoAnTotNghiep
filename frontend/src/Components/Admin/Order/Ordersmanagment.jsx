import React, { useState, useEffect } from "react";
import Pagination from "../../panigation";
import axiosClient from "../../../API/Config";
// import ProductFormModal from "./ProductFormModal";

function OrderManagment() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Kích thước trang
  const [totalItems, settotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    try {
      const res = await axiosClient.get("/order", {
        params: {
          currentPage: currentPage - 1,
          pageSize,
        },
      });

      setData(res.data.order);
      console.log(data);
      settotalItems(res.data.totalItems);
      setTotalPages(res.data.totalPage);
    } catch (error) {
      console.log("Error");
    }
  };

  const handleChange = (orderId, newStatus) => {
    axiosClient
      .post(`/order/changestatus/${orderId}`, { status: newStatus })
      .then((response) => {
        // Cập nhật trạng thái của giỏ hàng trong state
        setData((prevCarts) =>
          prevCarts.map((cart) => {
            if (cart.id === orderId) {
              return { ...cart, status: newStatus };
            }
            return cart;
          })
        );
      })
      .catch((error) => {
        console.error("Error updating cart status:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const url = "http://localhost:8080/api/product/file";

  // Hàm chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div
      className="p-4"
      style={{ height: "calc(100vh - 116px)", overflowY: "auto" }}
    >
      <h2 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h2>

      {/* Bảng liệt kê sản phẩm */}
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100">Người dùng</th>
            <th className="py-2 px-4 bg-gray-100">Mã giỏ hàng</th>
            {/* <th className="py-2 px-4 bg-gray-100">Tên sản phẩm</th>
            <th className="py-2 px-4 bg-gray-100">Số lượng</th>
            <th className="py-2 px-4 bg-gray-100">Giá</th> */}
            <th className="py-2 px-4 bg-gray-100">Sản phẩm</th>
            <th className="py-2 px-4 bg-gray-100">Trạng thái</th>
            {/* <th className="py-2 px-4 bg-gray-100">Hành động</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.username}</td>
              <td className="py-2 px-4 border-b">{order.id}</td>
              {order.orderDetailResponses.length > 0 ? (
                order.orderDetailResponses.map((item) => (
                  <>
                    <p style={{ marginRight: "10px" }}>
                      <span style={{ color: "red" }}>Tên sản phẩm:</span>{" "}
                      {item.productName}
                    </p>
                    <p style={{ marginRight: "10px" }}>
                      <span style={{ color: "blueviolet" }}>Số lượng:</span>{" "}
                      {item.qty}
                    </p>
                    <p style={{ marginRight: "10px" }}>
                      <span style={{ color: "deeppink" }}>Giá:</span>{" "}
                      {item.price}
                    </p>
                  </>
                ))
              ) : (
                <>
                  <tr>
                    <table>
                      <tr>
                        <td className="py-2 px-4 border-b"></td>
                        <td className="py-2 px-4 border-b">0</td>
                        <td className="py-2 px-4 border-b">0</td>
                      </tr>
                    </table>
                  </tr>
                </>
              )}
              <td className="py-2 px-4 border-b">
                <select
                  id="status"
                  name="status"
                  value={order.status}
                  onChange={(e) => handleChange(order.id, e.target.value)}
                  className="mt-1 p-2 w-full border rounded"
                  required
                >
                  <option value="1">Đang đặt hàng</option>
                  <option value="2">Đã đặt hàng</option>
                  <option value="3">Đã hủy</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItem={totalItems}
        totalPage={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default OrderManagment;
