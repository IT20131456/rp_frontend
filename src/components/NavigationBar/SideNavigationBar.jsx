/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "../Dashboard/Dashboard.css";
import "./NavigationStyle.css";

function Dashboard() {
  const [style, setStyle] = useState(
    "navbar-nav sidebar sidebar-dark accordion"
  );

  const changeStyle = () => {
    if (style == "navbar-nav sidebar sidebar-dark accordion") {
      setStyle("navbar-nav sidebar sidebar-dark accordion toggled");
    } else {
      setStyle("navbar-nav sidebar sidebar-dark accordion");
    }
  };

  return (
    <div>
      <body id="page-top">
        {/*  <!-- Page Wrapper --> */}
        <div id="wrapper">
          {/*  <!-- Sidebar --> */}
          <ul
            className={`${style} sidebar-nav`}
            id="accordionSidebar"
            style={{ backgroundColor: "#2c3e50" }}
          >
            {/*  <!-- Sidebar - Brand --> */}
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="#"
            >
              <div className="sidebar-brand-icon">
                <i className="fas fa-traffic-light"></i>
              </div>

              <div className="sidebar-brand-text mx-3">TLMS Admin</div>
              <div className="text-center d-none d-md-inline">
                {/* <button
                  className="rounded-circle border-0"
                  id="sidebarToggle"
                  onClick={changeStyle}
                ></button> */}
              </div>
            </a>

            {/*   <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/*  <!-- Nav Item - Dashboard --> */}
            <li className="nav-item active">
              <a className="nav-link" href="/home">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>

            {/*  <!-- Divider --> */}
            <hr className="sidebar-divider" />

            {/*   <!-- Heading --> */}
            <div className="sidebar-heading">Interface</div>

            {/*  <!-- Nav Item - Pages Collapse Menu --> */}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <i className="fas fa-fw fa-cog"></i>
                <span>Components</span>
              </a>
              <div
                id="collapseOne"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Custom Components :</h6>
                  <a className="collapse-item" href="buttons.html">
                    Buttons
                  </a>
                  <a className="collapse-item" href="cards.html">
                    Cards
                  </a>
                </div>
              </div>
            </li> 
                    
            <li className="nav-item">
              <a className="nav-link" href="/evdashbord">
                <i className="fas fa-fw fa-ambulance"></i>
                <span>Emergency Vehicles</span>
              </a>
            </li>

            {/*  <!-- Nav Item - Traffic Density --> */}
            <li className="nav-item">
              <a className="nav-link" href="/trafficdensitydashboard">
                <i className="fas fa-car"></i>
                <span>Traffic Density</span>
              </a>
            </li>

            {/*  <!-- Nav Item - Configurations --> */}
            <li className="nav-item">
              <a className="nav-link" href="/configuration">
                <i className="fas fa-fw fa-cog"></i>
                <span>Configurations</span>
              </a>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider d-none d-md-block" />
          </ul>
        </div>
      </body>
    </div>
  );
}

export default Dashboard;
