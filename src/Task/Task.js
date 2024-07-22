import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Task.css";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: "",
    desc: "",
    date: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const showModal = (task = null) => {
    if (task) {
      setTask(task);
      setIsEditing(true);
    } else {
      setTask({ title: "", desc: "", date: "" });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const token = localStorage.getItem("token");
    try {
      if (isEditing && task._id) {
        // Update task
        await axios.put(`http://localhost:5000/tasks/${task._id}`, task, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Create new task
        await axios.post("http://localhost:5000/tasks", task, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setIsModalOpen(false);
      fetchTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (_id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/tasks/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== _id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <div className="dashboard-container">
        <main className="content">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="">Task</h2>
            <Button onClick={() => showModal()} type="primary">
              <PlusOutlined /> Add Task
            </Button>
          </div>
          <div className="card-container row row-cols-1 row-cols-sm-2 row-cols-lg-4 gap-2">
            {tasks.map((task) => (
              <div key={task._id} className="card col">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h6>{task.title}</h6>
                    <Button
                      className="icon-button"
                      onClick={() => showModal(task)}
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </Button>
                  </div>
                  <p className="text-muted">{task.date}</p>
                  <p>{task.desc}</p>
                  <Button className="btn btn-sm btn-primary me-3">done</Button>
                  <Button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-sm border"
                  >
                    withdraw
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Modal
            title={isEditing ? "Edit Task" : "Add Task"}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <input
              type="text"
              className="form-control p-3 rounded-top mb-3"
              placeholder="Title"
              name="title"
              value={task.title}
              onChange={handleInputChange}
            />
            <textarea
              type="text"
              className="form-control p-3 rounded-top mb-3"
              placeholder="Your Description"
              name="desc"
              value={task.desc}
              onChange={handleInputChange}
            />
            <input
              type="date"
              className="form-control p-3 rounded-top mb-3"
              placeholder="Date"
              name="date"
              value={task.date}
              onChange={handleInputChange}
            />
          </Modal>
        </main>
      </div>
    </>
  );
};

export default Task;
