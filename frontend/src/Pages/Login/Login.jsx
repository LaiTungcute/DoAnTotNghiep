import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Thư viện để xác thực form
import "tailwindcss/tailwind.css"; // Đảm bảo Tailwind CSS đã được import
import Body from "../../Components/Body";
import "./Login.scss";
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Xác thực form với Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Email là bắt buộc"),
    password: Yup.string().required("Mật khẩu là bắt buộc"),
  });

  // Hàm xử lý form khi được gửi
  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      const datas = unwrapResult(resultAction);

      navigate("/");
    } catch (error) {
      // showToast(error.message, "error");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <Navbar />
      <Body>
        <div className="login_container">
          <div className="bg-white p-8 rounded shadow-lg w-80">
            <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username:
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
                  Đăng nhập
                </button>

                <p className="text-center m-1.5">Bạn đã có tài khoản?</p>
                <button
                  onClick={handleRegister}
                  type="button"
                  className="w-full px-4 py-2 bg-green-400 text-white font-bold rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Đăng ký
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </Body>
    </>
  );
};

export default Login;
