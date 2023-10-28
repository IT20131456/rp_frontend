import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Loginimage1 from "../../images/Loginimage1.png";
import Loginimage2 from "../../images/Loginimage2.png";
import Loginimage3 from "../../images/Loginimage3.png";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImage: Loginimage1,
      imageUrls: [Loginimage1, Loginimage2, Loginimage3],
      name: "",
      password: "",
    };

    this.interval = null;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    localStorage.removeItem("userToken");
    document.title = "User Login";

    this.interval = setInterval(() => {
      const randomIndex = Math.floor(
        Math.random() * this.state.imageUrls.length
      );
      this.setState({ currentImage: this.state.imageUrls[randomIndex] });
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

    const { name, password } = this.state;

    if (name === "" || name.length < 5) {
      this.setState({ nameError: "Username must be 5 minimum characters" });
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
        .post("http://localhost:5000/user/login", {
          name: user.name,
          password: user.password,
        })
        .then((res) => {
          swal("Login successful!", "", "success").then((value) => {
            if (value) {
              localStorage.setItem("userToken", res.data);
              window.location = "/home";
            }
          });
        })
        .catch((err) => {
          console.log(err);
          swal({
            title: "",
            text: "Please check your username and password",
            icon: "warning",
          });
        });
    }
  }

  render() {
    const { currentImage, nameError, passwordError } = this.state;

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
              <h1>Enter Credentials</h1>
              <input
                type="text"
                placeholder="UserName"
                name="name"
                onChange={this.onChange}
                value={this.state.name}
                className={styles.input}
              />
              {nameError && <div className="error_msg">{nameError}</div>}
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.onChange}
                value={this.state.password}
                className={styles.input}
              />
              {passwordError && (
                <div className="error_msg">{passwordError}</div>
              )}
              <button
                type="submit"
                onClick={this.onSubmit}
                className={styles.green_btn}
              >
                Sign In
              </button>
            </form>
            <div className={styles.link_msg}>
              <h3>
                Don't have an account? <Link to="/signup">Sign Up</Link>
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

export default Login;
