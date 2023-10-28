
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

import "./DataCard.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import "../NavigationBar/NavigationStyle.css";
import GoogleMapView from "./GoogleMapView";

import GoogleMapLoad from "./GoogleMapLoad";





export default function GoogleMapMain() {


  //start
  const [results, setResults] = useState(null);

  const [distance, setDistance] = useState("");
  const [durationInTraffic, setDurationInTraffic] = useState("");
  const [durationWithoutTraffic, setDurationWithoutTraffic] = useState("");

  const [trafficStatus1, setTrafficStatus1] = useState(0);
  const [status1, setStatus1] = useState(0);
  const [status2, setStatus2] = useState(0);
  const [status3, setStatus3] = useState(0);
  const [status4, setStatus4] = useState(0);
  const [status5, setStatus5] = useState(0);

  const [averageSpeed, setAverageSpeed] = useState(0);
  const [trafficRatio, setTrafficRatio] = useState(0);

  const [level, setLevel] = useState(0);

  const [textColor, setTextColor] = useState("black");

  const fetchData = () => {
    const origin = "7.210924434642626,79.84874580970049";
    const destination = "7.214258,79.847186";

    axios
      .get(
        `http://localhost:5000/api/distance-matrixroadx?origin=${origin}&destination=${destination}`
      )
      .then((response) => {
        setResults(response.data);
        setDistance(response.data.rows[0].elements[0].distance.text);
        setDurationInTraffic(
          response.data.rows[0].elements[0].duration_in_traffic.value
        );
        setDurationWithoutTraffic(
          response.data.rows[0].elements[0].duration.value
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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

  //new

  // Your existing useEffect logic
  const updateTrafficInfo = () => {
    if (distance !== "" && durationInTraffic !== "") {
      var averageSpeed = calculateAverageSpeed(distance, durationInTraffic);
      setAverageSpeed(averageSpeed);

      var trafficratio = durationInTraffic / durationWithoutTraffic;
      setTrafficRatio(trafficratio);

      const trafficStatus = getTrafficStatus(
        durationInTraffic,
        durationWithoutTraffic
      );
      setTrafficStatus1(trafficStatus);

      console.log("Traffic Status:", trafficStatus);

      if (trafficratio <= 1.1) {
        setStatus1(1);
      } else if (trafficratio <= 1.3) {
        setStatus2(1);
      } else if (trafficratio <= 1.5) {
        setStatus3(1);
      } else if (trafficratio <= 2) {
        setStatus4(1);
      } else {
        setStatus5(1);
      }

      // Perform any actions with averageSpeed, trafficratio, and trafficStatus here
    }
  };

  useEffect(() => {
    // Call the updateTrafficInfo function immediately
    updateTrafficInfo();

    // Set up an interval to call updateTrafficInfo every 3 seconds
    const interval = setInterval(updateTrafficInfo, 3000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [distance, durationInTraffic, durationWithoutTraffic]);

  //

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
    if (
      durationInTraffic !== "" &&
      durationWithoutTraffic !== "" &&
      averageSpeed !== "" &&
      trafficRatio !== "" &&
      status1 !== "" &&
      status2 !== "" &&
      status3 !== "" &&
      status4 !== "" &&
      status5 !== ""
    ) {
      console.log("Caling API............");
      axios
        .post("http://127.0.0.1:5000/predict", {
          // input: [108, 86, 13.3, 1.25, 0, 0, 1, 0, 0],

          input: [
            durationInTraffic,
            durationWithoutTraffic,
            averageSpeed,
            trafficRatio,
            status1,
            status2,
            status3,
            status4,
            status5,
          ],
        })
        .then((response) => {
          setPrediction(response.data.prediction);
          console.log(response.data.prediction);
          console.log("Prediction: ", response.data.prediction);

          const calculatedLevel =
            Math.floor((response.data.prediction - 10) / 0.5) + 1;
          setLevel(calculatedLevel);
        })
        .catch((error) => {
          console.error("Error:", error);
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

  //end








   //start
   const [resultsX, setResultsX] = useState(null);

   const [distanceX, setDistanceX] = useState("");
   const [durationInTrafficX, setDurationInTrafficX] = useState("");
   const [durationWithoutTrafficX, setDurationWithoutTrafficX] = useState("");
 
   const [trafficStatus1X, setTrafficStatus1X] = useState(0);
   const [status1X, setStatus1X] = useState(0);
   const [status2X, setStatus2X] = useState(0);
   const [status3X, setStatus3X] = useState(0);
   const [status4X, setStatus4X] = useState(0);
   const [status5X, setStatus5X] = useState(0);
 
   const [averageSpeedX, setAverageSpeedX] = useState(0);
   const [trafficRatioX, setTrafficRatioX] = useState(0);
 
   const [levelX, setLevelX] = useState(0);
 
   const [textColorX, setTextColorX] = useState("black");
 
   const fetchDataX = () => {
    const origin = "7.212853531714604,79.84375877992322";
    const destination = "7.214417716580489,79.8470335150753";
 
     axios
       .get(
         `http://localhost:5000/api/distance-matrixQ?origin=${origin}&destination=${destination}`
       )
       .then((response) => {
         setResultsX(response.data);
         setDistanceX(response.data.rows[0].elements[0].distance.text);
         setDurationInTrafficX(
           response.data.rows[0].elements[0].duration_in_traffic.value
         );
         setDurationWithoutTrafficX(
           response.data.rows[0].elements[0].duration.value
         );
       })
       .catch((error) => {
         console.error("Error fetching data:", error);
       });
   };
 
   useEffect(() => {
     fetchDataX(); // Fetch data initially
 
     const interval = setInterval(() => {
       fetchDataX(); // Fetch data every 5 seconds
     }, 5000); // 5000 milliseconds = 5 seconds
 
     return () => {
       clearInterval(interval); // Clean up the interval when the component unmounts
     };
   }, []);
 
   //new
 
   // Your existing useEffect logic
   const updateTrafficInfoX = () => {
     if (distanceX !== "" && durationInTrafficX !== "") {
       var averageSpeed = calculateAverageSpeed(distanceX, durationInTrafficX);
       setAverageSpeedX(averageSpeed);
 
       var trafficratio = durationInTrafficX / durationWithoutTrafficX;
       setTrafficRatioX(trafficratio);
 
       const trafficStatus = getTrafficStatus(
         durationInTrafficX,
         durationWithoutTrafficX
       );
       setTrafficStatus1X(trafficStatus);
 
       console.log("Traffic Status:", trafficStatus);
 
       if (trafficratio <= 1.1) {
         setStatus1X(1);
       } else if (trafficratio <= 1.3) {
         setStatus2X(1);
       } else if (trafficratio <= 1.5) {
         setStatus3X(1);
       } else if (trafficratio <= 2) {
         setStatus4X(1);
       } else {
         setStatus5X(1);
       }
 
       // Perform any actions with averageSpeed, trafficratio, and trafficStatus here
     }
   };
 
   useEffect(() => {
     // Call the updateTrafficInfo function immediately
     updateTrafficInfoX();
 
     // Set up an interval to call updateTrafficInfo every 3 seconds
     const interval = setInterval(updateTrafficInfoX, 3000);
 
     // Clean up the interval when the component unmounts
     return () => {
       clearInterval(interval);
     };
   }, [distanceX, durationInTrafficX, durationWithoutTrafficX]);
 
   //
 
   useEffect(() => {
     handlePredictX(); // Fetch data initially
 
     const interval = setInterval(() => {
       handlePredictX(); // Fetch data every 5 seconds
     }, 5000); // 5000 milliseconds = 5 seconds
 
     return () => {
       clearInterval(interval); // Clean up the interval when the component unmounts
     };
   }, [resultsX]);
 
   console.log("Distance: ", distance);
   console.log("Duration in Traffic: ", durationInTraffic);
 
   
 
   console.log("durationInTraffic77: ", durationInTraffic);
   console.log("durationWithoutTraffic77: ", durationWithoutTraffic);
   console.log("averageSpeed77: ", averageSpeed);
   console.log("trafficratio77: ", trafficRatio);
   console.log("status1: ", status1);
   console.log("status2: ", status2);
   console.log("status3: ", status3);
   console.log("status4: ", status4);
   console.log("status5: ", status5);
 
   const [predictionX, setPredictionX] = useState(null);
 
   const handlePredictX = () => {
     if (
       durationInTrafficX !== "" &&
       durationWithoutTrafficX !== "" &&
       averageSpeedX !== "" &&
       trafficRatioX !== "" &&
       status1X !== "" &&
       status2X !== "" &&
       status3X !== "" &&
       status4X !== "" &&
       status5X !== ""
     ) {
       console.log("Caling API............");
       axios
         .post("http://127.0.0.1:5000/predict", {
           // input: [108, 86, 13.3, 1.25, 0, 0, 1, 0, 0],
 
           input: [
             durationInTrafficX,
            durationWithoutTrafficX,
             averageSpeedX,
             trafficRatioX,
             status1X,
             status2X,
             status3X,
             status4X,
             status5X,
           ],
         })
         .then((response) => {
           setPredictionX(response.data.prediction);
           console.log(response.data.prediction);
           console.log("Prediction: ", response.data.prediction);
 
           const calculatedLevel =
             Math.floor((response.data.prediction - 10) / 0.5) + 1;
           setLevelX(calculatedLevel);
         })
         .catch((error) => {
           console.error("Error:", error);
         });
     }
   };
 
   console.log("Status1: ", status1);
   console.log("Status2: ", status2);
   console.log("Status3: ", status3);
   console.log("Status4: ", status4);
   console.log("Status5: ", status5);
 

 
   //end







   

   //start
   const [resultsA, setResultsA] = useState(null);

   const [distanceA, setDistanceA] = useState("");
   const [durationInTrafficA, setDurationInTrafficA] = useState("");
   const [durationWithoutTrafficA, setDurationWithoutTrafficA] = useState("");
 
   const [trafficStatus1A, setTrafficStatus1A] = useState(0);
   const [status1A, setStatus1A] = useState(0);
   const [status2A, setStatus2A] = useState(0);
   const [status3A, setStatus3A] = useState(0);
   const [status4A, setStatus4A] = useState(0);
   const [status5A, setStatus5A] = useState(0);
 
   const [averageSpeedA, setAverageSpeedA] = useState(0);
   const [trafficRatioA, setTrafficRatioA] = useState(0);
 
   const [levelA, setLevelA] = useState(0);
 
   const [textColorA, setTextColorA] = useState("black");
 
   const fetchDataA = () => {
    // const origin = "7.212853531714604,79.84375877992322";
    // const destination = "7.214417716580489,79.8470335150753";
    const origin = "7.217175713979923,79.84618219096271 ";
    const destination = "7.214445566112564,79.84743483824434";
 
     axios
       .get(
         `http://localhost:5000/api/distance-matrixA?origin=${origin}&destination=${destination}`
       )
       .then((response) => {
         setResultsA(response.data);
         setDistanceA(response.data.rows[0].elements[0].distance.text);
         setDurationInTrafficA(
           response.data.rows[0].elements[0].duration_in_traffic.value
         );
         setDurationWithoutTrafficA(
           response.data.rows[0].elements[0].duration.value
         );
       })
       .catch((error) => {
         console.error("Error fetching data:", error);
       });
   };
 
   useEffect(() => {
     fetchDataA(); // Fetch data initially
 
     const interval = setInterval(() => {
       fetchDataA(); // Fetch data every 5 seconds
     }, 5000); // 5000 milliseconds = 5 seconds
 
     return () => {
       clearInterval(interval); // Clean up the interval when the component unmounts
     };
   }, []);
 
   //new
 
   // Your existing useEffect logic
   const updateTrafficInfoA = () => {
     if (distanceA !== "" && durationInTrafficA !== "") {
       var averageSpeed = calculateAverageSpeed(distanceA, durationInTrafficA);
       setAverageSpeedA(averageSpeed);
 
       var trafficratio = durationInTrafficA / durationWithoutTrafficA;
       setTrafficRatioA(trafficratio);
 
       const trafficStatus = getTrafficStatus(
         durationInTrafficA,
         durationWithoutTrafficA
       );
       setTrafficStatus1A(trafficStatus);
 
       console.log("Traffic Status:", trafficStatus);
 
       if (trafficratio <= 1.1) {
         setStatus1A(1);
       } else if (trafficratio <= 1.3) {
         setStatus2A(1);
       } else if (trafficratio <= 1.5) {
         setStatus3A(1);
       } else if (trafficratio <= 2) {
         setStatus4A(1);
       } else {
         setStatus5A(1);
       }
 
       // Perform any actions with averageSpeed, trafficratio, and trafficStatus here
     }
   };
 
   useEffect(() => {
     // Call the updateTrafficInfo function immediately
     updateTrafficInfoA();
 
     // Set up an interval to call updateTrafficInfo every 3 seconds
     const interval = setInterval(updateTrafficInfoA, 3000);
 
     // Clean up the interval when the component unmounts
     return () => {
       clearInterval(interval);
     };
   }, [distanceA, durationInTrafficA, durationWithoutTrafficA]);
 
   //
 
   useEffect(() => {
     handlePredictA(); // Fetch data initially
 
     const interval = setInterval(() => {
       handlePredictA(); // Fetch data every 5 seconds
     }, 5000); // 5000 milliseconds = 5 seconds
 
     return () => {
       clearInterval(interval); // Clean up the interval when the component unmounts
     };
   }, [resultsA]);
 
   console.log("Distance: ", distance);
   console.log("Duration in Traffic: ", durationInTraffic);
 
   
 
   console.log("durationInTraffic77: ", durationInTraffic);
   console.log("durationWithoutTraffic77: ", durationWithoutTraffic);
   console.log("averageSpeed77: ", averageSpeed);
   console.log("trafficratio77: ", trafficRatio);
   console.log("status1: ", status1);
   console.log("status2: ", status2);
   console.log("status3: ", status3);
   console.log("status4: ", status4);
   console.log("status5: ", status5);
 
   const [predictionA, setPredictionA] = useState(null);
 
   const handlePredictA = () => {
     if (
       durationInTrafficA !== "" &&
       durationWithoutTrafficA !== "" &&
       averageSpeedA !== "" &&
       trafficRatioA !== "" &&
       status1A !== "" &&
       status2A !== "" &&
       status3A !== "" &&
       status4A !== "" &&
       status5A !== ""
     ) {
       console.log("Caling API............");
       axios
         .post("http://127.0.0.1:5000/predict", {
           // input: [108, 86, 13.3, 1.25, 0, 0, 1, 0, 0],
 
           input: [
             durationInTrafficA,
            durationWithoutTrafficA,
             averageSpeedA,
             trafficRatioA,
             status1A,
             status2A,
             status3A,
             status4A,
             status5A,
           ],
         })
         .then((response) => {
           setPredictionA(response.data.prediction);
           console.log(response.data.prediction);
           console.log("Prediction: ", response.data.prediction);
 
           const calculatedLevel =
             Math.floor((response.data.prediction - 10) / 0.5) + 1;
           setLevelA(calculatedLevel);
         })
         .catch((error) => {
           console.error("Error:", error);
         });
     }
   };
 
   console.log("Status1: ", status1);
   console.log("Status2: ", status2);
   console.log("Status3: ", status3);
   console.log("Status4: ", status4);
   console.log("Status5: ", status5);
 

 
   //end
 














   //start
   const [resultsM, setResultsM] = useState(null);

   const [distanceM, setDistanceM] = useState("");
   const [durationInTrafficM, setDurationInTrafficM] = useState("");
   const [durationWithoutTrafficM, setDurationWithoutTrafficM] = useState("");
 
   const [trafficStatus1M, setTrafficStatus1M] = useState(0);
   const [status1M, setStatus1M] = useState(0);
   const [status2M, setStatus2M] = useState(0);
   const [status3M, setStatus3M] = useState(0);
   const [status4M, setStatus4M] = useState(0);
   const [status5M, setStatus5M] = useState(0);
 
   const [averageSpeedM, setAverageSpeedM] = useState(0);
   const [trafficRatioM, setTrafficRatioM] = useState(0);
 
   const [levelM, setLevelM] = useState(0);
 
   const [textColorM, setTextColorM] = useState("black");
 
   const fetchDataM = () => {
    // const origin = "7.212853531714604,79.84375877992322";
    // const destination = "7.214417716580489,79.8470335150753";
    const origin = "7.215747916985077,79.85064534489413";
    const destination = "7.2141410557573975,79.84739202025193";
 
     axios
       .get(
         `http://localhost:5000/api/distance-matrixM?origin=${origin}&destination=${destination}`
       )
       .then((response) => {
         setResultsM(response.data);
         setDistanceM(response.data.rows[0].elements[0].distance.text);
         setDurationInTrafficM(
           response.data.rows[0].elements[0].duration_in_traffic.value
         );
         setDurationWithoutTrafficM(
           response.data.rows[0].elements[0].duration.value
         );
       })
       .catch((error) => {
         console.error("Error fetching data:", error);
       });
   };
 
   useEffect(() => {
     fetchDataM(); // Fetch data initially
 
     const interval = setInterval(() => {
       fetchDataM(); // Fetch data every 5 seconds
     }, 5000); // 5000 milliseconds = 5 seconds
 
     return () => {
       clearInterval(interval); // Clean up the interval when the component unmounts
     };
   }, []);
 
   //new
 
   // Your existing useEffect logic
   const updateTrafficInfoM = () => {
     if (distanceM !== "" && durationInTrafficM !== "") {
       var averageSpeed = calculateAverageSpeed(distanceM, durationInTrafficM);
       setAverageSpeedM(averageSpeed);
 
       var trafficratio = durationInTrafficM / durationWithoutTrafficM;
       setTrafficRatioM(trafficratio);
 
       const trafficStatus = getTrafficStatus(
         durationInTrafficM,
         durationWithoutTrafficM
       );
       setTrafficStatus1M(trafficStatus);
 
       console.log("Traffic Status:", trafficStatus);
 
       if (trafficratio <= 1.1) {
         setStatus1M(1);
       } else if (trafficratio <= 1.3) {
         setStatus2M(1);
       } else if (trafficratio <= 1.5) {
         setStatus3M(1);
       } else if (trafficratio <= 2) {
         setStatus4M(1);
       } else {
         setStatus5M(1);
       }
 
       // Perform any actions with averageSpeed, trafficratio, and trafficStatus here
     }
   };
 
   useEffect(() => {
     // Call the updateTrafficInfo function immediately
     updateTrafficInfoM();
 
     // Set up an interval to call updateTrafficInfo every 3 seconds
     const interval = setInterval(updateTrafficInfoM, 3000);
 
     // Clean up the interval when the component unmounts
     return () => {
       clearInterval(interval);
     };
   }, [distanceM, durationInTrafficM, durationWithoutTrafficM]);
 
   //
 
   useEffect(() => {
     handlePredictM(); // Fetch data initially
 
     const interval = setInterval(() => {
       handlePredictM(); // Fetch data every 5 seconds
     }, 5000); // 5000 milliseconds = 5 seconds
 
     return () => {
       clearInterval(interval); // Clean up the interval when the component unmounts
     };
   }, [resultsM]);
 
   console.log("Distance: ", distance);
   console.log("Duration in Traffic: ", durationInTraffic);
 
   
 
   console.log("durationInTraffic77: ", durationInTraffic);
   console.log("durationWithoutTraffic77: ", durationWithoutTraffic);
   console.log("averageSpeed77: ", averageSpeed);
   console.log("trafficratio77: ", trafficRatio);
   console.log("status1: ", status1);
   console.log("status2: ", status2);
   console.log("status3: ", status3);
   console.log("status4: ", status4);
   console.log("status5: ", status5);
 
   const [predictionM, setPredictionM] = useState(null);
 
   const handlePredictM = () => {
     if (
       durationInTrafficM !== "" &&
       durationWithoutTrafficM !== "" &&
       averageSpeedM !== "" &&
       trafficRatioM !== "" &&
       status1M !== "" &&
       status2M !== "" &&
       status3M !== "" &&
       status4M !== "" &&
       status5M !== ""
     ) {
       console.log("Caling API............");
       axios
         .post("http://127.0.0.1:5000/predict", {
           // input: [108, 86, 13.3, 1.25, 0, 0, 1, 0, 0],
 
           input: [
             durationInTrafficM,
            durationWithoutTrafficM,
             averageSpeedM,
             trafficRatioM,
             status1M,
             status2M,
             status3M,
             status4M,
             status5M,
           ],
         })
         .then((response) => {
           setPredictionM(response.data.prediction);
           console.log(response.data.prediction);
           console.log("Prediction: ", response.data.prediction);
 
           const calculatedLevel =
             Math.floor((response.data.prediction - 10) / 0.5) + 1;
           setLevelM(calculatedLevel);
         })
         .catch((error) => {
           console.error("Error:", error);
         });
     }
   };
 
   console.log("Status1: ", status1);
   console.log("Status2: ", status2);
   console.log("Status3: ", status3);
   console.log("Status4: ", status4);
   console.log("Status5: ", status5);
 

 
   //end





   const [mapState, setMapState] = useState(0);

   // Function to toggle the map state
   const toggleMapState = () => {
     // Toggle the state between 0 and 1
     setMapState(mapState === 0 ? 1 : 0);
   };



   
  return (
    <div className="wrapper">
    {/* Top Navigation */}
    <TopNavigationBar />

    {/* Sidebar and Content */}
    <div className="content-wrapper">
      {/* Sidebar Column */}
      <div className="sidebar-column">
        <SideNavigationBar />
      </div>

   <Container>
    <div className="con2">


        <Row>
            <Col sm={4}>
              <center>
              <h1>Junction Detail Analysis</h1>
              </center>
      

            <Row>
                <Col sm={6}>

                <a href="/roadX" style={{ textDecoration: 'none' }}>
                <div className="cardMain">
                    <h3>Road(X) </h3>
                    <div className="card">
                    <h6>Level {level}</h6>
                    </div>

                    {/* <div className="card">
                  <h6>48Kmph</h6>

                  </div> */}

                </div>
                </a>
                </Col>

                <Col sm={6}>

                  <a href="/roadB" style={{ textDecoration: 'none' }}>
                <div className="cardMain">
                    <h3>Road(Q)</h3>
                    <div className="card">
                    <h6>Level {levelX}</h6>
                    </div>
{/* 
                    <div className="card">
                  <h6>48Kmph</h6>

                  </div> */}

                </div>

                </a>
                
                </Col>
            </Row>


            <Row>
                <Col sm={6}>
                <a href="/roada" style={{ textDecoration: 'none' }}>
                <div className="cardMain">
                    <h3>Road(A)</h3>
                    <div className="card">
                    <h6>Level {levelA}</h6>
                    </div>

                    {/* <div className="card">
                  <h6>48Kmph</h6>

                  </div> */}

                </div>
                </a>
                </Col>

                <Col sm={6}>
                <a href="/roadm" style={{ textDecoration: 'none' }}>
                <div className="cardMain">
                    <h3>Road(M)</h3>
                    <div className="card">
                    <h6>Level {levelM}</h6>
                    </div>

                    {/* <div className="card">
                  <h6>48Kmph</h6>

                  </div> */}

                </div>
                </a>
                
                </Col>
            </Row>

            <Row>
           
              <div className="cardMainButton">
              <a href="/goverall" style={{ textDecoration: 'none' }}>
                <h3 style={{color: "black"}}>Overall analysis</h3>
                </a>
                </div>

              
            </Row>


            <Row>
              <div className="cardMainButton">
              <a href="/Gmactivate" style={{ textDecoration: 'none' }}>
                <h3 style={{color: "black"}}>Activate Algorithm</h3>
                </a>
                </div>
            </Row>


          


           

           


            </Col>

            <Col sm={8}>
              <div className="googlemapborder">

                {mapState === 0 ? (
                  <GoogleMapLoad />
                ) : (
                  // <GoogleMapLoad2 />
                  <div className="mapimagee">
                          </div>
                )}
           

          
            {/* <GoogleMapLoad /> */}
            </div>
                </Col>
            </Row>


            <div>
      <button onClick={toggleMapState}>Change Map Mode</button>
      {/* <p>Map State: {mapState}</p> */}
    </div>


            {/* <Row>
              <center>
              <Col sm={11}>

              <div className="googlemaploading">
              <GoogleMapLoad />
              </div>
              </Col>
              </center>
            </Row> */}

         


    </div>
   </Container>
    </div>
  </div>
  );
}
