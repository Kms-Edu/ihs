import { Layout } from 'antd';
import MainHeader from '../header'
import styled from 'styled-components/macro'
import Head from 'next/head'
import {Divider} from 'antd'
const {
  Header, Footer, Content,
} = Layout;
const StyledHeader = styled(Header)`
  background-color: #81B29A;
  color: #CC8B8C;
`
const StyledLayout = styled(Layout)`
  margin: 4px;
  background-color: #F4F1DE;
`
const StyledContent = styled(Content)`
  
`
const header = (
  <MainHeader />
)

const footer = (
  <div>Footer</div>
)

const Guest = ({children, title, description}) => {
  return (
    <StyledLayout>
      <Head>
        <title>{title}</title>
        <meta name="Description" content={description} />        
      </Head>
      <StyledHeader>{header}</StyledHeader>
      <Divider />
      <StyledContent>{children}</StyledContent>
      <Footer>{footer}</Footer>
      <style jsx global>{`
        * {
          font-family: Menlo, Monaco, 'Lucida Console', 'Liberation Mono',
            'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New',
            monospace, serif;
        }       
      `}</style>
    </StyledLayout>
  )
}

export default Guest