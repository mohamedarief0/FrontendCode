import React from "react";
import profile from "../Asset/profile-3.jpg";
import "./NavBar.css";
function NavBar() {
  return (
    <>
      <div className="d-flex justify-content-between h-100 nav-bar-margin">
        <div className="d-flex justify-content-left align-items-center h-100 px-3">
          <h6>Hi,</h6>
          <h6 className="text-muted"> welcome</h6>
        </div>
        <div className=" d-flex justify-content-between align-items-center">
          <img src={profile} className="user-profile" alt="profile-avator" />
          <div className="ms-3 justify-content-between align-items-center profile-details">
            <h6 className="mt-1">User name</h6>
            <p className="text-black-50">arief2000@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
