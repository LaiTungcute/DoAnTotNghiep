import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "tailwindcss/tailwind.css";
import Body from "../../Components/Body";
import Navbar from "../../Components/Navbar";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import userApi from "../../API/UserApi";
import Toast from "../../Components/Toast";

const Register = () => {
  //toast
  const [toast, setToast] = useState(null);
  // Hàm kích hoạt thông báo
  const showToast = (message, type) => {
    setToast({ message, type });
    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Xác thực form với Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    password: Yup.string().required("Mật khẩu là bắt buộc"),
    phoneNumber: Yup.string().required("Số điện thoại là bắt buộc"),
    username: Yup.string().required("Người dùng là bắt buộc"),
  });

  // Hàm xử lý form khi được gửi
  const handleSubmit = async (values) => {
    try {
      const data = await userApi.register(values);
      const message = data.data;
      showToast(message, "success");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  return (
    <>
      <Navbar />
      <Body>
        <div className="register_container">
          <div className="bg-white p-8 rounded shadow-lg w-80">
            <h1 className="text-2xl font-bold mb-6 text-center">Đăng ký</h1>
            <Formik
              initialValues={{
                username: "",
                phoneNumber: "",
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên người dùng:
                  </label>
                  <Field
                    id="username"
                    name="username"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email:
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="email"
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

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật khẩu:
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Đăng ký
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </Body>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default Register;
