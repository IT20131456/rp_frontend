import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './RoadJunction.css'; // Import your custom CSS for road graphics

function RoadJunction() {
  // Define the initial traffic light states
  const [northLight, setNorthLight] = useState('red');
  const [southLight, setSouthLight] = useState('red');
  const [eastLight, setEastLight] = useState('green');
  const [westLight, setWestLight] = useState('green');

  // Function to toggle the traffic lights
  const toggleTrafficLights = () => {
    setNorthLight((prevState) => (prevState === 'red' ? 'green' : 'red'));
    setSouthLight((prevState) => (prevState === 'red' ? 'green' : 'red'));
    setEastLight((prevState) => (prevState === 'red' ? 'green' : 'red'));
    setWestLight((prevState) => (prevState === 'red' ? 'green' : 'red'));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Road Junction</h1>
          <hr />

          {/* Road Graphics */}
          <div className="road-junction">
            {/* North-South Road */}
            <div className="road vertical-road"></div>

            {/* East-West Road */}
            <div className="road horizontal-road"></div>

            {/* Traffic Lights */}
            <div className={`traffic-light north-light ${northLight}`}></div>
            <div className={`traffic-light south-light ${southLight}`}></div>
            <div className={`traffic-light east-light ${eastLight}`}></div>
            <div className={`traffic-light west-light ${westLight}`}></div>
          </div>

          <Button variant="primary" onClick={toggleTrafficLights}>
            Toggle Traffic Lights
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default RoadJunction;
