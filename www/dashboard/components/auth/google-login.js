import React from 'react';
import styled from 'styled-components/macro'
import { useAction, useStore } from 'easy-peasy';
const { GoogleLogin, GoogleLogout } = typeof window === 'object' ? require('react-google-login') : {};

const HeaderLink = styled.a`
  font-size: 14px;
  margin-right: 15px;
  text-decoration: none;
  hover: cursor;
`
const Login = (props) => {
  const login = useAction(dispatch => dispatch.auth.login)
  const logout = useAction(dispatch => dispatch.auth.logout)
  const token = useStore(state => state.auth.token)
  if (token) {
    return (
      <GoogleLogout
        buttonText="Logout"
        onLogoutSuccess={logout}
        render={renderProps => (
          <HeaderLink onClick={renderProps.onClick}>Logout</HeaderLink>
        )}
      >
      </GoogleLogout>
    )
  } else {
    return (
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={login}
        onFailure={login}
        render={renderProps => (
          <HeaderLink onClick={renderProps.onClick}>Google Login</HeaderLink>
        )}
        {...props}
      />
    )
  }
}

export default Login
