import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState(null);

  // useEffect(() => {
    // Gọi API để lấy dữ liệu
  //   axios.get("http://localhost:8080/api/v1/accounts/ratio-by-position")
  //     .then((response) => {
  //       const data = response.data;

  //       // Chuyển đổi dữ liệu từ API thành dữ liệu cho biểu đồ
  //       const labels = data.map(item => item.position.positionName);
  //       const quantities = data.map(item => item.quantity);

  //       setChartData({
  //         labels: labels,
  //         datasets: [
  //           {
  //             label: "Số lượng",
  //             data: quantities,
  //             backgroundColor: [
  //               "#FF6384",
  //               "#36A2EB",
  //               "#FFCE56",
  //               "#4BC0C0",
  //               "#9966FF",
  //             ],
  //             borderColor: [
  //               "#FF6384",
  //               "#36A2EB",
  //               "#FFCE56",
  //               "#4BC0C0",
  //               "#9966FF",
  //             ],
  //             borderWidth: 1,
  //           },
  //         ],
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  return (
    <div style={{ width: "50%", height:"400px", margin:"10px"}}>
      <div>Tỷ lệ số lượng theo vị trí</div>
      {chartData ? <Pie style={{ width: "350px", height:"350px", margin:"auto"}} data={chartData} /> : <p>Đang tải...</p>}
    </div>
  );
};

export default PieChart;
