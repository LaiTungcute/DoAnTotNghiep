import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axiosClient from "../../API/Config";
import "tailwindcss/tailwind.css";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

const RevenueReport = () => {
  // Trạng thái cho dữ liệu, ngày bắt đầu/kết thúc, và các biến khác
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Lấy dữ liệu từ API backend
  const fetchData = async () => {
    try {
      const response = await axiosClient.get("/revenue", {
        params: { startDate, endDate },
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Gọi API mỗi khi ngày bắt đầu/kết thúc thay đổi
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  // Dữ liệu cho biểu đồ
  const chartData = {
    labels: data.map((item) => item.totalRevenue), // Thời gian cho trục x
    datasets: [
      {
        label: "Doanh thu",
        data: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4"], // Doanh thu cho trục y
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category", // Đảm bảo sử dụng loại thang đo danh mục cho trục x
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4"],
      },
      y: {
        type: "linear", // Đảm bảo sử dụng loại thang đo tuyến tính cho trục y
        beginAtZero: true,
      },
    },
  };

  // Render giao diện
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Báo cáo doanh thu</h1>

      {/* Bộ lọc thời gian */}
      <div className="mb-4">
        <label className="mr-2">Từ ngày:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mr-4 p-2 border rounded"
        />

        <label className="mr-2">Đến ngày:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="mb-6">
        <Line data={chartData} options={options} />
      </div>

      {/* Bảng dữ liệu doanh thu */}
      <div>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Ngày</th>
              <th className="border p-2">Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.date}>
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">{item.totalRevenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueReport;
