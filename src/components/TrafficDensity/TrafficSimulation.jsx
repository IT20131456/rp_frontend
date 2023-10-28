import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Container, Table, Badge } from "react-bootstrap";
import "./css/TrafficSimulation.css"; // Import the CSS file for styling

const TrafficSimulation = () => {
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
    <div style={{ width: "700px" }}>
      <Container className="shadow pt-2 pb-2 bg-white mt-4 border rounded">
        <Form className="mt-2 p-3">
          <div className="row">
            <div className="col-md-9">
              <h5>Current Traffic</h5>
            </div>

            <div className="row"></div>
            <div className="col-md-12">
              <hr style={{ height: 10 }} />
            </div>
          </div>
        </Form>
        <div className="pl-3 pr-3">
          <table>
            {trafficData.map((feed) => (
              <>
                <tr>
                  <td className="box-size grass"></td> {/* 0,0 box id */}
                  <td className="box-size grass"></td> {/* 0,1 box id */}
                  <td className="box-size grass right-border"></td>  {/* 0,2 box id */}
                  <td className="box-size raod-lane"></td> {/* 0,3 box id */}
                  <td className="box-size raod-lane left-border"></td> {/* 0,4 box id */}
                  <td className="box-size grass left-border"><p className="lane-text">Lane 01</p></td> {/* 0,5 box id */}
                  <td className="box-size grass"></td> {/* 0,6 box id */}
                  <td className="box-size grass"></td> {/* 0,7 box id */}
                </tr>
                <tr>
                  <td className="box-size grass"></td> {/* 1,0 box id */}
                  <td className="box-size grass"></td>  {/* 1,1 box id */}
                  <td className="box-size grass right-border"></td>  {/* 1,2 box id */}
                  <td className="box-size raod-lane"></td> {/* 1,3 box id */}
                  <td className="box-size raod-lane left-border far-area-border"><p className="far-area-count-text">{feed.lane01FarAreaCount}</p></td> {/* 1,4 box id */}
                  <td className="box-size grass left-border"></td> {/* 1,5 box id */}
                  <td className="box-size grass"></td> {/* 1,6 box id */}
                  <td className="box-size grass"></td> {/* 1,7 box id */}
                </tr>
                <tr>
                  <td className="box-size grass"><p className="lane-text">Lane 04</p></td> {/* 2,0 box id */}
                  <td className="box-size grass"></td> {/* 2,1 box id */}
                  <td className="box-size grass right-border digit-font"><p className="counter-time-text">{feed.lane04CounterTime}</p></td>  {/* 2,2 box id */}
                  <td className="box-size raod-lane"></td> {/* 2,3 box id */}
                  <td className="box-size raod-lane left-border bottom-border near-area-border"><p className="near-area-count-text">{feed.lane01NearAreaCount}</p></td>  {/* 2,4 box id */}
                  <td className="box-size grass left-border"><p className="counter-time-text">{feed.lane01CounterTime}</p></td> {/* 2,5 box id */}
                  <td className="box-size grass"></td> {/* 2,6 box id */}
                  <td className="box-size grass"></td> {/* 2,7 box id */}
                </tr>
                <tr>
                  <td className="box-size raod-lane top-border"></td>  {/* 3,0 box id */}
                  <td className="box-size raod-lane top-border far-area-border"><p className="far-area-count-text">{feed.lane04FarAreaCount}</p></td>  {/* 3,1 box id */}
                  <td className="box-size raod-lane top-border right-border near-area-border"><p className="near-area-count-text">{feed.lane04NearAreaCount}</p></td>  {/* 3,2 box id */}
                  <td className="box-size raod-lane"></td> {/* 3,3 box id */}
                  <td className="box-size raod-lane"></td> {/* 3,4 box id */}
                  <td className="box-size raod-lane top-border"></td>  {/* 3,5 box id */}
                  <td className="box-size raod-lane top-border"></td>  {/* 3,6 box id */}
                  <td className="box-size raod-lane top-border"></td>  {/* 3,7 box id */}
                </tr>
                <tr>
                  <td className="box-size raod-lane bottom-border top-border"></td> {/* 4,0 box id */}
                  <td className="box-size raod-lane bottom-border top-border"></td> {/* 4,1 box id */}
                  <td className="box-size raod-lane bottom-border top-border"></td> {/* 4,2 box id */}
                  <td className="box-size raod-lane"></td> {/* 4,3 box id */}
                  <td className="box-size raod-lane"></td> {/* 4,4 box id */}
                  <td className="box-size raod-lane bottom-border top-border left-border near-area-border"><p className="near-area-count-text">{feed.lane02NearAreaCount}</p></td> {/* 4,5 box id */}
                  <td className="box-size raod-lane bottom-border top-border far-area-border"> <p className="far-area-count-text">{feed.lane02FarAreaCount}</p></td> {/* 4,6 box id */}
                  <td className="box-size raod-lane bottom-border top-border"></td> {/* 4,7 box id */}
                </tr>
                <tr>
                  <td className="box-size grass"></td> {/* 5,0 box id */}
                  <td className="box-size grass"></td> {/* 5,1 box id */}
                  <td className="box-size grass right-border"><p className="counter-time-text">{feed.lane03CounterTime}</p></td>  {/* 5,2 box id */}
                  <td className="box-size raod-lane top-border near-area-border"><p className="near-area-count-text">{feed.lane03NearAreaCount}</p></td>  {/* 5,3 box id */}
                  <td className="box-size raod-lane left-border"></td> {/* 5,4 box id */}
                  <td className="box-size grass left-border"><p className="counter-time-text">{feed.lane02CounterTime}</p></td> {/* 5,5 box id */}
                  <td className="box-size grass"></td> {/* 5,6 box id */}
                  <td className="box-size grass"><p className="lane-text">Lane 02</p></td> {/* 5,7 box id */}
                </tr>
                <tr>
                  <td className="box-size grass"></td> {/* 6,0 box id */} 
                  <td className="box-size grass"></td> {/* 6,1 box id */}
                  <td className="box-size grass right-border"></td>  {/* 6,2 box id */}
                  <td className="box-size raod-lane far-area-border"><p className="far-area-count-text">{feed.lane03FarAreaCount}</p></td> {/* 6,3 box id */}
                  <td className="box-size raod-lane left-border"></td> {/* 6,4 box id */}
                  <td className="box-size grass left-border"></td> {/* 6,5 box id */}
                  <td className="box-size grass"></td> {/* 6,6 box id */}
                  <td className="box-size grass"></td> {/* 6,7 box id */}
                </tr>
                <tr>
                  <td className="box-size grass"></td> {/* 7,0 box id */}
                  <td className="box-size grass"></td> {/* 7,1 box id */}
                  <td className="box-size grass right-border"><p className="lane-text">Lane 03</p></td>  {/* 7,2 box id */}
                  <td className="box-size raod-lane"></td> {/* 7,3 box id */}
                  <td className="box-size raod-lane left-border"></td> {/* 7,4 box id */}
                  <td className="box-size grass left-border"></td> {/* 7,5 box id */}
                  <td className="box-size grass"></td> {/* 7,6 box id */}
                  <td className="box-size grass"></td> {/* 7,7 box id */}
                </tr>
              </>
            ))}
          </table>
        </div>
      </Container>
    </div>
  );
};

export default TrafficSimulation;
