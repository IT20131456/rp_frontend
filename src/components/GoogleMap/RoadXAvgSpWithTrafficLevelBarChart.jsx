
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import axios from "axios";
import { useState, useEffect } from "react";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100
//   }
// ];

export default function RoadXAvgWithTrafficLevelBar() {
    const [data, setData] = useState([]);

    const fetchLastUpdatedValues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-last-updated-values/barX');
        const reversedData = response.data.data.reverse(); // Reverse the order of the data array
      //   setData(response.data.data);
          setData(reversedData); // Set the data state variable
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    useEffect(() => {
      fetchLastUpdatedValues();
      const interval = setInterval(() => {
        fetchLastUpdatedValues();
      }, 6000);
    
      return () => {
        clearInterval(interval);
      };
    }, []);
  return (
    <BarChart
      width={1200}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="stime" />
      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
      <Tooltip />
      <Legend />
      <Bar yAxisId="left" dataKey="avgSpeed" fill="#8884d8" />
      <Bar yAxisId="right" dataKey="level" fill="#82ca9d" />
    </BarChart>
  );
}
