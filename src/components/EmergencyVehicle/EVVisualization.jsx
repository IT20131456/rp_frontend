import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Container, Button } from "react-bootstrap";
import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import "../NavigationBar/NavigationStyle.css";
import TitleBar from "../UIComponents/TitleBar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Pie,
  PieChart,
  Cell,
  ScatterChart,
  Line,
  LineChart,
  Scatter,
  ZAxis,
  Label,
} from "recharts";

export default function EVVisualization() {
  const [data01, setData01] = useState([]);
  const [data02, setData02] = useState([]);
  const [data03, setData03] = useState([]);
  const [cameraData, setCameraData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/emergency-vehicle/getAll`)
      .then((response) => {
        console.log("API Response:", response.data);

        if (Array.isArray(response.data.exsitingEmergencyVehicle)) {
          const uniqueDateTime = new Set();
          const cleanedData = [];
          const cleanedData2 = [];
          const cleanedData3 = [];

          response.data.exsitingEmergencyVehicle.forEach((item) => {
            const dateTime = item.vehicle_detect_timestamp; // Extract the date and time (adjust as needed)

            if (!uniqueDateTime.has(dateTime)) {
              uniqueDateTime.add(dateTime);
              cleanedData.push({
                name: dateTime,
                ambulance: item.ambulance_count,
                fireTruck: item.firetruck_count,
                policeVehicle: item.police_count,
              });

              let speed1 = 0; // Default value for Ambulance speed
              let speed2 = 0; // Default value for Fire Truck speed
              let speed3 = 0; // Default value for Police Vehicle speed
              if (item.label.startsWith("Ambulance")) {
                speed1 = item.speed;
              } else if (item.label.startsWith("Fire Truck")) {
                speed2 = item.speed;
              } else if (item.label.startsWith("Police Vehicle")) {
                speed3 = item.speed;
              }
              cleanedData2.push({
                name: dateTime,
                speed1: speed1,
                speed2: speed2,
                speed3: speed3,
              });
            }
          });

          setData01(cleanedData);
          setData02(cleanedData2);
          setData03(cleanedData3);

          const cameraDataMap = new Map();

          response.data.exsitingEmergencyVehicle.forEach((item) => {
            const cameraId = item.camera_id; // Extract the camera ID (adjust as needed)

            if (!cameraDataMap.has(cameraId)) {
              cameraDataMap.set(cameraId, {
                Ambulance: 0,
                Fire_Truck: 0,
                Police_Vehicle: 0,
              });
            }

            const camera = cameraDataMap.get(cameraId);
            camera.Ambulance += item.ambulance_count;
            camera.Fire_Truck += item.firetruck_count;
            camera.Police_Vehicle += item.police_count;
          });

          const orderedCameraIds = ["Lane01", "Lane02", "Lane03", "Lane04"]; // Add more camera IDs as needed
          const newData = orderedCameraIds.map((cameraId) => {
            const counts = cameraDataMap.get(cameraId) || {
              Ambulance: 0,
              Fire_Truck: 0,
              Police_Vehicle: 0,
            };
            return {
              name: cameraId,
              Ambulance: counts.Ambulance,
              Fire_Truck: counts.Fire_Truck,
              Police_Vehicle: counts.Police_Vehicle,
            };
          });

          setCameraData(newData);
        }
      });
  }, []);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const handlePageRefresh = () => {
      // Capture the current date and time when the page is refreshed
      setCurrentDateTime(new Date());
    };

    // Add an event listener to detect page refresh
    window.addEventListener("beforeunload", handlePageRefresh);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("beforeunload", handlePageRefresh);
    };
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString(); // Format the date and time as needed

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

        {/* Content Column */}
        <div className="content-column m-3 mt-3">
          <TitleBar title="Visualize Emergency Vehicle Data" />
          <div className="mt-4">
            <Container className="shadow p-2 bg-white mt-5 border rounded">
              <Form className="mt-2 p-3">
                <div className="row">
                  <div className="col-md-6">
                    <h4>Time-Based Emergency Vehicle Analytics</h4>
                  </div>
                  <div className="col-md-3 d-flex flex-column align-items-end">
                    <Link to="/evreports">
                      <Button className="bg-success text-white m- ml-0">
                        View Reports &nbsp;
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </Link>
                  </div>

                  <div className="col-md-3 d-flex flex-column align-items-end">
                    <h5
                      style={{ fontSize: "15px" }}
                      className="bg-secondary text-white p-2 rounded"
                    >
                      Last Update at {formattedDateTime}
                    </h5>
                  </div>
                  <div className="col-md-12">
                    <hr style={{ height: 10 }} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 ml-4">
                    <LineChart
                      width={1030}
                      height={400}
                      data={data01}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis>
                        <Label
                          value="Emergency Vehicle Count"
                          angle={-90}
                          position="insideLeft"
                          className="p-3"
                          style={{ textAnchor: "middle" }} // Adjust the text anchor
                        />
                      </YAxis>
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="ambulance"
                        stroke="#FF5733"
                        name="Ambulance"
                      />
                      <Line
                        type="monotone"
                        dataKey="fireTruck"
                        stroke="#FFC300"
                        name="Fire Truck"
                      />
                      <Line
                        type="monotone"
                        dataKey="policeVehicle"
                        stroke="#33FFBD"
                        name="Police Vehicle"
                      />
                    </LineChart>
                  </div>
                </div>
              </Form>
            </Container>

            <Container className="shadow p-2 bg-white mt-5 border rounded">
              <Form className="mt-2 p-3">
                <div className="row">
                  <div className="col-md-6">
                    <h4>Lane-wise Emergency Vehicle Analytics</h4>
                  </div>

                  <div className="col-md-12">
                    <hr style={{ height: 10 }} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 ml-4">
                    <BarChart width={1030} height={400} data={cameraData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name"></XAxis>
                      <YAxis>
                        <Label
                          value="Emergency Vehicle Count"
                          angle={-90}
                          position="insideLeft"
                          className="p-3"
                          style={{ textAnchor: "middle" }} // Adjust the text anchor
                        />
                      </YAxis>
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Ambulance" fill="#8884d8" />
                      <Bar dataKey="Fire_Truck" fill="#FF5733" />
                      <Bar dataKey="Police_Vehicle" fill="#33FFBD" />
                    </BarChart>
                  </div>
                </div>
              </Form>
            </Container>

            <Container className="shadow p-2 bg-white mt-5 border rounded">
              <Form className="mt-2 p-3">
                <div className="row">
                  <div className="col-md-9">
                    <h4>Speed-Base Emergency Vehicle Analytics</h4>
                  </div>
                  <div className="col-md-12">
                    <hr style={{ height: 10 }} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 ml-4">
                    <LineChart
                      width={1030}
                      height={400}
                      data={data02}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis>
                        <Label
                          value="Emergency Vehicle Speed (km/h)"
                          angle={-90}
                          position="insideLeft"
                          className="p-3"
                          style={{ textAnchor: "middle" }} // Adjust the text anchor
                        />
                      </YAxis>
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="speed1"
                        stroke="#FF5733"
                        name="Ambulance"
                      />
                      <Line
                        type="monotone"
                        dataKey="speed2"
                        stroke="#FFC300"
                        name="Fire Truck"
                      />
                      <Line
                        type="monotone"
                        dataKey="speed3"
                        stroke="#33FFBD"
                        name="Police Vehicle"
                      />
                    </LineChart>
                  </div>
                </div>
              </Form>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}
