
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

// const data = [
//   {
//     name: "Page A",
//     uv: 590,
//     pv: 800,
//     amt: 1400,
//     cnt: 490
//   },
//   {
//     name: "Page B",
//     uv: 868,
//     pv: 967,
//     amt: 1506,
//     cnt: 590
//   },
//   {
//     name: "Page C",
//     uv: 1397,
//     pv: 1098,
//     amt: 989,
//     cnt: 350
//   },
//   {
//     name: "Page D",
//     uv: 1480,
//     pv: 1200,
//     amt: 1228,
//     cnt: 480
//   },
//   {
//     name: "Page E",
//     uv: 1520,
//     pv: 1108,
//     amt: 1100,
//     cnt: 460
//   },
//   {
//     name: "Page F",
//     uv: 1400,
//     pv: 680,
//     amt: 1700,
//     cnt: 380
//   }
// ];

export default function RoadBAll() {
    const [data, setData] = useState([]);

    const fetchLastUpdatedValues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-last-updated-values/bar');
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
