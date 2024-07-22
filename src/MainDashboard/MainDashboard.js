import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FolderOutlined,
  FileAddOutlined,
  UploadOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import "./MainDashboard.css";
// importing components
import Logo from "../Asset/logo.jpg";
import NavBar from "../NavBar/index";
import Dashboard from "../Dashboard/Dashboard";
import Task from "../Task/Task";
// import File from "../File/File"; // Assuming you have a File component

const { Header, Sider, Content } = Layout;

function MainDashboard() {
  const { id } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(id || "dashboard"); // Use descriptive names and initialize with id if available
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/api/login");
  };

  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
    navigate(`/api/${e.key}`);
  };

  useEffect(() => {
    setSelectedMenuItem(id || "dashboard");
  }, [id]);

  const renderContent = () => {
    switch (id) {
      case "dashboard":
        return <Dashboard />;
      case "task":
        return <Task />;
      case "file":
        // return <File />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          style={{
            background: colorBgContainer,
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            style={{
              paddingTop: "70px",
              zIndex: 10,
            }}
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            selectedKeys={[selectedMenuItem]}
            onClick={handleMenuClick} // Handle menu click
          >
            <Menu.Item key="dashboard" icon={<UserOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="task" icon={<FileAddOutlined />}>
              Task
            </Menu.Item>
            <Menu.Item key="file" icon={<FolderOutlined />}>
              File
            </Menu.Item>
            <Menu.Item
              key="logout"
              danger
              className="mt-5"
              onClick={handleLogout}
              icon={<LogoutOutlined />}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <NavBar />
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default MainDashboard;
