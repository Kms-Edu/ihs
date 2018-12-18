import gql from 'graphql-tag'
import MeasureRender from 'kms-web-components/lib/lib/measure-render'
import Query from 'kms-web-components/lib/lib/query'
import Layout from '../components/layouts/nav-bar'
import Title from '../components/title'
import {AccountCircle} from 'styled-icons/material/AccountCircle.cjs'
import { useStore } from 'easy-peasy';

const TodoList = () => {
  const todos = useStore(state => state.todos.items);
  return (
    <div>
      {todos.map((todo, idx) => <div key={idx}>{todo}</div>)}
    </div>
  );
};

//const MeasureRender = dynamic(import('../containers/measure-render'), {ssr: false})
//const Layout = dynamic(import('../components/layout'))
//const ErrorMessage = dynamic(import('../components/error-message'))
//const Header = dynamic(import('../components/header'))

const testQuery = gql`
  query{
    sche_ages{
      id
      age_name
      from_month
      to_month
    }
  }
`

const testSubscription = gql`
  subscription {
    sche_ages{
      id
      age_name
      from_month
      to_month
    }
  }
`


const Age = ({sche_age: {id, age_name, from_month, to_month}}) => {
  return (
    <div>
      id: {id}
      name: {age_name}
      from month: {from_month}
      to month: {to_month}
    </div>
  )
}

const AgeList = ({sche_ages}) => {
  return sche_ages.map(item => {
    return <Age sche_age={item} key={item.id} />
  })
}

const Websocket = () => {
  const websocketStatus = useStore(state => state.websocket.status)
  return <div>{websocketStatus}</div>
}

const Page = () => {
  return (
    <MeasureRender name="IndexPage">
      <Layout
        title="Home"
        description="Home"
      >
        <Title>Home page</Title>
        <Websocket />
        <AccountCircle size={30} />
        <TodoList />
        <Query
          query={testQuery}
          subscription={testSubscription}>
          {data => <AgeList sche_ages={data.sche_ages} />
          }
        </Query>
      </Layout>
    </MeasureRender>
  )
}
Page.getInitialProps = async ({apolloClient, fetchPolicy}) => {  
  await apolloClient.query({query: testQuery, ...fetchPolicy})    
}
export default Page
