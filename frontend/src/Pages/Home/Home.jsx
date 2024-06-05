import React, { useEffect, useState } from "react";
import CardItem from "../../Components/Card";
import Navbar from "../../Components/Navbar";
import Body from "../../Components/Body";
import Banner from "../../Components/Banner";
import axiosClient from "../../API/Config";
import Pagination from "../../Components/panigation";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  // Dữ liệu mẫu cho các card items
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Kích thước trang
  const [totalItems, settotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await axiosClient.get("/product/", {
        params: {
          currentPage: currentPage - 1,
          pageSize,
        },
      });

      setData(data.data.product);
      settotalItems(data.data.totalItems);
      setTotalPages(data.data.totalPage);
    } catch (error) {
      console.log("Error");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const url = "http://localhost:8080/api/product/file";

  const handleCard = (id) => {
    navigate(`/productdetail/${id}`);
  };

  const [brand, setBrand] = useState([]);

  const fetchBrand = async () => {
    try {
      const data = await axiosClient.get("/brand/");
      setBrand(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBrand();
  }, []);

  return (
    <>
      <Navbar />
      <Body>
        <img src={url} alt="" />

        <Banner />
        {/* Hiển thị sản phẩm trên trang hiện tại */}
        <div className="container mx-auto py-8">
          <h1 className="text-center text-4xl mb-10 font-bold bg-green-400 py-5">
            Sản phẩm
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* Phân trang */}
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItem={totalItems}
            totalPage={totalPages}
            onPageChange={handlePageChange}
          />

          <h1 className="text-center text-4xl mb-10 font-bold bg-green-400 py-5 mt-10">
            Các hãng tài trợ
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brand.map((item, index) => (
              <img
                key={index}
                src={`${url}/${item.image}`}
                alt={item.brandName}
                className="w-full h-96 object-cover rounded-t-lg"
              />
            ))}
          </div>
        </div>

        {/* <h1 className="text-center "></h1> */}

        <div style={{ marginTop: "10px" }}>
          <Footer />
        </div>
      </Body>
    </>
  );
};

export default Home;
