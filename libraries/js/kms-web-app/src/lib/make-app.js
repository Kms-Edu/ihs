import withReduxStore from './with-redux-store'
import withApolloClient from './with-apollo-client'
import withApp from './with-app'
import withMobileDetect from './with-mobile-detect'
import AppContainer from 'kms-web-container'
import {compose} from 'recompose'
import defaultReducer from 'kms-reducer'

const makeApp = (graphqlHost, reducer = {}) => {
  const finalReducer = {
    ...defaultReducer,
    reducer,
  }
  return compose(
    withMobileDetect,
    withReduxStore(finalReducer),
    withApolloClient(graphqlHost),
    withApp,
  )(AppContainer)
}

export default makeApp
