import React, { useState, useEffect } from "react";
import axiosClient from "../../API/Config";
import Navbar from "../../Components/Navbar";
import Body from "../../Components/Body";
import { useNavigate } from "react-router-dom";

const OrderTable = () => {
  const navigate = useNavigate();
  const [orderItem, setOrderItems] = useState([]);
  //   const [totalPrice, setTotalPrice] = useState(0);

  const userId = JSON.parse(localStorage.getItem("user")).id;

  const user = JSON.parse(localStorage.getItem("user"));
  const url = "http://localhost:8080/api/product/file";

  // Lấy dữ liệu giỏ hàng từ API
  useEffect(() => {
    const fetchorderItem = async () => {
      try {
        // Giả sử bạn có một API cho việc lấy giỏ hàng của người dùng
        const response = await axiosClient.get(`/order/getOrder/${user.id}`);
        setOrderItems(response.data);
        // setTotalPrice(response.data.totalPrice);
      } catch (error) {
        console.error("Failed to fetch order items:", error);
      }
    };

    fetchorderItem();
  }, [orderItem]);

  console.log(orderItem);

  const handleBack = () => {
    navigate("/");
  };

  const handleStatus = (values) => {
    switch (values.status) {
      case 1:
        return <p>Chờ xác nhận...</p>;

      case 2:
        return (
          <>
            <button
              onClick={() => handleChange(values.id, 3)}
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

      case 3:
        return <p>Đã nhận</p>;

      case 4:
        return <p>Đã hủy</p>;
      default:
        break;
    }
  };

  const handleDetail = (id) => {
    navigate(`/order/detail/${id}`);
  };

  const handleChange = (orderId, newStatus) => {
    axiosClient
      .post(`/order/changestatus/${orderId}`, { status: newStatus })
      .then((response) => {
        // Cập nhật trạng thái của giỏ hàng trong state
        setOrderItems((prevCarts) =>
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

  return (
    <>
      <Navbar />
      <Body>
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">Đơn Hàng</h2>

          {orderItem != null ? (
            <>
              <table
                style={{ borderCollapse: "collapse" }}
                className="w-full border-collapse border border-gray-200 rounded-lg shadow-lg"
              >
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200">
                      Mã đơn hàng
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200">
                      Sản phẩm
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200">
                      Thành tiền
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200">
                      Địa chỉ
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200">
                      Thao tác
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200"></th>
                  </tr>
                </thead>
                <tbody>
                  {orderItem != null &&
                    orderItem.map((item) => (
                      <tr key={item}>
                        <td className="py-2 px-4 border-b border-gray-200 text-center">
                          {item.id}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {item.orderDetailResponses.length > 0 ? (
                            item.orderDetailResponses.map((item) => (
                              <>
                                <p style={{ marginRight: "10px" }}>
                                  <span style={{ color: "red" }}>
                                    Tên sản phẩm:
                                  </span>{" "}
                                  {item.productName}
                                </p>
                                <p style={{ marginRight: "10px" }}>
                                  <span style={{ color: "blueviolet" }}>
                                    Số lượng:
                                  </span>{" "}
                                  {item.qty}
                                </p>
                                <p style={{ marginRight: "10px" }}>
                                  <span style={{ color: "deeppink" }}>
                                    Giá:
                                  </span>{" "}
                                  {item.price}
                                </p>
                              </>
                            ))
                          ) : (
                            <>
                              <tr>
                                <td className="py-2 px-4 border-b"></td>
                                <td className="py-2 px-4 border-b">0</td>
                                <td className="py-2 px-4 border-b">0</td>
                              </tr>
                            </>
                          )}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-center">
                          {item.totalPrice} VND
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-center">
                          {item.address}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-center">
                          {handleStatus(item)}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDetail(item.id)}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                          >
                            Chi tiết
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <div className="mt-6">
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={handleBack}
                >
                  Quay lại trang chủ
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-bold" style={{ fontSize: "20px" }}>
                Bạn không có đơn hàng nào
              </h1>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
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

export default OrderTable;
