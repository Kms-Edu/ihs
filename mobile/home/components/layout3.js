import React from 'react'
import { Tabs, NavBar, Icon  } from 'antd-mobile';
import Head from 'next/head'
import {withRouter} from 'next/router'
class Demo extends React.Component {
  renderContent = tab => 
    (<div style={{ margin: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: document.documentElement.clientHeight - 90, backgroundColor: '#fff' }}>
      {tab.content}
    </div>);

  render() {
    const { tabs, title, router } = this.props    

    return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>
        <NavBar
          mode='light'
          icon={<Icon type='left' />}
          onLeftClick={() => router.back()}
        >
          Ant Design Mobile example
        </NavBar>
        <Tabs id="content" tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}>
          {this.renderContent}
        </Tabs> 
      </div>
    );
  }
}

export default withRouter(Demo)
