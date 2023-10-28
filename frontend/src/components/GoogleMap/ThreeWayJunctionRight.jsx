import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ThreeWayRight.css"; // Create a CSS file for styling
import { Container } from "react-bootstrap";
import CarR from "./CarR"; // Import your Car component

function ThreeWayJunctionRight() {
  const numCars = 1000; // Number of cars you want to animate

  const carElements = [];

  for (let i = 0; i < numCars; i++) {
    carElements.push(<CarR key={i} delay={i / 10}  />);
  }

  return (
    <Container>
      <div className="junction">
        <div className="road horizontal"></div>
        <div className="road vertical"></div>
        {/* <div className="road left">
       
        </div> */}
        {/* <div className="car-wrapper">{carElements}</div> */}
      </div>
    </Container>
  );
}

export default ThreeWayJunctionRight;
