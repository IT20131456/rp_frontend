import React from "react";
import { Form, Container } from "react-bootstrap";
import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import "../NavigationBar/NavigationStyle.css";
import TitleBar from "../UIComponents/TitleBar.jsx";

export default function EVODModelPreview() {
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
          <TitleBar title="Object Detection Model Preview" />
          <div>
            <iframe
              src="http://127.0.0.1:5000/"
              width="100%"
              height="1200px"
              className="mt-4 shadow"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
