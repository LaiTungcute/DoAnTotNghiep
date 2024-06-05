import React, { useEffect, useState } from "react";
import CardItem from "../../Components/Card";
import Navbar from "../../Components/Navbar";
import Body from "../../Components/Body";
import axiosClient from "../../API/Config";
import Pagination from "../../Components/panigation";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

const ProductList = () => {
  // Dữ liệu mẫu cho các card items
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Kích thước trang
  const [totalItems, settotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const userId = JSON.parse(localStorage.getItem("user")).id;

  const [categoryNames, setCategoryNames] = useState([]);
  const [brandNames, setBrandNames] = useState([]);

  const [product, setProduct] = useState({
    productName: null,
    categoryName: null,
    brandName: null,
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await axiosClient.get("/product/", {
        params: {
          currentPage: currentPage - 1,
          pageSize,
          productName: product.productName,
          categoryName: product.categoryName,
          brandName: product.brandName,
        },
      });

      setData(data.data.product);
      settotalItems(data.data.totalItems);
      setTotalPages(data.data.totalPage);
    } catch (error) {
      console.log("Error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, product]);

  const url = "http://localhost:8080/api/product/file";

  const handleCard = (id) => {
    if (!userId) {
      navigate("/error");
    } else {
      navigate(`/productdetail/${id}`);
    }
  };

  const fetchCategoryNames = async () => {
    try {
      const data = await axiosClient.get("/category/");

      setCategoryNames(data.data);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    fetchCategoryNames();
  }, []);

  const fetchBrandNames = async () => {
    try {
      const data = await axiosClient.get("/brand/");

      setBrandNames(data.data);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    fetchBrandNames();
  }, []);

  return (
    <>
      <Navbar />
      <Body>
        <img src={url} alt="" />

        <div className="relative bg-cover bg-center bg-lime-300 h-20 my-2 py-2">
          <input
            type="text"
            name="productName"
            placeholder="Sản phẩm"
            className="mt-1 p-2 w-80 border-2 rounded mx-10"
            value={product.productName}
            onChange={handleChange}
          />
          <select
            name="categoryName"
            id=""
            onChange={handleChange}
            className="mt-1 p-2 w-80 border-2 rounded mx-10 cursor-pointer"
          >
            <option value="">Chọn loại hàng</option>
            {categoryNames.map((item, index) => (
              <option key={item.categoryId} value={item.categoryName}>
                {item.categoryName}
              </option>
            ))}
          </select>

          <select
            name="brandName"
            id=""
            onChange={handleChange}
            className="mt-1 p-2 w-80 border-2 rounded cursor-pointer"
          >
            <option value="">Chọn thương hiệu</option>
            {brandNames.map((item, index) => (
              <option key={item.brandId} value={item.brandName}>
                {item.brandName}
              </option>
            ))}
          </select>
        </div>
        {/* Hiển thị sản phẩm trên trang hiện tại */}
        <div className="container mx-auto py-8">
          {/* Lưới (grid) chứa các card items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tạo một card item cho mỗi phần tử trong dữ liệu mẫu */}
            {data.map((item, index) => (
              <CardItem
                key={index}
                image={`${url}/${item.image}`}
                title={item.productName}
                price={item.price}
                onButtonClick={() => handleCard(item.productId)}
              />
            ))}
          </div>
        </div>

        {/* Phân trang */}
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItem={totalItems}
          totalPage={totalPages}
          onPageChange={handlePageChange}
        />
        <div style={{ marginTop: "10px" }}>
          <Footer />
        </div>
      </Body>
    </>
  );
};

export default ProductList;
