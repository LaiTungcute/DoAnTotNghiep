import React, { useEffect, useState } from "react";
import CardItem from "../../Components/Card";
import Navbar from "../../Components/Navbar";
import Body from "../../Components/Body";
import Banner from "../../Components/Banner";
import axiosClient from "../../API/Config";
import Pagination from "../../Components/panigation";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <Navbar />
      <Body>
        <img src={url} alt="" />

        <Banner />
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
      </Body>
    </>
  );
};

export default Home;
