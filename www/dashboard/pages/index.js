import React, {useState} from 'react'
import MeasureRender from '../containers/measure-render'
import Layout from '../components/layouts/nav-bar'
import { Tabs, Input } from 'antd';
import Head from 'next/head'
import Latex from 'react-latex'
import dynamic from 'next/dynamic'
import Form from '../components/form'
//import Demo from '../components/calendar/demo'
const Demo = dynamic(import('../components/calendar/demo'), {
  ssr: false,
})
const TabPane = Tabs.TabPane;
const { TextArea } = Input;




function callback(key) {
  console.log(key);
}

const Page = () => {
  const [math, setMath] = useState('')
  return (
    <MeasureRender name="IndexPage">
      <Layout
        title="Dashboard"
        description="Dashboard"
      >
      <Head>
        <link href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css" rel="stylesheet" />
      </Head>
        <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Demo" key="1"><Demo /></TabPane>
          <TabPane tab="Lecture" key="2">
            <Latex displayMode={true}>$$3\times 4) \div (5-3)$$</Latex>
            <TextArea rows={4} value={math} onChange={setMath} />
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            <Form />
          </TabPane>
        </Tabs>
      </Layout>
    </MeasureRender>
  )
}
export default Page
