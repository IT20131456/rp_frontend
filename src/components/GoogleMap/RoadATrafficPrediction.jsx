import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DataCard.css";
// import { Container, Row, Col } from "react-bootstrap";
import GoogleMapViewWithDirectionsA from "./GoogleMapDirectionA";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import "../NavigationBar/NavigationStyle.css";

import LineChartRoadB from "./LineChartData";

import AvgSpeedLineChartDataB from "./AvSpeedLineChartDataB";

import RoadAAvgSpeedAreaChart from "./RoadAAvgSpeedAreaChart";

import RoadATrafficLevelAreaChart from "./RoadATrafficLevelAreaChart";

import RoadBAllAreaChart from "./RoadBAllAreaChart";
import RoadAAvgWithTrafficLevelBar from "./RoadAAvgSpWithTrafficLevelBarChart";

import RoadBSpeedMeter from "./RoadBSpeedMeter";

import CustomRoadADuration from "./RoadACustomBarChartDuration";

import RoadAAll from "./RoadAAllChart";

import ReactSpeedometer from "react-d3-speedometer";
import ThreeWayJunction from "./ThreeWayJuntionLeft";

const RoadATrafficPrediction = () => {
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
    const origin = "7.217175713979923,79.84618219096271 ";
    const destination = "7.214445566112564,79.84743483824434";

    axios
      .get(
        `http://localhost:5000/api/distance-matrixA?origin=${origin}&destination=${destination}`
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

  const handleSaveData = async () => {
    console.log("Saving data.....................", averageSpeed);

    const currentDate = new Date();

    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const currentTime = currentDate.toLocaleTimeString(undefined, options);

    // const currentDateTime = currentDate.toISOString();

    const avgSpeed = averageSpeed.toFixed(2);

    try {
      const response = await axios.post("http://localhost:5000/save-dataA", {
        level,
        prediction,
        avgSpeed,
        trafficRatio,
        distance,
        durationInTraffic,
        durationWithoutTraffic,
        sdate: currentDate,
        stime: currentTime,
      });

      // console.log(response.data.message); // Data saved successfully
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleSaveData(); // Call the save function every 5 seconds
  //   }, 17000);

  //   return () => {
  //     clearInterval(interval); // Clear the interval when the component unmounts
  //   };
  // }, [averageSpeed]); // Empty dependency array ensures the effect runs only once on mount

  

  useEffect(() => {
    const interval = setInterval(() => {
      handleSaveData(); // Call the save function every 17 seconds
    }, 5000);
  
    const cleanup = () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  
    // Initial call to start the interval
    handleSaveData();
  
    return cleanup;
  }, [averageSpeed]);
  





  if (!results) {
    return <div>Loading...</div>;
  }

  const passvalue = 1;

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

        {/*container*/}
        <Container>
          <div className="con2">
            <Row className="my-row">
              <Col sm={5}>
                <div className="mapst rotate-right">
                  <ThreeWayJunction value1={passvalue} />
                </div>
              </Col>
              <Col sm={7}>
                <Row>
                  <div className="card">
                    <h3 className="black-textss">Real Time Prediction</h3>

                    <div>
                      <h3></h3>
                    </div>

                    <div className="center-content">
                      {/* <p className="black-textss">{prediction} </p> */}

                      <p className="black-textss">Level {level} Traffic </p>
                    </div>
                  </div>
                </Row>

                <Row>
                  <Col sm={6}>
                    <div className="card">
                      <p className="black-text">
                        <strong>Average Speed (Kmph)</strong>
                      </p>
                      <div className="center-content1">
                        <h3 class="black-textss">
                          {averageSpeed.toFixed(2)} Kmph
                        </h3>
                      </div>
                      <p className="black-text">
                        <strong> Traffic Ratio</strong>
                      </p>
                      <div className="center-content1">
                        <h3 class="black-textss">
                          {" "}
                          {trafficRatio.toFixed(2)}{" "}
                        </h3>
                      </div>

                      <p className="black-text">
                        <strong> Distance </strong>
                      </p>
                      <div className="center-content1">
                        {/* <h4 class="black-textss">  {results.rows[0].elements[0].distance.text} -{" "}
                   {results.rows[0].elements[0].distance.value} m </h4> */}

                        <h3 class="black-textss">
                          {results.rows[0].elements[0].distance.value} m{" "}
                        </h3>
                      </div>
                    </div>
                  </Col>

                  <Col sm={6}>
                    <div className="card">
                      <p className="black-text">
                        <strong>Duration Without Traffic(Seconds)</strong>
                      </p>
                      <div className="center-content1">
                        <h3 class="black-textss">
                          {results.rows[0].elements[0].duration.value} S
                        </h3>
                      </div>
                      <p className="black-text">
                        <strong> Duration in Traffic (Seconds)</strong>
                      </p>
                      <div className="center-content1">
                        <h3 class="black-textss">
                          {" "}
                          {
                            results.rows[0].elements[0].duration_in_traffic
                              .value
                          }{" "}
                          S
                        </h3>
                      </div>
                    </div>
                  </Col>
                </Row>

                {/* <p>{level}</p> */}

                {/* <p>{prediction}</p> */}
              </Col>
            </Row>

            {/* <Row>
            <h3 className="h3margin">Traffic levels change over time</h3>
            <LineChartRoadB />
          </Row>

          <Row>
            <h3 className="h3margin">Average speed change over time</h3>
            <AvgSpeedLineChartDataB />
          </Row> */}

          <br></br>

            <Row>
              {/* <h3 className="h3margin">Traffic levels change over time</h3>
              <RoadBTrafficLevelAreaChart /> */}

              <h3 className="h3margin">Traffic levels change over time</h3>
              <Col sm={3}>
                <div className="speedmargin">
                  <ReactSpeedometer
                    value={level}
                    minValue={0}
                    maxValue={40}
                    needleColor="steelblue"
                    needleTransitionDuration={4000}
                    needleTransition="easeElastic"
                    currentValueText="Traffic Level: #{value}"
                    currentValuePlaceholderStyle={"#{value}"}
                    textColor={textColor}
                  />
                </div>
              </Col>

              <Col sm={9}>
                <RoadATrafficLevelAreaChart />
              </Col>
            </Row>

            <Row>
              <h3 className="h3margin"> Average speed change over time</h3>

              <Col sm={3}>
                <div className="speedmargin">
                  {/* <RoadBSpeedMeter /> */}

                  <ReactSpeedometer
                    maxValue={30}
                    value={averageSpeed.toFixed(2)}
                    needleColor="red"
                    startColor="green"
                    segments={10}
                    endColor="blue"
                    textColor={textColor}
                  />
                </div>
              </Col>
              <Col sm={9}>
                <RoadAAvgSpeedAreaChart />
              </Col>
            </Row>

            {/* <Row>
            <h3 className="h3margin">Traffic levels change over time</h3>
            <RoadBAllAreaChart />
          </Row> */}

            <Row>
              <h3 className="h3margin">Average speed with Traffic level</h3>
              <RoadAAvgWithTrafficLevelBar />
            </Row>

            {/* <Row>
            <h3 className="h3margin">Speed Meter</h3>
            <SpeedMeterRoadB />
          </Row> */}

            <Row>
              <Col sm={5} className="speedmargin1">
                <h3 className="h3margin">
                  Duration In-Traffic change over time
                </h3>
                <CustomRoadADuration />
              </Col>

              <Col sm={7} className="speedmargin1">
                <h3 className="h3margin"></h3>
                <RoadAAll />
              </Col>
            </Row>

            {/* <Row>
            <h3 className="h3margin">All in one</h3>
            <RoadBAll />
          </Row> */}
          </div>
        </Container>
      </div>
    </div>
  );
};

//   );
// };

export default RoadATrafficPrediction;
