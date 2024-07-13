import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import baseUrl from "../constants/baseUrl";

function SignInForm() {
  const { auth, setAuth } = useAuth();
  const { jwt, setJwt } = useAuth();

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseUrl()}/login`, user);
      // localStorage.setItem("access_token", response.data.access_token);
      setAuth(response.data);
      setJwt(response.data.access_token);
      // Redirect to protected route
      console.log(response.data.user.roles);
      const isAdmin = response.data.user.roles[0] === "Admin" ? true : false;
      if (isAdmin) {
        console.log("Inside Admin");
        navigate("/admin", { replace: true });
      } else {
        console.log("Inside User");
        navigate("/user", { replace: true });
      }
      alert("Login successful");
    } catch (error) {
      console.error(error);
      // Display error message to user
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form>
        <h1>Sign in</h1>
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
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={user.username}
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <a href="#">Forgot your password?</a>
        <button onClick={handleLogin}>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
