

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AvSpeedLineChart from './AvSpeedLineChartB'; // Replace with your LineChartComponent file

function AvgSpeedLineChartDataB() {
  const [data, setData] = useState([]);

  const fetchLastUpdatedValues = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-last-updated-values');
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
    <div>
      {/* <h2>Last Updated Values Line Chart</h2> */}
      <AvSpeedLineChart data={data} /> {/* Render the LineChartComponent */}
    </div>
  );
}

export default AvgSpeedLineChartDataB;

