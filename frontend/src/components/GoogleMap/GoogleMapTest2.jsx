import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DistanceMatrixView = () => {
  const [results, setResults] = useState(null);

  const [distance, setDistance] = useState("");
  const [durationInTraffic, setDurationInTraffic] = useState("");
  const [durationWithoutTraffic, setDurationWithoutTraffic] = useState("");
  
const [trafficStatus1, setTrafficStatus1] = useState(0);
  const [status1, setStatus1 ] = useState(0);
  const [status2, setStatus2 ] = useState(0);
  const [status3, setStatus3 ] = useState(0);
  const [status4, setStatus4 ] = useState(0);
  const [status5, setStatus5 ] = useState(0);


  const [averageSpeed, setAverageSpeed] = useState(0);
  const [trafficRatio, setTrafficRatio] = useState(0);


  

//   useEffect(() => {
//     const origin = '7.210836369425923,79.84855797924139';
//     const destination = '7.214084075114835,79.84702427990267';


//     const originX = { lat: 7.210836369425923, lng: 79.84855797924139 };
// const destinationX ={ lat: 7.214084075114835, lng: 79.84702427990267 };

//     axios.get(`http://localhost:5000/api/distance-matrix?origin=${origin}&destination=${destination}`)
//       .then(response => {
//         setResults(response.data);
//         console.log("Response: ", response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);







const fetchData = () => {
    const origin = '7.210836369425923,79.84855797924139';
    const destination = '7.214084075114835,79.84702427990267';

    axios.get(`http://localhost:5000/api/distance-matrix?origin=${origin}&destination=${destination}`)
      .then(response => {
        setResults(response.data);
        setDistance(response.data.rows[0].elements[0].distance.text);
        setDurationInTraffic(response.data.rows[0].elements[0].duration_in_traffic.value);
        setDurationWithoutTraffic(response.data.rows[0].elements[0].duration.value);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
  

    const interval = setInterval(() => {
      fetchData(); // Fetch data every 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []);




  useEffect(() => {
    handlePredict(); // Fetch data initially



    



    const interval = setInterval(() => {
      handlePredict(); // Fetch data every 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };






  }, [results]);




console.log("Distance: ", distance);
console.log("Duration in Traffic: ", durationInTraffic);
  // var distance = results.rows[0].elements[0].distance.text;
  // var durationInTraffic = results.rows[0].elements[0].duration_in_traffic.value;
  // const durationWithoutTraffic = results.rows[0].elements[0].duration.value;



  // var averageSpeed = calculateAverageSpeed(distance, durationInTraffic);
  // console.log("Average speed:", averageSpeed);

  

  // var trafficratio = durationInTraffic/durationWithoutTraffic;
  // console.log("Traffic Ratio:", trafficratio);



  // var trafficStatus = getTrafficStatus(
  //   durationInTraffic,
  //   durationWithoutTraffic
  // );










  
useEffect(() => {
  if (distance !== "" && durationInTraffic !== "") {
    var averageSpeed = calculateAverageSpeed(distance, durationInTraffic);
    console.log("Average speed:", averageSpeed);



    setAverageSpeed(averageSpeed);
    

    var trafficratio = durationInTraffic / durationWithoutTraffic;
    console.log("Traffic Ratio:", trafficratio);

    setTrafficRatio(trafficratio);

    const trafficStatus = getTrafficStatus(
      durationInTraffic,
      durationWithoutTraffic
    );

    setTrafficStatus1(trafficStatus);


   console.log("Traffic Status7777:", trafficStatus1); 

  //  if (trafficStatus1 === "Excellent traffic") {
  //   setStatus1(1);
  // } else if (trafficStatus1 === "Good traffic") {
  //   setStatus2(1);
  // } else if (trafficStatus1 === "Moderate traffic") {
  //   setStatus3(1);
  // } else if (trafficStatus1 === "Heavy traffic") {
  //   setStatus4(1);
  // } else if (trafficStatus1 === "Very heavy traffic") {
  //   setStatus5(1);
  // }


  if(durationInTraffic/durationWithoutTraffic <= 1.1){
    setStatus1(1);
  } else if(durationInTraffic/durationWithoutTraffic <= 1.3){
    setStatus2(1);
  } else if(durationInTraffic/durationWithoutTraffic <= 1.5){
    setStatus3(1);
  } else if(durationInTraffic/durationWithoutTraffic <= 2){
    setStatus4(1);
  } else {
    setStatus5(1);
  }




  

  



    // Perform any actions with averageSpeed, trafficratio, and trafficStatus here
  }
}, [durationInTraffic, durationWithoutTraffic]);






console.log("durationInTraffic77: ", durationInTraffic);
console.log("durationWithoutTraffic77: ", durationWithoutTraffic);
console.log("averageSpeed77: ", averageSpeed);
console.log("trafficratio77: ", trafficRatio);
console.log("status1: ", status1);
console.log("status2: ", status2);
console.log("status3: ", status3);
console.log("status4: ", status4);
console.log("status5: ", status5);






  const [prediction, setPrediction] = useState(null);




  

  const handlePredict = () => {



    if((durationInTraffic!=="" && durationWithoutTraffic!=="" 
    && averageSpeed!=="" && trafficRatio!=="" && status1!=="" 
    && status2!=="" && status3!=="" && status4!=="" && status5!=="")){


// let status11 = 0;
// let status22 = 0;
// let status33 = 0;
// let status44 = 0;
// let status55 = 0;

//       if (trafficStatus1 === "Excellent traffic") {
//         status11 = 1;
//       } else if (trafficStatus1 === "Good traffic") {
//         status22 = 1;
//       } else if (trafficStatus1 === "Moderate traffic") {
//         status33 = 1;
//       } else if (trafficStatus1 === "Heavy traffic") {
//         status44 = 1;
//       } else if (trafficStatus1 === "Very heavy traffic") {
//         status55 = 1;
//       }

console.log("Caling API............");
    axios.post('http://127.0.0.1:5000/predict', {
      // input: [108, 86, 13.3, 1.25, 0, 0, 1, 0, 0],


    




      input: [durationInTraffic, durationWithoutTraffic, averageSpeed, trafficRatio, status1, status2, status3, status4, status5],
    })
      .then(response => {
        setPrediction(response.data.prediction);
        console.log(response.data.prediction);
        console.log("Prediction: ", response.data.prediction);
      })
      .catch(error => {
        console.error('Error:', error);
      });


    }
    
  };










 console.log("Status1: ", status1);
  console.log("Status2: ", status2);
  console.log("Status3: ", status3);
  console.log("Status4: ", status4);
  console.log("Status5: ", status5);



  
function calculateAverageSpeed(distance, durationInTraffic) {
  // Remove any whitespace from the distance text
  var distanceCleaned = distance.replace(/\s/g, "");

  // Remove the "km" suffix from the distance text
  var distanceValue = parseFloat(distanceCleaned);
  console.log("Distance value:", distanceValue);

  // Convert meters to kilometers if distance is in meters
  if (distanceCleaned.includes("km")) {
    // distanceValue /= 1000;
  } else {
    distanceValue /= 1000;
  }

  // Convert duration from seconds to hours
  var durationInHours = durationInTraffic / 3600;
  console.log("Duration in hours:", durationInHours);

  console.log("Distance:", distance);

  // Calculate average speed (distance divided by duration in hours)
  var averageSpeed = distanceValue / durationInHours;
  console.log("Average speed:", averageSpeed);

  return averageSpeed;
}




  


// Determine traffic status based on duration with and without traffic
function getTrafficStatus(durationInTraffic, durationWithoutTraffic) {
  var trafficRatio = durationInTraffic / durationWithoutTraffic;
  console.log("Traffic ratio:", trafficRatio);

  

  // if (trafficRatio <= 1.3) {
  //   return 'Normal traffic'; // Green color code
  // } else if (trafficRatio <= 2) {
  //   return 'Moderate traffic'; // Yellow color code
  // } else {
  //   return 'Heavy traffic'; // Red color code
  // }

  if (trafficRatio <= 1.1) {
    return "Excellent traffic"; // Green color code
  } else if (trafficRatio <= 1.3) {
    return "Good traffic"; // Light green color code
  } else if (trafficRatio <= 1.5) {
    return "Moderate traffic"; // Yellow color code
  } else if (trafficRatio <= 2) {
    return "Busy traffic"; // Orange color code
  } else {
    return "Heavy traffic"; // Red color code
  }
}








 


  if (!results) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Distance Matrix Results</h1>
      <p>Origin: {results.origin_addresses[0]}</p>
      <p>Destination: {results.destination_addresses[0]}</p>
      <p>Distance: {results.rows[0].elements[0].distance.text}</p>
      <p>Distance In Meters: {results.rows[0].elements[0].distance.value}</p>
      <p>Duration Without: {results.rows[0].elements[0].duration.text}</p>
      <p>Duration Without Seconds: {results.rows[0].elements[0].duration.value}</p>
      <p>Duration in Traffic: {results.rows[0].elements[0].duration_in_traffic.text}</p>
      <p>Duration in Traffic Seconds: {results.rows[0].elements[0].duration_in_traffic.value}</p>

      <h2>Real Time Prediction - {prediction - 5}</h2>

    </div>
  );





};

export default DistanceMatrixView;
