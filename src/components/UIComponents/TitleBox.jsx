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

const TitleBox = ({ title, link }) => {
  return (
    <div>
      <Link to={`/${link}`} style={{ textDecoration: "none" }}>
        <div style={itemStyles}>
          <h5 style={{ textAlign: "center", color: "white" }}>{title}</h5>
        </div>
      </Link>
    </div>
  );
};

export default TitleBox;
