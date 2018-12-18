import {Fragment} from 'react'
import styled from 'styled-components/macro'
import {withRouter} from 'next/router'
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

const Link = ({href, children, router}) => {
  const { pathname } = router
  return (
    <Fragment>
    <HeaderLink 
      href={href} onClick={goto(href)} 
      className={pathname === href ? 'is-active' : ''}
    >
    {children}
    </HeaderLink>
    <style jsx>{`
      .is-active {
        text-decoration: underline;
      }
    `}</style>
    </Fragment>
  )
}
export default withRouter(Link)
