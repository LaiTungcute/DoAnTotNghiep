import React from "react";
import CardItem from "../../Components/Card";
import Navbar from "../../Components/Navbar";
import Body from "../../Components/Body";
import Banner from "../../Components/Banner";
import axiosClient from "../../API/Config";

const Home = () => {
  // Dữ liệu mẫu cho các card items
  const url = `http://localhost:8080/api/brand/file/lg1.png`;
  console.log(url);

  const cardData = [
    {
      image: "https://via.placeholder.com/300",
      title: "Item 1",
      description: "Mô tả cho item 1.",
      onButtonClick: () => alert("Thực hiện hành động cho item 1"),
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Item 2",
      description: "Mô tả cho item 2.",
      onButtonClick: () => alert("Thực hiện hành động cho item 2"),
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Item 2",
      description: "Mô tả cho item 2.",
      onButtonClick: () => alert("Thực hiện hành động cho item 2"),
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Item 2",
      description: "Mô tả cho item 2.",
      onButtonClick: () => alert("Thực hiện hành động cho item 2"),
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Item 2",
      description: "Mô tả cho item 2.",
      onButtonClick: () => alert("Thực hiện hành động cho item 2"),
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Item 2",
      description: "Mô tả cho item 2.",
      onButtonClick: () => alert("Thực hiện hành động cho item 2"),
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Item 2",
      description: "Mô tả cho item 2.",
      onButtonClick: () => alert("Thực hiện hành động cho item 2"),
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Item 2",
      description: "Mô tả cho item 2.",
      onButtonClick: () => alert("Thực hiện hành động cho item 2"),
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Item 2",
      description: "Mô tả cho item 2.",
      onButtonClick: () => alert("Thực hiện hành động cho item 2"),
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Item 2",
      description: "Mô tả cho item 2.",
      onButtonClick: () => alert("Thực hiện hành động cho item 2"),
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Item 2",
      description: "Mô tả cho item 2.",
      onButtonClick: () => alert("Thực hiện hành động cho item 2"),
    },
    // Thêm các card item khác...
  ];

  return (
    <>
      <Navbar />
      <Body>
        <img src={url} alt="" />

        <Banner />
        <div className="container mx-auto py-8">
          {/* Lưới (grid) chứa các card items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tạo một card item cho mỗi phần tử trong dữ liệu mẫu */}
            {cardData.map((item, index) => (
              <CardItem
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
                onButtonClick={item.onButtonClick}
              />
            ))}
          </div>
        </div>
      </Body>
    </>
  );
};

export default Home;
