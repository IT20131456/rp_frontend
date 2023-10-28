
import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter
} from "recharts";



export default function RoadMAll() {
    const [data, setData] = useState([]);

    const fetchLastUpdatedValues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-last-updated-values/barM');
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
    <ComposedChart
      width={700}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="stime" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="durationInTraffic" fill="#8884d8" stroke="#8884d8" />
      <Bar dataKey="level" barSize={20} fill="#413ea0" />
      <Line type="monotone" dataKey="avgSpeed" stroke="#ff7300" />
      <Scatter dataKey="trafficRatio" fill="red" />
    </ComposedChart>
  );
}
