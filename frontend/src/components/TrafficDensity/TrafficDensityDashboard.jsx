import React from "react";
import { Link } from "react-router-dom";
import TitleBar from "../UIComponents/TitleBar.jsx";
import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import "../NavigationBar/NavigationStyle.css";
import { Form, Container, Button } from "react-bootstrap";
import CounterTimeTable from "./CounterTimeTable";
import TrafficSimulation from "./TrafficSimulation";

export default function TrafficDensityDashboard() {
  
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
        <div className="content-column">
          <TitleBar title={"Traffic Density Dashboard"} />

          <br />
          <div className="row">
            <div
              className="col-xl-3 col-md-6 mb-4"
              onClick={() => {
                window.location.href = '/trafficcontrolmethod';
                //setSelectedTrafficControlMethod(1);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-s font-weight-bold text-success text-uppercase mb-1">
                        Traffic Control Method
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        #
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-traffic-light fa-2x text-gray-300 text-success"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-xl-3 col-md-6 mb-4"
              onClick={() => {
                window.location.href = '/currenttrafficinfo';
                //setSelectedTrafficControlMethod(2);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-s font-weight-bold text-primary text-uppercase mb-1">
                        Current Traffic Info
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        #
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-traffic-light fa-2x text-gray-300 text-primary"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-xl-3 col-md-6 mb-4"
              onClick={() => {
                window.open('https://www.google.com', '_blank');
                //setSelectedTrafficControlMethod(2);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="card border-left-danger shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-s font-weight-bold text-danger text-uppercase mb-1">
                        ODM Preview
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        #
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-traffic-light fa-2x text-gray-300 text-danger"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-xl-3 col-md-6 mb-4"
              onClick={() => {
                window.location.href = '/tlconfigurations';
                //setSelectedTrafficControlMethod(2);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-s font-weight-bold text-info text-uppercase mb-1">
                        Traffic Light Config
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        #
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-traffic-light fa-2x text-gray-300 text-info"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>

          
        </div>
      </div>
    </div>
  );
}
