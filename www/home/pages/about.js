import Layout from '../components/layouts/nav-bar'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import {useStore, useAction} from 'easy-peasy'
const Title = styled.h1`
  color: red;
  font-size: 50px;
`
const Quiz = dynamic(import('../components/quiz'), {
  ssr: false,
  loading: () => <div>...</div>
})

const Sample = () => {
  const quiz = useStore(state => state.quiz)
  return <Quiz quiz={quiz} />
}

export default () => (
  <Layout
    title="About"
    description="About"
  >
    <Title>About page</Title>
   <Sample />
  </Layout>
)
