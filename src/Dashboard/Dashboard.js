import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Make sure to create and import a CSS file for styling
import { Button, Modal, Space, Table } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const Dashboard = ({ token }) => {
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    socialHandler: "",
  });
  const [dataSource, setDataSource] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage(response.data.message);
        console.log(response.data);
        setDataSource(response.data)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/api/login");
        } else {
          setMessage("Error fetching dashboard data");
        }
      }
    };
    fetchData();
  }, [token, navigate]);

  const columns = [
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Social handler",
      dataIndex: "socialHandler",
      key: "socialHandler",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <Space>
          <EditTwoTone />
          <DeleteTwoTone />
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const newUser = { ...user, key: uuidv4() };
      await axios.post("http://localhost:5000/api/dashboard", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataSource((prevDataSource) => [...prevDataSource, newUser]);
      setIsModalOpen(false);
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        socialHandler: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <aside className="sidebar">
          <ul>
            <li>Dashboard</li>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </aside>
        <main className="content">
          <div className="d-flex justify-content-between">
            <h2>Dashboard</h2>
            <Button
              type="primary"
              style={{ backgroundColor: "primary" }}
              onClick={showModal}
            >
              Add user
            </Button>
          </div>
          <p>{message}</p>
          <article>
            <Table dataSource={dataSource} columns={columns} />
          </article>
          <Modal
            title="Add User"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <input
              type="text"
              className="form-control p-3 rounded-top mb-3"
              placeholder="First name"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="form-control p-3 rounded-top mb-3"
              placeholder="Last name"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
            />
            <input
              type="email"
              className="form-control p-3 rounded-top mb-3"
              placeholder="ex: johan@gmail.com"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              className="form-control p-3 rounded-top mb-3"
              placeholder="ex: +91 9988776655"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="form-control p-3 rounded-top mb-3"
              placeholder="@twitter"
              name="socialHandler"
              value={user.socialHandler}
              onChange={handleInputChange}
            />
          </Modal>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
