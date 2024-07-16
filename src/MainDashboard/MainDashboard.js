import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Logo from "../Asset/logojpg.jpg";
import { useNavigate } from "react-router-dom";
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
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            // paddingTop:"78px",
            background: colorBgContainer,
            height: "100vh",
          }}
        >
          <div className="demo-logo-vertical">
            {/* <img
              // src={Logo}
              width="150px"
              className="m-2 rounded demo-logo-vertical"
              style={{ objectFit: "cover" }}
              height="50px"
              alt="logo"
            /> */}
          </div>
          <Menu
            theme="light"
            style={{
              // paddingTop:"78px",
              // background: colorBgContainer,
              // height: "100vh",
              marginTop:"60px"
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
              // height:"100vh"
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default MainDashboard;
