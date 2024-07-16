import React, { useState, useEffect, useRef } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();
  const alertTimeout = useRef(null);

  useEffect(() => {
    return () => {
      // Clear timeout if component unmounts
      if (alertTimeout.current) {
        clearTimeout(alertTimeout.current);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting login:", { username, password });
      const response = await axios.post(
        "http://localhost:5000/api/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { token } = response.data;
      console.log("Login response:", response.data);
      setToken(token);
      localStorage.setItem("token", token);
      setAlert({
        show: true,
        message: "Logged in successfully",
        type: "success",
      });
      alertTimeout.current = setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
        navigate("/api/dashboard");
      }, 1000);
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      setAlert({ show: true, message: "Invalid credentials", type: "danger" });
      alertTimeout.current = setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 3000);
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <form className="form-contain" onSubmit={handleSubmit}>
          <p className="mb-3 fs-2 fw-light text-center">Please Login</p>
          {alert.show && (
            <div
              className={`d-flex justify-content-between alert alert-${alert.type}`}
              role="alert"
            >
              {alert.message}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setAlert({ show: false, message: "", type: "" })}
              ></button>
            </div>
          )}
          <div className="mb-2">
            <input
              placeholder="abc@gmail.com"
              type="email"
              className="form-control p-3 rounded-top"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="password"
              type="password"
              className="form-control p-3 rounded-bottom"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary fs-5 w-100 p-2">
            Login
          </button>
          <div className="mt-3 text-muted">
            Create an account?{" "}
            <a
              className="text-decoration-none text-secondary"
              href="/api/register"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
