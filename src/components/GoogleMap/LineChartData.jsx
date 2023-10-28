// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import LineChart from './LineChart'; // Import your LineChart component

// function LineChartRoadB() {
//   const [data, setData] = useState([]);

//   const fetchLastUpdatedValues = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/get-last-updated-values');
//       setData(response.data.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchLastUpdatedValues();
//     const interval = setInterval(() => {
//       fetchLastUpdatedValues();
//     }, 5000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div>
//       <LineChart data={data} /> {/* Render the LineChart component */}
//     </div>
//   );
// }

// export default LineChartRoadB;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineChartComponent from './LineChart'; // Replace with your LineChartComponent file

function LineChartRoadB() {
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
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {/* <h2>Last Updated Values Line Chart</h2> */}
      <LineChartComponent data={data} /> {/* Render the LineChartComponent */}
    </div>
  );
}

export default LineChartRoadB;

