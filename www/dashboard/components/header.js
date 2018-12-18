import { withRouter } from 'next/router'
import {Menu} from 'styled-icons/boxicons-regular/Menu.cjs'
import {Icon} from 'antd';
import dynamic from 'next/dynamic'
import styled from 'styled-components/macro'
const Login = dynamic(import('./auth/google-login'), {
  ssr: false,
  loading: () => <div>...</div>
})

const goto = (as) => e => {
  e.preventDefault()
  setTimeout(() => window.location.href = as, 100)
}

const HeaderLink = styled.a`
  font-size: 14px;
  margin-right: 15px;
  text-decoration: none;
  hover: cursor;
`

const StyledLogin = styled(Login)`
  float: right;
`

const Header = ({ router }) => {
  const { pathname } = router
  return (
  <header>
    <Menu size={30} style={ {marginRight: '6px'} } />
    <HeaderLink href='/' onClick={goto('/')} className={pathname === '/' ? 'is-active' : ''}>Home</HeaderLink>
    <a href='/about' onClick={goto('/about')}  href='/about' className={pathname === '/about' ? 'is-active' : ''}><Icon type="question" /></a>
    <a href='/about' onClick={goto('/hello')}  href='/hello' className={pathname === '/hello' ? 'is-active' : ''}><Icon type="smile" /></a>
    <a href='/hello-world' onClick={goto('/hello-world')} className={pathname === '/hello-world' ? 'is-active' : ''}>Hello world</a>
    <a href='/archives' onClick={goto('/archives')} className={pathname === '/archives' ? 'is-active' : ''}>News</a>
    <StyledLogin />
    <style jsx>{`
      header {
        margin-bottom: 25px;
      }
      a {
        font-size: 14px;
        margin-right: 15px;
        text-decoration: none;
        hover: cursor;
      }
      .is-active {
        text-decoration: underline;
      }
    `}</style>
  </header>
)}

export default withRouter(Header)