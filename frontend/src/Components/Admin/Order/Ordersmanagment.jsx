import React, { useState, useEffect } from "react";
import Pagination from "../../panigation";
import axiosClient from "../../../API/Config";
import { useNavigate } from "react-router-dom";
// import ProductFormModal from "./ProductFormModal";

function OrderManagment() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Kích thước trang
  const [totalItems, settotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axiosClient.get("/order", {
        params: {
          currentPage: currentPage - 1,
          pageSize: pageSize,
        },
      });

      setData(res.data.order);
      console.log(data);
      settotalItems(res.data.totalItems);
      setTotalPages(res.data.totalPages);
      console.log(totalItems);
      console.log(totalPages);
    } catch (error) {
      console.log("Error");
    }
  };

  const handleDetail = (id) => {
    navigate(`/admin/orderDetail/${id}`);
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

  const handleStatus = (values) => {
    switch (values.status) {
      case 1:
        return (
          <>
            <button
              onClick={() => handleChange(values.id, 2)}
              className="mr-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Xác nhận
            </button>
            <button
              onClick={() => handleChange(values.id, 4)}
              className="mr-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Hủy
            </button>
          </>
        );

      case 2:
        return <p>Đã giao</p>;

      case 3:
        return <p>Đã nhận</p>;

      case 4:
        return <p>Đã hủy</p>;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, totalItems]);

  const url = "http://localhost:8080/api/product/file";

  // Hàm chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div
      className="p-4"
      style={{ height: "calc(100vh - 112px)", overflowY: "auto" }}
    >
      <h2 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h2>

      {/* Bảng liệt kê sản phẩm */}
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100">Người dùng</th>
            <th className="py-2 px-4 bg-gray-100">Mã đơn hàng</th>
            <th className="py-2 px-4 bg-gray-100">Sản phẩm</th>
            <th className="py-2 px-4 bg-gray-100">Trạng thái</th>
            <th className="py-2 px-4 bg-gray-100"></th>
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
                        <td className="py-2 px-4 border-b"></td> <br />
                        <td className="py-2 px-4 border-b">0</td> <br />
                        <td className="py-2 px-4 border-b">0</td> <br />
                      </tr>
                    </table>
                  </tr>
                </>
              )}
              <td className="py-2 px-4 border-b">{handleStatus(order)}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDetail(order.id)}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Chi tiết
                </button>
              </td>
              {/* c */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      {
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItem={totalItems}
          totalPage={totalPages}
          onPageChange={handlePageChange}
        />
      }
    </div>
  );
}

export default OrderManagment;
