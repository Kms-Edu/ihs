import Header from '../components/header'
import Layout from '../components/layout'
import dynamic from 'next/dynamic'

<Layout
  title="Demo"
  description="Demo"
>
<Header />

## Good morning

import Drawer from '../components/drawer'

### How are you ?
This is a test for drawer

<Drawer />

### This is Tabs

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

<Tabs defaultActiveKey="1">
  <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
  <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
  <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
</Tabs>

### Sample Quiz


</Layout>