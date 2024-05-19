import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Body from "../../Components/Body";
import Navbar from "../../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

const TransactionResult = () => {
  const [message, setMessage] = useState("Đang xử lý kết quả thanh toán...");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(
          `http://localhost:8080/api/payment/payment-callback${location.search}`
        );
        const result = "Thanh toán thành công";
        setMessage(result);
        setIcon(faCheckCircle);
        setColor("green");
      } catch (error) {
        setMessage("Có lỗi xảy ra khi xử lý kết quả thanh toán.");
        setIcon(faXmarkCircle);
        setColor("red");
        console.error("Error handling payment result:", error);
      }
    };

    fetchData();
  }, [location]);

  return (
    <>
      <Navbar />
      <Body>
        <div className="flex flex-col justify-center h-screen">
          <FontAwesomeIcon
            icon={icon}
            style={{ fontSize: "50px", color: `${color}` }}
          />
          <p className="text-center font-bold text-3xl">{message}</p>
        </div>
      </Body>
    </>
  );
};

export default TransactionResult;
