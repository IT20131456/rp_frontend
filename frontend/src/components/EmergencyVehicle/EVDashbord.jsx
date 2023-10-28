import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Container, Button } from "react-bootstrap";
import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import "../NavigationBar/NavigationStyle.css";
import TitleBar from "../UIComponents/TitleBar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";

export default function EVDashbord() {
  const [data, setData01] = useState([]);
  const [ambulanceSum, setAmbulanceSum] = useState(0);
  const [firetruckSum, setFiretruckSum] = useState(0);
  const [policeSum, setPoliceSum] = useState(0);
  const [avgspeed, setAvgSpeed] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/emergency-vehicle/getAll`)
      .then((response) => {
        console.log("API Response:", response.data);

        if (Array.isArray(response.data.exsitingEmergencyVehicle)) {
          let ambulanceSum = 0;
          let firetruckSum = 0;
          let policeSum = 0;
          let totalspeed = 0;
          let avgspeedCount = 0;

          response.data.exsitingEmergencyVehicle.forEach((item) => {
            ambulanceSum += item.ambulance_count;
            firetruckSum += item.firetruck_count;
            policeSum += item.police_count;
            totalspeed += parseFloat(item.speed);

            if (item.speed !== null) {
              totalspeed += parseFloat(item.speed);
              avgspeedCount++;
            }
          });

          const avgspeed = totalspeed / (avgspeedCount * 2);

          setAmbulanceSum(ambulanceSum);
          setFiretruckSum(firetruckSum);
          setPoliceSum(policeSum);
          setAvgSpeed(avgspeed.toFixed(2));

          console.log("Ambulance Sum:", ambulanceSum);
          console.log("Fire Truck Sum:", firetruckSum);
          console.log("Police Vehicle Sum:", policeSum);
          console.log("sum of speed:", totalspeed);
          console.log("speed count:", avgspeedCount);

          // Update data for the chart
          setData01([
            { name: "Ambulance", percentage: ambulanceSum, fill: "#8884d8" },
            { name: "Fire Truck", percentage: firetruckSum, fill: "#82ca9d" },
            { name: "Police Vehicle", percentage: policeSum, fill: "#ffc658" },
          ]);
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
          <TitleBar title="Emergency Vehicle Dashboard" />

          {/*  <!-- Content Row --> */}
          <div className="row mt-4">
            <div className="col-xl-3 col-md-6 mb-4">
              <a href="/junctiondetails" style={{ textDecoration: "none" }}>
                <div className="card border-left-primary bg-white shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="h5 mb-0 font-weight-bold text-primary text-uppercase mb-1 ml-2">
                          Junction configuration
                        </div>
                      </div>
                      <div className="col-auto mr-2">
                        <i className="fas fa-cogs fa-2x text-primary"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <a href="/evvisualization" style={{ textDecoration: "none" }}>
                <div className="card border-left-success bg-white shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="h5 mb-0 font-weight-bold text-success text-uppercase mb-1 ml-2">
                          visualize vehicle data
                        </div>
                      </div>
                      <div className="col-auto mr-2">
                        <i className="fas fa-chart-bar fa-2x text-success"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">

      <a href="http://127.0.0.1:5000/" style={{ textDecoration: "none" }}  >
        <div className="card border-left-danger bg-white shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="h5 mb-0 font-weight-bold text-danger text-uppercase mb-1 ml-2">
                  Object detection model preview
                </div>              
              </div>
              <div className="col-auto mr-2">
                <i className="fas fa-ambulance fa-2x text-danger"></i>
              </div>       

            </div>
          </div>
        </div>
      </a>
    </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <a
                href="/evtrafficlightcontroller"
                style={{ textDecoration: "none" }}
              >
                <div className="card border-left-primary bg-white shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="h5 mb-0 font-weight-bold text-info text-uppercase mb-1 ml-2">
                          traffic light controller
                        </div>
                      </div>
                      <div className="col-auto mr-2">
                        <i className="fas fa-traffic-light fa-2x text-info"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <Container className="shadow p-2 bg-white mt- border rounded">
            <Form className="mt-2 p-3">
              <div className="row">
                <div className="col-md-9">
                  <h4>Emergency Vehicle Data Analysis</h4>
                </div>
                <div className="col-md-3 d-flex flex-column align-items-end">
                  <h5
                    style={{ fontSize: "15px" }}
                    className="bg-success text-white p-2 rounded"
                  >
                    Last Update at {formattedDateTime}
                  </h5>
                </div>
                <div className="col-md-12">
                  <hr style={{ height: 10 }} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <h5 className="p-3">Distribution of the vehicle Count</h5>
                  <BarChart width={530} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name">
                      <Label
                        angle={0}
                        position="bottom"
                        style={{ textAnchor: "middle" }} // Adjust the text anchor
                      />
                    </XAxis>
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
                    <Bar dataKey="percentage" fill="#82ca9d"></Bar>
                  </BarChart>
                </div>

                <div className="col-md-6">
                  <row>
                    <col-md-6 class="d-flex justify-content-end">
                      <Link to="/cctvvideolink">
                        <Button className="bg-dark text-white m-1 ml-0">
                          Check CCTV &nbsp;<FontAwesomeIcon icon={faVideo} />
                        </Button>
                      </Link>
                    </col-md-6>
                  </row>

                  <div className="row mt-5">
                    <div className="col-md-6">
                      <div className="card bg-white shadow h-30 py-2">
                        <h5
                          className="text-center"
                          style={{ color: "#8884d8" }}
                        >
                          Tot Ambulance Count
                        </h5>
                        <h3
                          className="text-center"
                          style={{ color: "#8884d8" }}
                        >
                          {ambulanceSum}
                        </h3>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card bg-white shadow h-30 py-2">
                        <h5
                          className="text-center"
                          style={{ color: "#82ca9d" }}
                        >
                          Tot Fire Truck Count
                        </h5>
                        <h3
                          className="text-center"
                          style={{ color: "#82ca9d" }}
                        >
                          {firetruckSum}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-6">
                      <div className="card bg-white shadow h-30 py-2">
                        <h5
                          className="text-center"
                          style={{ color: "#ffc658" }}
                        >
                          Tot Police Vehicle Count
                        </h5>
                        <h3
                          className="text-center"
                          style={{ color: "#ffc658" }}
                        >
                          {policeSum}
                        </h3>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card bg-white shadow h-30 py-2">
                        <h5 className="text-center" style={{ color: "red" }}>
                          Average Speed
                        </h5>
                        <h3 className="text-center" style={{ color: "red" }}>
                          {avgspeed} Km/h
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
}
