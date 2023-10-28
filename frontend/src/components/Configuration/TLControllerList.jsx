import React from "react";
import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import "../NavigationBar/NavigationStyle.css";
import ResponsiveGrid from "../UIComponents/Grid2.jsx";
import TitleBar from "../UIComponents/TitleBar.jsx";

export default function TLControllerList() {
  //const titles = ["Junction 01", "Junction 02", "Junction 03", "Junction 04", "Junction 05"];

  const titles = [
    { titleName: "Junction 01", link: "tlconfigurations" },
    { titleName: "Junction 02", link: "tlconfigurations" },
    { titleName: "Junction 03", link: "tlconfigurations" },
    { titleName: "Junction 04", link: "tlconfigurations" },
    { titleName: "Junction 05", link: "tlconfigurations" },
    { titleName: "Junction 06", link: "tlconfigurations" },
  ];

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
          <TitleBar title="Traffic Light Controllers List" />

          <div style={{ margin: "25px" }}>
            <ResponsiveGrid
              rows={2}
              columns={3}
              gap="20px"
              gridItems={titles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
