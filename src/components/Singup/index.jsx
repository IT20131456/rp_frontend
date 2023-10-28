import React, { Component } from "react";
import axios from "axios";
import "./error.message..css";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Loginimage1 from "../../images/Loginimage1.png";
import Loginimage2 from "../../images/Loginimage2.png";
import Loginimage3 from "../../images/Loginimage3.png";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.imageUrls = [Loginimage1, Loginimage2, Loginimage3];
    this.state = {
      currentImage: this.imageUrls[0],
      name: "",
      email: "",
      password: "",
      nameError: "",
      emailError: "",
      passwordError: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    localStorage.removeItem("userToken");
    document.title = "User Registration";
    this.interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
      this.setState({ currentImage: this.imageUrls[randomIndex] });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateForm() {
    let isValid = true;
    this.setState({
      nameError: "",
      emailError: "",
      passwordError: "",
    });

    const { name, email, password } = this.state;

    if (name === "" || name.length < 5) {
      this.setState({ nameError: "Username must be 5 minimum characters" });
      isValid = false;
    }

    if (
      !email.match(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      )
    ) {
      this.setState({ emailError: "Please enter a valid email" });
      isValid = false;
    }

    if (password === "" || password.length < 8) {
      this.setState({
        passwordError: "Password should contain at least 8 characters",
      });
      isValid = false;
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.validateForm()) {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };

      axios
        .post("http://localhost:5000/user/registration", {
          name: user.name,
          email: user.email,
          password: user.password,
        })
        .then((res) => {
          if (res.data.success) {
            swal("Registered successfully!", "", "success").then((value) => {
              if (value) {
                window.location = "/";
              }
            });
          } else {
            swal("Registration failed!", "", "error");
          }
        })
        .catch((err) => {
          console.log(err);
          swal("Error occurred during registration!", "", "error");
        });
    }
  }

  render() {
    const {
      currentImage,
      name,
      email,
      password,
      nameError,
      emailError,
      passwordError,
    } = this.state;

    return (
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <img
              src={currentImage}
              alt="Google Map"
              style={{ height: "710px", width: "1030px" }}
            />
          </div>
          <div className={styles.right}>
            <form className={styles.form_container} onSubmit={this.onSubmit}>
              <h2>TLMS</h2>
              <h1>Create Your Account</h1>
              <input
                type="text"
                placeholder="UserName"
                name="name"
                onChange={this.onChange}
                value={name}
                className={styles.input}
              />
              {nameError && <div className="error_msg">{nameError}</div>}

              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={this.onChange}
                value={email}
                className={styles.input}
              />
              {emailError && <div className="error_msg">{emailError}</div>}
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.onChange}
                value={password}
                className={styles.input}
              />
              {passwordError && (
                <div className="error_msg">{passwordError}</div>
              )}
              <button type="submit" className={styles.green_btn}>
                Sign Up
              </button>
            </form>
            <div className={styles.link_msg}>
              <h3>
                You have an account? <Link to="/">Sign In</Link>
              </h3>
            </div>
            <div className={styles.copyright}>
              &copy; 2023 TLMS, Inc. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
