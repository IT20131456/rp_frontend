import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import TitleBar from "../UIComponents/TitleBar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function EVTableView() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [evvehicle, setEvVehicle] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/emergency-vehicle/getAll`)
      .then((response) => {
        setEvVehicle(response.data.exsitingEmergencyVehicle);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div className="wrapper">
      {/* Top Navigation */}
      <TopNavigationBar />

      {/* Sidebar and Content */}
      <div className="content-wrapper">
        {/* Sidebar Column */}
        <div className="sidebar-column">
          <SideNavigationBar />
        </div>

        {/* Content Column */}
        <div className="content-column m-3 mt-3">
          <TitleBar title="Emergency Vehicle Data Analysis" />
          <div ref={componentRef} className="mt-3 mx-5">
            <Container className="shadow p-4 bg-white mt-4 border rounded">
              <div className="row">
                <div className="col-md-6">
                  <h4>Emergency Vehicle Data Report</h4>
                </div>
                <div className="col-md-6 d-flex flex-column align-items-end">
                  <Button
                    onClick={handlePrint}
                    className="bg-success text-white m- ml-0"
                  >
                    Download Report &nbsp;
                    <FontAwesomeIcon icon={faFileArrowDown} />
                  </Button>
                </div>
                <div className="col-md-12">
                  <hr style={{ height: 10 }} />
                </div>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Lane ID</th>
                    <th scope="col">Label</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Ambulance Count</th>
                    <th scope="col">Firetruck Count</th>
                    <th scope="col">Police Count</th>
                    <th scope="col">Speed (Km/h)</th>
                    <th scope="col">Vehicle Detect Time</th>
                  </tr>
                </thead>
                <tbody>
                  {evvehicle.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <th>{index + 1}</th>
                        <td>{item.camera_id}</td>
                        {/* <td style={{ width: "15%" }}>{item.frame_number}</td> */}
                        <td>{item.label}</td>
                        <td>{item.priority}</td>
                        <td>{item.ambulance_count}</td>
                        <td>{item.firetruck_count}</td>
                        <td>{item.police_count}</td>
                        <td>{item.speed}</td>
                        <td>{new Date(item.vehicle_detect_timestamp).toISOString().slice(0, 19)}</td>


                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}
