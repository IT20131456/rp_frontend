import React from "react";
import TitleBar from "../UIComponents/TitleBar.jsx";
import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import "../NavigationBar/NavigationStyle.css";
import { Form, Container, Button } from "react-bootstrap";
import CounterTimeTable from "./CounterTimeTable";
import TrafficSimulation from "./TrafficSimulation";

export default function CurrentTrafficInfo() {
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

        <div className="content-column">
          <TitleBar title={"Traffic Density Dashboard"} />

          <CounterTimeTable />
          <TrafficSimulation />
        </div>
      </div>
    </div>
  );
}
