import React, { useState, useEffect } from "react";
import axiosClient from "../../API/Config";
import Navbar from "../../Components/Navbar";
import Body from "../../Components/Body";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const CartTable = () => {
  const navigate = useNavigate();
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
        const response = await axiosClient.get(`/cart/${user.id}`);
        setCartItems(response.data.cartItemResponses);
        setTotalPrice(response.data.totalPrice);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, [cartItems]);

  console.log(cartItems);

  // Xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = async (cartId) => {
    try {
      // Giả sử bạn có một API để xóa sản phẩm khỏi giỏ hàng
      await axiosClient.delete(`/cart/delete/${userId}/${cartId}`);
      // Cập nhật lại dữ liệu giỏ hàng
      setCartItems(
        cartItems.filter((item) => item.cartItemResponses.id !== cartId)
      );
      setTotalPrice(
        totalPrice -
          cartItems.find((item) => item.cartItemResponses.id === cartId).price *
            cartItems.find((item) => item.cartItemResponses.id === cartId).qty
      );
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleTrans = () => {
    navigate("/transaction");
  };

  return (
    <>
      <Navbar />
      <Body>
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">Giỏ Hàng</h2>

          {cartItems != null ? (
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
                    <th className="py-2 px-4 border-b border-gray-200">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems != null &&
                    cartItems.map((item) => (
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
                  Tổng tiền: {totalPrice} VND
                </h3>
                {/* Nút thanh toán giỏ hàng */}
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleTrans}
                >
                  Thanh Toán
                </button>
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleBack}
                >
                  Quay lại trang chủ
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
      </Body>
    </>
  );
};

export default CartTable;
