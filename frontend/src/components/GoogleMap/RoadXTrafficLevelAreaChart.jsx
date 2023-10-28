// import "./styles.css";
import React, { useState, useEffect } from 'react';
// import React from "react";
import axios from "axios";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

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



export default function RoadXTrafficLevelAreaChart() {


    const [data, setData] = useState([]);

const fetchLastUpdatedValues = async () => {
  try {
    const response = await axios.get('http://localhost:5000/get-last-updated-valuesX');
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
    <AreaChart
      width={870}
      height={300}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="stime" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="level" stroke="#008000" fill="#2AAA8A" />
    </AreaChart>
  );
}
