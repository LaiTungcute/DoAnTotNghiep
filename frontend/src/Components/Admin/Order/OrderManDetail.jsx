import React, { useState, useEffect } from "react";
import axiosClient from "../../../API/Config";
import { useNavigate, useParams } from "react-router-dom";

const OrderManDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const userId = JSON.parse(localStorage.getItem("user")).id;

  const user = JSON.parse(localStorage.getItem("user"));
  const url = "http://localhost:8080/api/product/file";

  // Lấy dữ liệu giỏ hàng từ API
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        // Giả sử bạn có một API cho việc lấy giỏ hàng của người dùng
        const response = await axiosClient.get(`/order/${id}`);
        setOrderItems(response.data.orderDetailResponses);
        setTotalPrice(response.data.totalPrice);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchOrderItems();
  }, [orderItems]);

  const handleBack = () => {
    navigate("/admin/order");
  };

  return (
    <>
      <div
        className="container mx-auto p-6"
        style={{ height: "calc(100vh - 112px)", overflowY: "auto" }}
      >
        <h2 className="text-2xl font-bold mb-4">Đơn hàng chi tiết</h2>

        {orderItems != null ? (
          <>
            <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Sản phẩm
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">Giá</th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Số lượng
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderItems != null &&
                  orderItems.map((item) => (
                    <tr key={item}>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <div className="flex items-center">
                          <img
                            src={`${url}/${item.image}`}
                            alt={item.productName}
                            className="w-12 h-12 object-cover rounded-lg mr-4"
                          />
                          <span>{item.productName}</span>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {item.price} VND
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {item.qty}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {item.price * item.qty} VND
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="mt-6">
              <h3 className="text-xl font-semibold">
                Tổng tiền: {totalPrice} VND
              </h3>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={handleBack}
              >
                Quay lại
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-bold" style={{ fontSize: "20px" }}>
              Giỏ hàng của bạn không có mặt hàng nào
            </h1>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleBack}
            >
              Quay lại trang chủ
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default OrderManDetail;
