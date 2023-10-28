import React from "react";
import { Link } from "react-router-dom";

const itemStyles = {
  width: "300px",
  height: "100px",
  margin: "10px",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: "#3bb19b",
  transition: "background-color 0.3s",
  ":hover": {
    backgroundColor: "#2a7e64", // Change the background color on hover
  },
};

const TitleBox2 = ({ title, subTitle, link, icon, color }) => {
  return (
    <div>
      <Link to={`/${link}`} style={{ textDecoration: "none" }}>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className={`card border-left-${color} shadow h-100 py-2`}>
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className={`text-s font-weight-bold text-${color} text-uppercase mb-1`}>
                    {title}
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        {subTitle}
                      </div>
                    </div>
                    <div className="col">
                      <div className="progress progress-sm mr-2">
                        <div
                          className="progress-bar bg-info a1"
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                <i className={`${icon} fa-2x text-gray-300 text-${color}`}></i>
                  {/* <i className="fas fa-clipboard-list fa-2x text-gray-300 text-info"></i> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TitleBox2;
