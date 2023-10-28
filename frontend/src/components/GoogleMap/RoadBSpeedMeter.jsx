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


import ReactSpeedometer from "react-d3-speedometer";




export default function RoadBSpeedMeter() {


    const [data, setData] = useState([]);
    const [avgSpeedd, setAvgSpeedd] = useState(0);

    const [textColor, setTextColor] = useState("black");

const fetchLastUpdatedValues = async () => {
  try {
    const response = await axios.get('http://localhost:5000/get-last-updated-values/one');
    const reversedData = response.data.data.reverse(); // Reverse the order of the data array
  //   setData(response.data.data);
      setData(reversedData); // Set the data state variable
      setAvgSpeedd(response.data.data[0].avgSpeed);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

useEffect(() => {
  fetchLastUpdatedValues();
  const interval = setInterval(() => {
    fetchLastUpdatedValues();
  }, 4000);

  return () => {
    clearInterval(interval);
  };
}, [avgSpeedd]);


// console.log(data[0].avgSpeed);
console.log("Dtaaaaaa",data);

// Get the last object from the array

const lastData = data[data.length - 1];




  return (
    <ReactSpeedometer
    maxValue={30}
    value={avgSpeedd}
    needleColor="red"
    startColor="green"
    segments={10}
    endColor="blue"
    textColor={textColor}
  />
  );
}
