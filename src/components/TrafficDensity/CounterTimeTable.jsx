import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Container, Table, Badge } from "react-bootstrap";
import "./css/CounterTimeTable.css";

export default function CounterTimeTable() {
  const [trafficData, setTrafficData] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/trafficCounterDetails/getAll")
      .then((res) => {
        setTrafficData(res.data.exsitingTraffic);
      })
      .catch((error) => {
        console.error("Error fetching traffic data:", error);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Container className="shadow pt-2 pb-2 bg-white mt-4 border rounded">
        <Form className="mt-2 p-3">
          <div className="row">
            <div className="col-md-9">
              <h5>Counter Time</h5>
            </div>

            <div className="row"></div>
            <div className="col-md-12">
              <hr style={{ height: 10 }} />
            </div>
          </div>
        </Form>
        <div className="pl-3 pr-3">
          {trafficData.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Traffic Light ID</th>
                  <th>Near Area Vehcile Count</th>
                  <th>Far Area Vehcile Count</th>
                  <th>Current Counter Time</th>
                  <th>Traffic Level</th>
                </tr>
              </thead>
              <tbody>
                {trafficData.map((feed) => (
                  <>
                    <tr>
                      <td>Lane 01</td>
                      <td>{feed.lane01NearAreaCount}</td>
                      <td>{feed.lane01FarAreaCount}</td>
                      <td>{feed.lane01CounterTime}</td>
                      {feed.lane01CounterTime === "60"
                        ? <td><h5><Badge bg="danger">High</Badge></h5></td>
                        : feed.lane01CounterTime === "40"
                        ? <td><h5><Badge bg="warning">Medium</Badge></h5></td>
                        : <td><h5><Badge bg="success">Low</Badge></h5></td>}
                    </tr>
                    <tr>
                      <td>Lane 02</td>
                      <td>{feed.lane02NearAreaCount}</td>
                      <td>{feed.lane02FarAreaCount}</td>
                      <td>{feed.lane02CounterTime}</td>
                      {feed.lane02CounterTime === "60"
                        ? <td><h5><Badge bg="danger">High</Badge></h5></td>
                        : feed.lane01CounterTime === "40"
                        ? <td><h5><Badge bg="warning">Medium</Badge></h5></td>
                        : <td><h5><Badge bg="success">Low</Badge></h5></td>}
                    </tr>
                    <tr>
                      <td>Lane 03</td>
                      <td>{feed.lane03NearAreaCount}</td>
                      <td>{feed.lane03FarAreaCount}</td>
                      <td>{feed.lane03CounterTime}</td>
                      {feed.lane03CounterTime === "60"
                        ? <td><h5><Badge bg="danger">High</Badge></h5></td>
                        : feed.lane01CounterTime === "40"
                        ? <td><h5><Badge bg="warning">Medium</Badge></h5></td>
                        : <td><h5><Badge bg="success">Low</Badge></h5></td>}
                    </tr>
                    <tr>
                      <td>Lane 04</td>
                      <td>{feed.lane04NearAreaCount}</td>
                      <td>{feed.lane04FarAreaCount}</td>
                      <td>{feed.lane04CounterTime}</td>
                      {feed.lane04CounterTime === "60"
                        ? <td><h5><Badge bg="danger">High</Badge></h5></td>
                        : feed.lane01CounterTime === "40"
                        ? <td><h5><Badge bg="warning">Medium</Badge></h5></td>
                        : <td><h5><Badge bg="success">Low</Badge></h5></td>}
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No traffic data available.</p>
          )}
        </div>
        {/* ... rest of the component code */}
      </Container>
    </div>
  );
}
