import axios from "axios";
import React, { useState } from "react";
import baseUrl from "../constants/baseUrl";
import { useNavigate } from "react-router-dom";
function SignUpForm() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    const response = axios.post(`${baseUrl}/register`, user);
    response
      .then((data) => {
        alert("User registered Successfully");
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        alert("Some Error Occurred");
        navigate("/", { replace: true });
      });
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
          }}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
