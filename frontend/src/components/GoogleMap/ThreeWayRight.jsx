import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ThreeWayJunction.css"; // Create a CSS file for styling
import { Container } from "react-bootstrap";
import Car from "./CarR"; 

function ThreeWayJunctionR() {

    const numCars = 1000; // Number of cars you want to animate

    const carElements = [];
  
    for (let i = 0; i < numCars; i++) {
      carElements.push(<Car key={i} delay={i }  animationName="moveCar" />);
    }
    
  return (
    <Container>
    <div className="junction rotate-left">
      <div className="road horizontal"></div>
      {/* <div className="road vertical"></div> */}
      <div className="road left">
    
      
      {/* <div className="arrow"></div> */}

    
      </div>
   
     

        <div className="car-wrapper">{carElements}</div>
      
    </div>
    </Container>
  );
}

export default ThreeWayJunctionR;
