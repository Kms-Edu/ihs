import withReduxStore from './with-redux-store'
import withApolloClient from './with-apollo-client'
import withApp from './with-app'
import withMobileDetect from './with-mobile-detect'
import AppContainer from 'kms-web-container'
import {compose} from 'recompose'

const makeApp = (model, graphqlHost) => {
  return compose(
    withMobileDetect,
    withReduxStore(model),
    withApolloClient(graphqlHost),
    withApp,
  )(AppContainer)
}

export default makeApp
