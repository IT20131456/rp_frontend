import React from "react";
import TitleBar from "../UIComponents/TitleBar.jsx";
import TitleBox from "../UIComponents/TitleBox.jsx";
import TitleBox2 from "../UIComponents/TitleBox2.jsx";
import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import "../NavigationBar/NavigationStyle.css";

export default function Configuration() {
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
          <TitleBar title={"Configurations"} />
          <br />
          <TitleBox2 title={"Traffic Light Control List"} subTitle={""} link={"tlcontrollerlist"} icon={"fas fa-fw fa-cog"} color={"success"} />
        </div>
      </div>
    </div>
  );
}
