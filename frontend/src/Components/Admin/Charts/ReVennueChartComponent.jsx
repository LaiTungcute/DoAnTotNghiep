import React, { useEffect, useState } from "react";
import axiosClient from "../../../API/Config";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from "recharts";

const ReVennueChartComponent = () => {
  const [data, setData] = useState([]);

  const [startDate, setStartDate] = useState("2024-05-01");
  const [endDate, setEndDate] = useState("2024-05-31");
  let totalPrice = data.reduce(
    (init, current) => init + current.totalRevenue,
    0
  );
  let totalOrder = data.reduce((init, current) => init + current.orderCount, 0);

  const fetchStatistics = async () => {
    try {
      const formattedStartDate =
        startDate && new Date(startDate).toISOString().split("T")[0];
      const formattedEndDate =
        endDate && new Date(endDate).toISOString().split("T")[0];
      const res = await axiosClient.get("/order/revenue/daily", {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });
      setData(res.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div
      className="p-4"
      style={{ height: "calc(100vh - 112px)", overflowY: "auto" }}
    >
      <h1 className="text-center font-bold text-3xl mb-10">Thống kê</h1>
      <div className="mb-10">
        <input
          className="mt-4 px-4 py-2 rounded-lg mr-10 border-2"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          className="mt-4 px-4 py-2 rounded-lg mr-10 border-2 mx-10"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg mr-10"
          onClick={fetchStatistics}
        >
          Tìm kiếm
        </button>
      </div>

      <div className="mb-10 text-center font-bold text-2xl flex">
        <div className="bg-purple-300 text-slate-700 p-2 w-60 rounded-md mx-10">
          <h1>Tổng doanh thu</h1>
          <h1>{totalPrice.toLocaleString("vi-VN")} VND</h1>
        </div>

        <div className="bg-purple-300 text-slate-700 p-2 w-56 rounded-md">
          <h1>Tổng số đơn hàng</h1>
          <h1>{totalOrder} đơn</h1>
        </div>
      </div>

      {data && (
        <LineChart width={800} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" domain={[startDate, endDate]} />
          <YAxis
            dataKey="orderCount"
            axisLine={{
              stroke: "#007bff",
              strokeWidth: 2,
              strokeDashArray: [5, 5],
            }}
          />
          <Line
            type="monotone"
            dataKey="orderCount"
            stroke="#8884d8"
            name="Số đơn hàng"
          />
          <Tooltip />
        </LineChart>
      )}

      <h1
        className="font-bold text-2xl mt-10 mb-20 text-center"
        style={{ width: "800px" }}
      >
        Bảng thống kê tổng số đơn hàng
      </h1>

      {data && (
        <LineChart
          width={800}
          height={300}
          data={data}
          title="Bảng thống kê doanh thu"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" domain={[startDate, endDate]} />
          <YAxis
            dataKey="totalRevenue"
            tickFormatter={(value) => {
              if (value >= 1000000 && value < 1000000000) {
                return `${value / 1000000}M`;
              } else if (value >= 1000000000) {
                return `${value / 1000000000}B`;
              } else {
                return `${value}`;
              }
            }}
            axisLine={{
              stroke: "#007bff",
              strokeWidth: 2,
              strokeDashArray: [5, 5],
            }}
          />
          <Line
            type="monotone"
            dataKey="totalRevenue"
            stroke="#82ca9d"
            name="Doanh thu"
          />
          <Tooltip />
        </LineChart>
      )}
      <h1
        className="font-bold text-2xl my-10 text-center"
        style={{ width: "800px" }}
      >
        Bảng thống kê tổng doanh thu
      </h1>
    </div>
  );
};

export default ReVennueChartComponent;
