import React, { useEffect, useState } from "react";
import Pagination from "../Components/panigation";
import axiosClient from "../API/Config";
import CardItem from "../Components/Card";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // Kích thước trang
  const [totalItems, settotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    try {
      const data = await axiosClient.get("/product/", {
        params: {
          currentPage,
          pageSize,
        },
      });

      setData(data.data.product);
      settotalItems(data.data.totalItem);
      setTotalPages(data.data.totalPages);
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

  const url = axiosClient.getUri("/product/file");

  const handleCard = () => {
    console.log("abc");
  };

  return (
    <div>
      {/* Hiển thị sản phẩm trên trang hiện tại */}
      <div className="container mx-auto py-8">
        {/* Lưới (grid) chứa các card items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tạo một card item cho mỗi phần tử trong dữ liệu mẫu */}
          {data.map((item, index) => (
            <CardItem
              key={index}
              image={`${url}/{${item.image}}`}
              title={item.productName}
              price={item.price}
              onButtonClick={handleCard}
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
    </div>
  );
};

export default ProductList;
