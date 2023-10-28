

import React from "react";
import "./styles.css"
// import "../SideNavigationBar/SideNavigationBar.css";
// import SideNavigationBar from "../SideNavigationBar/SideNavigationBar";

export default function GoogleMapView() {
  return (


    <div
    style={{
    //   width: "1600px",
    //   height: "800px",
      // background: "lightblue",
    //   border: "5px solid",
    //   borderColor: "transparent",
    //   borderRadius: "10px",
    //   animation: "traffic-light 3s linear infinite", // Apply the animation
    }}
  >

    {/* <SideNavigationBar /> */}

    <div style={{ width: "100%", height: "100%" }}>
      <iframe
        src="/index1.html" // Replace with the URL or relative path to your HTML page
        title="Embedded HTML Page"
        style={{ width: "100%", height: "800px" }}
        // frameBorder="0"
        // scrolling="auto"
      />
    </div>



  </div>
  );
}

