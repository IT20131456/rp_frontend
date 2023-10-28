import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import swal from "sweetalert";
import { Form, Container, Button } from "react-bootstrap";
import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import "../NavigationBar/NavigationStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import TitleBar from "../UIComponents/TitleBar.jsx";

export default function JunctionDetails() {
  const [junctiondetails, setJunctionDetails] = useState([]);
  // const { id } = useParams();
  const [enableEditing, setEnableEditing] = useState(false);
  const [junction_id, setjunction_id] = useState("");
  const [junction_name, setjunction_name] = useState("");
  const [junction_type, setjunction_type] = useState("");
  const [traffic_type, settraffic_type] = useState("");
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/junction/get/64e587f75af8cbbed7c1ae46`)
      .then((response) => {
        setJunctionDetails(response.data.exsitingJunction);
        setjunction_id(response.data.exsitingJunction.junction_id);
        setjunction_name(response.data.exsitingJunction.junction_name);
        setjunction_type(response.data.exsitingJunction.junction_type);
        settraffic_type(response.data.exsitingJunction.traffic_type);
        setlatitude(response.data.exsitingJunction.latitude);
        setlongitude(response.data.exsitingJunction.longitude);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      junction_id: junction_id,
      junction_name: junction_name,
      junction_type: junction_type,
      traffic_type: traffic_type,
      latitude: latitude,
      longitude: longitude,
    };

    axios
      .put(
        `http://localhost:5000/junction/update/64e587f75af8cbbed7c1ae46`,
        data
      )
      .then((res) => {
        if (res.data.success) {
          swal("Junction Details Update successfully", "", "success");
          setTimeout(() => {
            window.location = "/junctiondetails";
          }, "3000");
        }
      });
  };

  const containerStyle = {
    width: 1200,
    height: 900,
  };

  const mapCenter = {
    lat: parseFloat(latitude), // Convert latitude string to float
    lng: parseFloat(longitude), // Convert longitude string to float
  };

  
  const iframeSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es&output=embed&z=18`;



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
          <TitleBar title="Junction Details Configuration" />
          <Container className="shadow pt-2 pb-2 bg-white mt-4 border rounded">
            <Form className="mt-4 p-3">
              <div className="row">
                <div className="col-md-9">
                  <h5>Junction Details</h5>
                </div>
                <div className="col-md-3 ">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Enable Editing"
                    checked={enableEditing}
                    onChange={() => setEnableEditing(!enableEditing)}
                  />
                </div>
                <div className="row"></div>
                <hr style={{ height: 10 }} />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      <b>Junction ID</b>{" "}
                    </Form.Label>
                    &nbsp;&nbsp;
                    <FontAwesomeIcon icon={faKey} />
                    <Form.Control
                      type="text"
                      maxLength={3}
                      placeholder="J01"
                      disabled={!enableEditing}
                      value={junction_id}
                      onChange={(e) => setjunction_id(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Label>
                      <b>Junction Name</b>{" "}
                    </Form.Label>
                    &nbsp;&nbsp;
                    <Form.Control
                      type="text"
                      placeholder="Colombo"
                      disabled={!enableEditing}
                      value={junction_name}
                      onChange={(e) => setjunction_name(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Label>
                      <b>Junction Type</b>{" "}
                    </Form.Label>
                    &nbsp;&nbsp;
                    <Form.Select
                      aria-label="Default select example"
                      disabled={!enableEditing}
                      value={junction_type}
                      onChange={(e) => setjunction_type(e.target.value)}
                    >
                      <option>Select Junction Type</option>
                      <option value="1">3 Way Junctions</option>
                      <option value="2">4 Way Junctions</option>
                      <option value="2">Roundabouts </option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Label>
                      <b>Traffic Type</b>{" "}
                    </Form.Label>
                    &nbsp;&nbsp;
                    <Form.Select
                      aria-label="Default select example"
                      disabled={!enableEditing}
                      value={traffic_type}
                      onChange={(e) => settraffic_type(e.target.value)}
                    >
                      <option>Select Traffic Type</option>
                      <option value="1">Heavy Traffic</option>
                      <option value="2">Medium Traffic</option>
                      <option value="3">Normal Traffic</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      <b>Latitude (X)</b>
                    </Form.Label>
                    &nbsp;&nbsp;
                    <Form.Control
                      type="text"
                      placeholder="Enter Latitude (e.g. 37.7749)"
                      disabled={!enableEditing}
                      value={latitude}
                      onChange={(e) => setlatitude(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Label>
                      <b>Longitude (Y)</b>
                    </Form.Label>
                    &nbsp;&nbsp;
                    <Form.Control
                      type="text"
                      placeholder="Enter Longitude (e.g. -122.4194)"
                      disabled={!enableEditing}
                      value={longitude}
                      onChange={(e) => setlongitude(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>
              {/* Submit Button */}
              <div className="row">
                <div className="col-md-12 d-flex justify-content-end">
                  <Button variant="success" type="submit" onClick={onSubmit}>
                    Update
                  </Button>
                </div>
              </div>
            </Form>
          </Container>
          <Container className="shadow pt-2 pb-2 bg-white mt-4 border rounded">
            <Form className="mt-2 p-3">
              <div className="row">
                <div className="col-md-9">
                  <h5>Google Map View</h5>
                </div>

                <div className="row"></div>
                <div className="col-md-12">
                  <hr style={{ height: 10 }} />
                </div>
              </div>

              <div className="row">
              <iframe
                id="iframeId"
                src={iframeSrc}
                height="700px"
                width="100%"
                title="Google Map"
              ></iframe>
              </div>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
}
