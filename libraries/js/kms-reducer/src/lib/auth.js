import axios from 'axios'
import { effect } from 'easy-peasy';
axios.defaults.crossDomain = true;

export default {
  auth: {
    token: null,
    login: effect(async (dispatch, payload, getState) => {
      const loginRequest = axios.post(payload.url, {id_token: payload.tokenId, })
      try {
        const [loginResponse] = await Promise.all([loginRequest])
        const { token } = loginResponse.data
        if (token) {
          localStorage.setItem('token', token)
          dispatch.auth.tokenSaved({token})
        }
      } catch (error) {
        dispatch.auth.tokenSaved({token: null})
      }
    }),
    logout: effect(async (dispatch, payload, getState) => {
      const currentToken = getState().auth.token
      const logoutRequest = axios.post(payload.url, {id_token: currentToken, })
      try {
        await Promise.all([logoutRequest])
        localStorage.removeItem('token')
        dispatch.auth.tokenSaved({token: null})
      } catch (error) {
        dispatch.auth.tokenSaved({token: null})
      }
    }),
    tokenSaved: (state, payload) => {
      state.token = payload.token
    }
  }
}
