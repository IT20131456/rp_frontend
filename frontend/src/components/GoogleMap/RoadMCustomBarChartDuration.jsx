import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import axios from "axios";
import { useState, useEffect } from "react";

const colors = scaleOrdinal(schemeCategory10).range();



const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  } 
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function CustomRoadMDuration() {

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
    <BarChart
      width={600}
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
      <YAxis />
      <Bar
        dataKey="durationInTraffic"
        fill="#8884d8"
        shape={<TriangleBar />}
        label={{ position: "top" }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
  );
}
