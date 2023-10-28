import React from "react";
import TitleBar from "../UIComponents/TitleBar.jsx";
import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import "../NavigationBar/NavigationStyle.css";

export default function ODMPreview() {
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
          <TitleBar title={"ODM Preview"} />

          <div>
            <iframe
              src="http://127.0.0.1:5000/"
              width="100%"
              height="500px"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
