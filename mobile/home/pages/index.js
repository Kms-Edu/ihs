import dynamic from 'next/dynamic'
//import ListView from '../components/list-view'
const ListView = dynamic(import('../components/list-view'), {
  ssr: false,
})

//import Drawer from '../components/drawer'

const TabBar = dynamic(import('../components/tab-bar'), {
  ssr: false
})

//import TabBar from '../components/tab-bar'
//import Layout from '../components/layout2'

const Layout = dynamic(import('../components/layout3'), {
  ssr: false
})
/*
/*const ListView = dynamic(import('../components/list-view'))
const Drawer = dynamic(import('../components/drawer'))
*/
const content = (
  <TabBar
      life={<div><ListView /></div>}
      koubei={<div>Koubei</div>}
      friend={<div>Friend</div>}
      my={<div>My</div>}
    />
)
const tabs = [
  { title: '1st Tab', content, },
  { title: '2nd Tab', content, },
  { title: '3rd Tab', content, },
  { title: '3rd Tab', content, },
  { title: '3rd Tab', content, },
  { title: '3rd Tab', content, },
  { title: '3rd Tab', content, },
];

export default () => (
  <Layout     
    title="Index"
    tabs={tabs}
  >
  </Layout>
)
