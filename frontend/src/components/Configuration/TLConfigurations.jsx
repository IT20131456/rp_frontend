import React from "react";
import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import "../NavigationBar/NavigationStyle.css";
import TitleBar from "../UIComponents/TitleBar.jsx";
import ResponsiveGrid from "../UIComponents/Grid2.jsx";

export default function TLConfigurations() {
  const TLConfig = [
    { titleName: "Junction Details", link: "junctiondetails" },
    { titleName: "Config CCTV", link: "cctvvideolink" },
    { titleName: "Config ODM", link: "configodm" },
    { titleName: "Config Traffic Lights", link: "configtrafficlight" },
    
   
    
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
          <TitleBar title="Junction 01 Configurations" />
          <div className=" p-3">
            <ResponsiveGrid
              rows={2}
              columns={2}
              gap="20px"
              gridItems={TLConfig} />            
          </div>
        </div>
      </div>
    </div>
  );
}
