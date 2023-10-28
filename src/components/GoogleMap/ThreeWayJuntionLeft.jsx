import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ThreeWayJunction.css"; // Create a CSS file for styling
import { Container } from "react-bootstrap";
import CarL from "./CarL"; 
import CarR from "./CarR";

function ThreeWayJunction(props) {

    const {value1} = props;
    const carElements = [];

    if (value1 === 1) {

    const numCars = 1000; // Number of cars you want to animate

  
  
    for (let i = 0; i < numCars; i++) {
      carElements.push(<CarL key={i} delay={i } state={value1} animationName="moveCar" />);
    }

}
else if (value1 === 2) {
    
    const numCars = 1000; // Number of cars you want to animate

  
  
    for (let i = 0; i < numCars; i++) {
      carElements.push(<CarR key={i} delay={i } state={value1} animationName="moveCarRightToLeft" />);
    }

}

    
  return (
    <Container>
    <div className="junction">
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

export default ThreeWayJunction;
