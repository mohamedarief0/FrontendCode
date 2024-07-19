import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

import Dashboard from "../Dashboard/Dashboard";
import NavBar from "../NavBar/index";
import Logo from "../Asset/logo.jpg"
import "./MainDashboard.css";

const { Header, Sider, Content } = Layout;
function MainDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/api/login");
  };

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        {/* <NavBar /> */}
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
              // background: colorBgContainer,
            }}
            mode="inline"
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              Team
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              File
            </Menu.Item>
            <Menu.Item
              key="4"
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
            <Dashboard />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default MainDashboard;
