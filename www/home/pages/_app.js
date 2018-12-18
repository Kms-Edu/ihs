import reducer from 'kms-reducer'
import makeApp from 'kms-web-app'

export default makeApp(reducer, process.env.GRAPHQL_HOST)
