import React, {useState, useCallback} from 'react'
import { Drawer, NavBar, Icon, WingBlank } from 'antd-mobile'
import { withRouter } from 'next/router'
import Head from 'next/head'
import Sidebar from './sidebar'
/*
import dynamic from 'next/dynamic'
const Sidebar = dynamic(import('./sidebar'), {
  ssr: false
})

state = {
    open: true,
  }
  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  }
*/

export default withRouter(({ router, children, title }) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = useCallback(() => {
    setOpen(!open)
  })

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <NavBar
        mode='light'
        icon={<Icon type='left' />}
        onLeftClick={() => router.back()}
        rightContent={<div>
          <Icon key="icon-0" type="search" style={{ marginRight: '16px' }} />
          <button key="icon-1" onClick={() => console.log('eheh')}>Menu</button>
          </div>}
      ></NavBar>
        <Drawer
          className="my-drawer"
          enableDragHandle
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
          sidebar={<Sidebar />}
          open={open}
          onOpenChange={onOpenChange}
        ><WingBlank>
        {children}
      </WingBlank></Drawer>
      
      <style jsx>{`
      html,body {
        box-sizing: border-box;
      }
      *, *:before, *:after { box-sizing: inherit; }
      
      /* Set full height: http://stackoverflow.com/questions/6654958/make-body-have-100-of-the-browser-height */
      html {
        /* body will set it's height based on its parent, which is html */
        height: 100%;
      
        /* set full width as well */
        width: 100%;
      }
      body {
        /* min-height is needed for pages that might scroll, ie they may contain _more_ than 100% of viewport height */
        min-height: 100%;
      
        /* needed to prevent unwanted scroll-bars */
        margin: 0;
        padding: 0;
        
        /* This is just so we can tell the body block apart from the app container */
        background-color: gray;
      }
      `}</style>      
    </div>
  )})