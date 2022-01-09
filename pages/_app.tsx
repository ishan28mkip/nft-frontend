import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import logo from "../public/logo.png";
const { Header, Sider } = Layout;

import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ paddingLeft: "30px" }}>
        <Image src={logo} alt="logo" height={60} />
      </Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          collapsible
          collapsed={collapsed}
          onCollapse={toggle}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link href="/">Home</Link>
            </Menu.Item>

            <Menu.Item key="2" icon={<LaptopOutlined />}>
              <Link href="/search/users"> User Search</Link>
            </Menu.Item>

            <Menu.Item key="3" icon={<NotificationOutlined />}>
              <Link href="/search/accounts"> Account Search</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "24px" }}>
          <Component {...pageProps} />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MyApp;
