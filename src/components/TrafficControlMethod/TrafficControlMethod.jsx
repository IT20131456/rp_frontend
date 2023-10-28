import { React, useState } from "react";
import TitleBar from "../UIComponents/TitleBar.jsx";
import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import "../NavigationBar/NavigationStyle.css";
import { Form, Container, Button } from "react-bootstrap";
import DynamicControlMode from "./DynamicControlMode.jsx";
import ManualControlMode from "./ManualControlMode.jsx";

export default function TrafficControlMethod() {
  const [selectedTrafficControlMethod, setSelectedTrafficControlMethod] =
    useState(1);

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
          <TitleBar title={"Traffic Control Method"} />

         <br/>
            <div className="row">
              <div
                className="col-xl-3 col-md-6 mb-4"
                onClick={() => {
                  // Your onClick logic goes here
                  setSelectedTrafficControlMethod(1);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="card border-left-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          Dynamic Control Method
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          Active
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
                  // Your onClick logic goes here
                  setSelectedTrafficControlMethod(2);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="card border-left-danger shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                          Manual Control Method
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          Deactive
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-traffic-light fa-2x text-gray-300 text-danger"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
     

          <div >
          {selectedTrafficControlMethod === 1 ? <DynamicControlMode/> : <ManualControlMode/>}
          </div>
            
            
        </div>
      </div>
    </div>
  );
}
