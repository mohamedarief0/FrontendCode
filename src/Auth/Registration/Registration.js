import React, { useState } from "react";
import "./Registration.css";
import axios from "axios";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await axios.post("http://localhost:5000/api/register", {
          username,
          password,
        });
       setAlert({
         show: true,
         message: "User registered successfully",
         type: "success",
       });
    } catch (error) {
      setAlert({
        show: true,
        message: "Error registering user",
        type: "danger",
      });
    }
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <form className="form-container" onSubmit={handleSubmit}>
          <p className="mb-3 fs-2 fw-light text-center">Please Register</p>
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
              ></button>
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              placeholder="abc@gmail.com"
              type="email"
              className="form-control p-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={"3"}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              placeholder="Password"
              type="Password"
              className="form-control p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary fs-5 p-2 w-100">
            Register
          </button>
          <div className="mt-3 text-muted">
            Already have an account?{" "}
            <a
              className="text-decoration-none text-secondary"
              href="/api/login"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
