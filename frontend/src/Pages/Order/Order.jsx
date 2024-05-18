import React, { useState, useEffect } from "react";
import axiosClient from "../../API/Config";
import Navbar from "../../Components/Navbar";
import Body from "../../Components/Body";

const OrderTable = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const userId = JSON.parse(localStorage.getItem("user")).id;

  const user = JSON.parse(localStorage.getItem("user"));
  const url = "http://localhost:8080/api/product/file";

  // Lấy dữ liệu giỏ hàng từ API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Giả sử bạn có một API cho việc lấy giỏ hàng của người dùng
        const response = await axiosClient.get(`/order/${user.id}`);
        setCartItems(response.data.orderDetailResponses);
        setTotalPrice(response.data.totalPrice);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, [cartItems]);

  // Xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = async (orderId) => {
    try {
      // Giả sử bạn có một API để xóa sản phẩm khỏi giỏ hàng
      await axiosClient.delete(`/order/delete/${userId}/${orderId}`);
      // Cập nhật lại dữ liệu giỏ hàng
      setCartItems(
        cartItems.filter((item) => item.orderDetailResponses.id !== orderId)
      );
      setTotalPrice(
        totalPrice -
          cartItems.find((item) => item.orderDetailResponses.id === orderId)
            .price *
            cartItems.find((item) => item.orderDetailResponses.id === orderId)
              .qty
      );
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Body>
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">Giỏ Hàng</h2>

          <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b border-gray-200">Sản phẩm</th>
                <th className="py-2 px-4 border-b border-gray-200">Giá</th>
                <th className="py-2 px-4 border-b border-gray-200">Số lượng</th>
                <th className="py-2 px-4 border-b border-gray-200">
                  Thành tiền
                </th>
                <th className="py-2 px-4 border-b border-gray-200">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
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
                    {item.price.toLocaleString()} VND
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {item.qty}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {(item.price * item.qty).toLocaleString()} VND
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-lg"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">
              Tổng tiền: {totalPrice.toLocaleString()} VND
            </h3>
            {/* Nút thanh toán giỏ hàng */}
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
              Thanh Toán
            </button>
          </div>
        </div>
      </Body>
    </>
  );
};

export default OrderTable;
