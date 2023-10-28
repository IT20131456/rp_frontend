import React from "react";
import "./CarL.css"; // Import the CSS file for styling

function Car({ delay }) {
  const carStyle = {
    animationDelay: `${delay}s`, // Apply the delay to stagger the animations
  };

  return <div className="car" style={carStyle}> <strong></strong></div>;
}

export default Car;
