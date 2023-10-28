import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import swal from "sweetalert";
import { Form, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoad, faTrafficLight, faKey } from "@fortawesome/free-solid-svg-icons";
import SideNavigationBar from "../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../NavigationBar/TopNavigationBar";
import "../NavigationBar/NavigationStyle.css";
import "./styles.module.css";

export default class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      password: "",
      enteredPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
  }

  componentDidMount() {
    document.title = "Change Password";

    // redirect to the login page if the user is not logged in
    if (!localStorage.userToken) {
      swal("Please login first", "", "warning").then((value) => {
        if (value) {
          this.props.history.push(`/user/login`);
          window.location.reload();
        }
      });
    }

    const usertoken = localStorage.userToken;
    const decoded = jwt_decode(usertoken);

    this.setState({
      _id: decoded._id,
    });
    const id = decoded._id;
    this.retrieveProfile(id);
  }

  retrieveProfile(id) {
    axios.get(`http://localhost:5000/user/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          dateRegistered: res.data.user.dateRegistered,
          type: res.data.user.type,
          password: res.data.user.password,
        });
      }
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { _id, type, password } = this.state;

    let data = {
      uid: _id,
      type: type,
      password: password,
    };

    // validations----------------------------------------------------------
    let validated = true;
    if (this.state.confirmNewPassword != this.state.newPassword) {
      validated = false;
      swal({
        title: "",
        text: "Please check the new password and repeated new password",
        icon: "warning",
      });
    } else if (
      this.state.enteredPassword != "" &&
      this.state.newPassword === ""
    ) {
      validated = false;
      swal({
        title: "",
        text: "Please enter a new password",
        icon: "warning",
      });
    } else if (
      this.state.enteredPassword === "" &&
      this.state.newPassword != ""
    ) {
      validated = false;
      swal({
        title: "",
        text: "Please enter your existing password",
        icon: "warning",
      });
    } else if (
      this.state.enteredPassword != "" &&
      this.state.newPassword.length < 8
    ) {
      validated = false;
      swal({
        title: "",
        text: "Password should have at least 8 characters",
        icon: "warning",
      });
    }

    // console.log(data)

    if (validated) {
      data.enteredPassword = this.state.enteredPassword;
      data.newPassword = this.state.newPassword;

      axios
        .put(`http://localhost:5000/user/updateprofile/${_id}`, data)
        .then((res) => {
          if (res.data.success) {
            swal("Password updated successfully!", "", "success").then(
              (value) => {
                if (value) {
                  window.location = "/";
                }
              }
            );
          }
        })
        .catch((err) => {
          console.log(err);
          swal({
            title: "",
            text: "Something went wrong!",
            icon: "warning",
          });
        });
    }
  };

  render() {
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
            <Container className='shadow pt-2 pb-2 bg-white border rounded'>
              <Form className="mt-4 p-3">
                <div className="row">
                  <div className="col-md-12">
                    <h5>Change Password</h5>
                    <hr style={{ height: 10 }} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                      <Form.Label>
                        <b>Existing password</b>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="enteredPassword"
                        value={this.state.enteredPassword}
                        placeholder="Enter Your Existing Password"
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                      <Form.Label>
                        <b>New password</b>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="newPassword"
                        value={this.state.newPassword}
                        placeholder="Enter Your New Password"
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                      <Form.Label>
                        <b>Confirm New password</b>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmNewPassword"
                        value={this.state.confirmNewPassword}
                        placeholder="Confirm Your New Password"
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                {/* Submit Button */}
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-end">
                    <Button variant="success" type="submit" onClick={this.onSubmit}>
                      Change Password
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
}
