import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { Form, Container, Button } from "react-bootstrap";
import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import "../NavigationBar/NavigationStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import TitleBar from "../UIComponents/TitleBar.jsx";
import ReactPlayer from "react-player";

export default function CctvVideoLink() {
  const [cctvvideolink, setCctvvideolink] = useState([]);
  // const { id } = useParams();
  const [enableEditing, setEnableEditing] = useState(false);
  const [link_one, setlink_one] = useState("");
  const [link_two, setlink_two] = useState("");
  const [link_three, setlink_three] = useState("");
  const [link_four, setlink_four] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cctvvideolink/get/64e58e5701c519676d98beab`)
      .then((response) => {
        setCctvvideolink(response.data.exsitingCctvvideo);
        setlink_one(response.data.exsitingCctvvideo.link_one);
        setlink_two(response.data.exsitingCctvvideo.link_two);
        setlink_three(response.data.exsitingCctvvideo.link_three);
        setlink_four(response.data.exsitingCctvvideo.link_four);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      link_one: link_one,
      link_two: link_two,
      link_three: link_three,
      link_four: link_four,
    };

    axios
      .put(
        `http://localhost:5000/cctvvideolink/update/64e58e5701c519676d98beab`,
        data
      )
      .then((res) => {
        if (res.data.success) {
          swal("Video Footage Link Update successfully", "", "success");
          setTimeout(() => {
            window.location = "/cctvvideolink";
          }, "3000");
        }
      });
  };

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
          <TitleBar title="CCTV Video Footage Configuration" />
          <Container className="shadow pt-2 pb-2 bg-white mt-4 border rounded">
            <Form className="mt-4 p-3">
              <div className="row">
                <div className="col-md-9">
                  <h5>CCTV Video Footage Details</h5>
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
                <div className="col-md-12">
                  <hr style={{ height: 10 }} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      <b>Lane 01 - CCTV Video Footage Link</b>
                    </Form.Label>
                    &nbsp;&nbsp;
                    <FontAwesomeIcon icon={faLink} />
                    <Form.Control
                      type="text"
                      placeholder="Lane 01 Video Link"
                      disabled={!enableEditing}
                      value={link_one}
                      onChange={(e) => setlink_one(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      <b>Lane 02 - CCTV Video Footage Link</b>
                    </Form.Label>
                    &nbsp;&nbsp;
                    <i className="fa fa-link"></i>
                    <Form.Control
                      type="text"
                      placeholder="Lane 01 Video Link"
                      disabled={!enableEditing}
                      value={link_two}
                      onChange={(e) => setlink_two(e.target.value)}
                    />
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
                      <b>Lane 03 - CCTV Video Footage Link</b>
                    </Form.Label>
                    &nbsp;&nbsp;
                    <i className="fa fa-link"></i>
                    <Form.Control
                      type="text"
                      placeholder="Lane 01 Video Link"
                      disabled={!enableEditing}
                      value={link_three}
                      onChange={(e) => setlink_three(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      <b>Lane 04 - CCTV Video Footage Link</b>
                    </Form.Label>
                    &nbsp;&nbsp;
                    <i className="fa fa-link"></i>
                    <Form.Control
                      type="text"
                      placeholder="Lane 01 Video Link"
                      disabled={!enableEditing}
                      value={link_four}
                      onChange={(e) => setlink_four(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>
              {/* Submit Button */}
              <div className="row">
                <div className="col-md-12 d-flex justify-content-end">
                  <Button variant="success" onClick={onSubmit} type="submit">
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
                  <h5>CCTV Video Footages</h5>
                </div>

                <div className="row"></div>
                <div className="col-md-12">
                  <hr style={{ height: 10 }} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="image-container">
                  <div className="image-label ml-2 mb-2"style={{ fontSize: '20px' }}>
                      <b>CCTV Camera 01 (Lane 01)</b>
                    </div>
                    <ReactPlayer
                      url={link_one} // Use the link from your state
                      controls={true}
                      width="100%"
                      // playing={true} // Enable autoplay
                      // muted={true}   // Mute the video
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="image-container">
                  <div className="image-label ml-2 mb-2"style={{ fontSize: '20px' }}>
                      <b>CCTV Camera 02 (Lane 02)</b>
                    </div>
                    <ReactPlayer
                      url={link_two} // Use the link from your state
                      controls={true}
                      width="100%"
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-6">
                  <div className="image-container">
                  <div className="image-label ml-2 mb-2"style={{ fontSize: '20px' }}>
                      <b>CCTV Camera 03 (Lane 03)</b>
                    </div>
                    <ReactPlayer
                      url={link_three} // Use the link from your state
                      controls={true}
                      width="100%"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="image-container">
                  <div className="image-label ml-2 mb-2"style={{ fontSize: '20px' }}>
                      <b>CCTV Camera 04 (Lane 04)</b>
                    </div>
                    <ReactPlayer
                      url={link_four} // Use the link from your state
                      controls={true}
                      width="100%"
                    />
                  </div>
                </div>
              </div>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
}
