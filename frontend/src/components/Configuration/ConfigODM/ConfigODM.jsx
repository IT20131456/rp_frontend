import React from "react";
import SideNavigationBar from "../../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../../NavigationBar/TopNavigationBar";
import "../../NavigationBar/NavigationStyle.css";
import TitleBar from "../../UIComponents/TitleBar.jsx";
import ConfigCamera from "./ConfigCamera";

// Config Object Detection Model
export default function ConfigODM() {
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
          <TitleBar title="Config Object Detection Model" />
          <ConfigCamera />
        </div>
      </div>
    </div>
  );
}
