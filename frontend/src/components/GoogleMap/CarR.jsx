import React from "react";
import "./CarR.css"; // Import the CSS file for styling

function CarR({ delay, state }) {
    // const state = 1


    let animationName;

    // Determine the animation based on the state value
    if (state === 1) {
      animationName = "moveCar";
    } else if (state === 2) {
      animationName = "moveCarRightToLeft";
    }



  const carStyle = {
    animationDelay: `${delay}s`, // Apply the delay to stagger the animations
    animationName: animationName, // Set the animation to the determined animation
  };

  return <div className="car" style={carStyle}> <strong></strong></div>;
}

export default CarR;