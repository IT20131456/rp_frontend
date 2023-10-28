import React, { useState, useEffect } from 'react';
import axios from 'axios';

// function LastUpdatedData() {
//   const [lastUpdatedData, setLastUpdatedData] = useState({});

// //   useEffect(() => {
// //     axios.get('http://localhost:5000/get-last-updated-data') // Replace with your backend API endpoint
// //       .then(response => {
// //         setLastUpdatedData(response.data.data);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching data:', error);
// //       });
// //   }, []);



// const fetchData = () => {
//     axios.get('http://localhost:5000/get-last-updated-data')
//       .then(response => {
//         setLastUpdatedData(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   };

//   useEffect(() => {
//     fetchData(); // Fetch data immediately on component mount

//     const interval = setInterval(() => {
//       fetchData(); // Fetch data every 5 seconds
//     }, 5000);

//     return () => {
//       clearInterval(interval); // Clean up the interval when component unmounts
//     };
//   }, []);






//   return (
//     <div>
//       <h2>Last Updated Data</h2>
//       {/* <p>Prediction: {lastUpdatedData.prediction}</p> */}
//       <p>Average Speed: {lastUpdatedData.averageSpeed}</p>
//       <p>Traffic Ratio: {lastUpdatedData.trafficRatio}</p>
//       <p>Time: {lastUpdatedData.createdTime}</p>
//       {/* Add other fields here */}
//     </div>
//   );
// }








function LastUpdatedData() {
    const [lastUpdatedValues, setLastUpdatedValues] = useState([]);
  
    const fetchLastUpdatedValues = () => {
      axios.get('http://localhost:5000/get-last-updated-values')
        .then(response => {
          setLastUpdatedValues(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };
  
    useEffect(() => {
      fetchLastUpdatedValues(); // Fetch data immediately on component mount
  
      const interval = setInterval(() => {
        fetchLastUpdatedValues(); // Fetch data every 5 seconds
      }, 5000);
  
      return () => {
        clearInterval(interval); // Clean up the interval when component unmounts
      };
    }, []);

    console.log(lastUpdatedValues);
  
    return (
      <div>
        <h2>Last 100 Updated Values</h2>
        <ul>
          {lastUpdatedValues.map((value, index) => (
            <li key={index}>
              Time: {value.stime}, Average Speed: {value.averageSpeed}, Traffic Ratio: {value.trafficRatio}
              {/* Add other fields here */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default LastUpdatedData;


