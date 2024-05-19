import React, { useEffect, useState } from "react";
import axiosClient from "../../API/Config";
import Body from "../../Components/Body";
import Navbar from "../../Components/Navbar";
import * as Yup from "yup"; // Thư viện để xác thực form
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

function Transaction() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userInfo, setUserInfo] = useState({
    address: "",
    receiver: "",
    phoneNumber: "",
  });
  const [cartId, setCarId] = useState(0);

  const [payment, setPayment] = useState("");

  const fetchPayment = async (values) => {};

  const navigate = useNavigate();

  // Xác thực form với Yup
  const validationSchema = Yup.object({
    address: Yup.string().required("Địa chỉ là bắt buộc"),
    receiver: Yup.string().required("Người nhận là bắt buộc"),
    phoneNumber: Yup.string().required("Số điện thoại là bắt buộc"),
  });

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
        setCarId(response.data.id);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, [cartItems]);

  const handleBack = () => {
    navigate("/order");
  };

  const handleSubmit = async (values) => {
    // // setUserInfo();
    // fetchPayment(values);
    // console.log(values);
    // window.location.href = payment;
    // console.log(payment);
    try {
      const response = await axiosClient.get("/payment", {
        params: {
          cartId: cartId,
          address: values.address,
          receiver: values.receiver,
          phoneNumber: values.phoneNumber,
        },
      });
      const paymentUrl = response.data;
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Body>
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Thông tin đơn hàng</h1>
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
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6">
            <Formik
              initialValues={{ address: "", receiver: "", phoneNumber: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    address:
                  </label>
                  <Field
                    id="address"
                    name="address"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="receiver"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Người nhận:
                  </label>
                  <Field
                    type="text"
                    id="receiver"
                    name="receiver"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="receiver"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Số điện thoại:
                  </label>
                  <Field
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Thanh toán
                </button>

                <button
                  className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleBack}
                >
                  Hủy
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </Body>
    </>
  );
}

export default Transaction;
