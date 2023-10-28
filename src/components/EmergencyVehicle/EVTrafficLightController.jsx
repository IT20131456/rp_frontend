import React, { useState, useEffect } from "react";
import { Form, Container, InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import "../NavigationBar/NavigationStyle.css";
import TitleBar from "../UIComponents/TitleBar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrafficLight } from "@fortawesome/free-solid-svg-icons";

export default function EVTrafficLightController() {
  const [enableEditing, setEnableEditing] = useState(false);
  const [algorithmdetails, setAlgorithmDetails] = useState([]);
  const [emergencyControl, setEmergencyControl] = useState(0); 
  const [ambulance_priority, setambulance_priority] = useState("");
  const [firetruck_priority, setfiretruck_priority] = useState("");
  const [policevehicle_priority, setpolicevehicle_priority] = useState("");
  const [time_lane01, settime_lane01] = useState("");
  const [time_lane02, settime_lane02] = useState("");
  const [time_lane03, settime_lane03] = useState("");
  const [time_lane04, settime_lane04] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/evalgorithm/get/64f5948f472976ea1d015933`)
      .then((response) => {
        setAlgorithmDetails(response.data.exsitingAlgorithm);
        setambulance_priority(
          response.data.exsitingAlgorithm.ambulance_priority
        );
        setfiretruck_priority(
          response.data.exsitingAlgorithm.firetruck_priority
        );
        setpolicevehicle_priority(
          response.data.exsitingAlgorithm.policevehicle_priority
        );
        settime_lane01(response.data.exsitingAlgorithm.time_lane01);
        settime_lane02(response.data.exsitingAlgorithm.time_lane02);
        settime_lane03(response.data.exsitingAlgorithm.time_lane03);
        settime_lane04(response.data.exsitingAlgorithm.time_lane04);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      ambulance_priority: ambulance_priority,
      firetruck_priority: firetruck_priority,
      policevehicle_priority: policevehicle_priority,
      time_lane01: time_lane01,
      time_lane02: time_lane02,
      time_lane03: time_lane03,
      time_lane04: time_lane04,
    };

    axios
      .put(
        `http://localhost:5000/evalgorithm/update/64f5948f472976ea1d015933`,
        data
      )
      .then((res) => {
        if (res.data.success) {
          swal("Algorithm Details Update successfully", "", "success");
          setTimeout(() => {
            window.location = "/evtrafficlightcontroller";
          }, "3000");
        }
      });
  };

  useEffect(() => {
    // Define an async function to make the API call
    const updateEmergencyControl = async () => {
      try {
        const response = await axios.put(
          `http://localhost:5000/trafficLightControlConfig/update/:configID`,
          {
            emergencyControl: emergencyControl,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the API function whenever emergencyControl changes
    updateEmergencyControl();
  }, [emergencyControl]);

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
          <TitleBar title="Traffic Light Controller" />
          <Container className="shadow pt-2 pb-2 bg-white mt-4 border rounded">
            <Form className="mt-4 p-3">
              <div className="row">
                <div className="col-md-6">
                  <h5>
                    Traffic Light Controlling SetUp &nbsp;
                    <FontAwesomeIcon icon={faTrafficLight} />
                  </h5>
                </div>
                <div className="col-md-3 ">
                  <Form.Check
                    className="font-weight-bold"
                    type="switch"
                    id="custom-switch"
                    label="Enable Editing"
                    checked={enableEditing}
                    onChange={() => setEnableEditing(!enableEditing)}
                  />
                </div>
                <div className="col-md-3 d-flex justify-content-end mb-3">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => setEmergencyControl(1)}
                  >
                    Activate Algorithm
                  </Button>
                </div>
                <div className="row"></div>
                <hr style={{ height: 10 }} />
              </div>
              <Form.Label className="font-weight-bold">
                Set Priority Level
              </Form.Label>
              <div className="row">
                <div className="col-md-4">
                  <Form>
                    <Form.Label className="font-weight-bold mt-2"></Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-danger text-white">
                        Ambulance
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        min="1"
                        max="3"
                        placeholder="1"
                        disabled={!enableEditing}
                        value={ambulance_priority}
                        onChange={(e) => setambulance_priority(e.target.value)}
                      />
                    </InputGroup>
                  </Form>
                </div>
                <div className="col-md-4">
                  <Form>
                    <Form.Label className="font-weight-bold mt-2"></Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-success text-white">
                        Fire Truck
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        min="1"
                        max="3"
                        placeholder="1"
                        disabled={!enableEditing}
                        value={firetruck_priority}
                        onChange={(e) => setfiretruck_priority(e.target.value)}
                      />
                    </InputGroup>
                  </Form>
                </div>
                <div className="col-md-4">
                  <Form>
                    <Form.Label className="font-weight-bold mt-2"></Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-primary text-white">
                        Police Vehicle
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        min="1"
                        max="3"
                        placeholder="1"
                        disabled={!enableEditing}
                        value={policevehicle_priority}
                        onChange={(e) =>
                          setpolicevehicle_priority(e.target.value)
                        }
                      />
                    </InputGroup>
                  </Form>
                </div>
              </div>

              <Form.Label className="font-weight-bold mt-5">
                Manual Controling
              </Form.Label>
              <div className="row mb-5">
                <div className="col-md-3">
                  <Form>
                    <Form.Label className="font-weight-bold mt-2"></Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light">
                        Lane 01
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="Time in seconds"
                        max="300"
                        min="1"
                        disabled={!enableEditing}
                        value={time_lane01}
                        onChange={(e) => settime_lane01(e.target.value)}
                        onInput={(e) => {
                          const input = e.target.value.trim();
                          if (input.length > 3) {
                            e.target.value = input.slice(0, 3);
                          }
                        }}
                      />
                    </InputGroup>
                  </Form>
                </div>
                <div className="col-md-3">
                  <Form>
                    <Form.Label className="font-weight-bold mt-2"></Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light">
                        Lane 02
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="Time in seconds"
                        max="300"
                        min="1"
                        disabled={!enableEditing}
                        value={time_lane02}
                        onChange={(e) => settime_lane02(e.target.value)}
                        onInput={(e) => {
                          const input = e.target.value.trim();
                          if (input.length > 3) {
                            e.target.value = input.slice(0, 3);
                          }
                        }}
                      />
                    </InputGroup>
                  </Form>
                </div>
                <div className="col-md-3">
                  <Form>
                    <Form.Label className="font-weight-bold mt-2"></Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light">
                        Lane 03
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="Time in seconds"
                        max="300"
                        min="1"
                        disabled={!enableEditing}
                        value={time_lane03}
                        onChange={(e) => settime_lane03(e.target.value)}
                        onInput={(e) => {
                          const input = e.target.value.trim();
                          if (input.length > 3) {
                            e.target.value = input.slice(0, 3);
                          }
                        }}
                      />
                    </InputGroup>
                  </Form>
                </div>
                <div className="col-md-3">
                  <Form>
                    <Form.Label className="font-weight-bold mt-2"></Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light">
                        Lane 04
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="Time in seconds"
                        max="300"
                        min="1"
                        disabled={!enableEditing}
                        value={time_lane04}
                        onChange={(e) => settime_lane04(e.target.value)}
                        onInput={(e) => {
                          const input = e.target.value.trim();
                          if (input.length > 3) {
                            e.target.value = input.slice(0, 3);
                          }
                        }}
                      />
                    </InputGroup>
                  </Form>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 d-flex justify-content-end">
                  <Button variant="success" type="submit" onClick={onSubmit}>
                    Update Algorithm
                  </Button>
                </div>
              </div>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
}
