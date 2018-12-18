import React, { Component } from 'react';
import { Menu } from 'antd';
import dynamic from 'next/dynamic'
import Link from '../link'
const Login = dynamic(import('../auth/google-login'), {
  ssr: false,
  loading: () => <div>...</div>
})
class RightMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="dashboard">
          <Link href="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Login />
        </Menu.Item>
      </Menu>
    );
  }
}
export default RightMenu;
