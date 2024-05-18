import React, { useEffect, useState } from "react";
import axiosClient from "../../API/Config";
import { useNavigate, useParams } from "react-router-dom";
import Body from "../../Components/Body";
import Navbar from "../../Components/Navbar";

function ProductDetail() {
  const { id } = useParams();
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const navigate = useNavigate();

  const url = "http://localhost:8080/api/product/file";
  const [data, setData] = useState({
    productId: 0,
    productName: "",
    description: "",
    price: 0,
    image: "",
    qty: 0,
    gender: "",
  });
  const fetchData = async () => {
    try {
      const response = await axiosClient.get(`/product/${id}`, { id });

      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error");
    }
  };

  const handleBuy = async (productId) => {
    try {
      await axiosClient.post("/order/create", {
        userId,
        productId: productId,
        quantity: 1,
        price: data.price,
      });

      navigate("/order");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar />
      <Body>
        <div className=" mx-auto p-8 flex justify-between">
          {/* Phần hình ảnh sản phẩm */}
          <div className="mb-4 w-96">
            <img
              src={`${url}/${data.image}`}
              alt={data.productName}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Phần thông tin sản phẩm */}
          <div className="space-y-6 w-2/4">
            {/* Tên sản phẩm */}
            <h1 className="text-3xl font-bold">{data.productName}</h1>

            {/* Giá sản phẩm */}
            <p className="text-2xl text-green-500">Giá: {data.price}</p>

            {/* Số lượng sản phẩm */}
            <p className="text-lg">Số lượng: {data.qty}</p>

            {/* Giới tính */}
            <p className="text-lg">Giới tính: {data.gender}</p>

            {/* Danh mục */}
            <p className="text-lg">Danh mục: {data.categoryName}</p>

            {/* Thương hiệu */}
            <p className="text-lg">Thương hiệu: {data.brandName}</p>

            {/* Mô tả sản phẩm */}
            <p className="text-gray-700">{data.description}</p>

            {/* Nút mua hàng */}
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={() => handleBuy(data.productId)}
            >
              Mua hàng
            </button>
          </div>
        </div>
      </Body>
    </div>
  );
}

export default ProductDetail;