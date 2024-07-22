import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Registration from "./Auth/Registration";
import Login from "./Auth/Login";
import Dashboard from "./Dashboard/Dashboard";
import MainDashboard from "./MainDashboard/MainDashboard";
import "../node_modules/material-icons/iconfont/material-icons.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.css";
// import "../scss/custom.scss";
import "./css/main.css"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<MainDashboard />} /> */}
        <Route path="/api/register" element={<Registration />} />
        <Route path="/api/login" element={<Login setToken={setToken} />} />
        <Route path="/api/:id" element={<MainDashboard  token={token} />} />
      </Routes>
    </>
  );
}

export default App;
