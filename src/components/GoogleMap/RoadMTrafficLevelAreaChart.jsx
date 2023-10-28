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




export default function RoadMTrafficLevelAreaChart() {


    const [data, setData] = useState([]);

const fetchLastUpdatedValues = async () => {
  try {
    const response = await axios.get('http://localhost:5000/get-last-updated-valuesM');
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
