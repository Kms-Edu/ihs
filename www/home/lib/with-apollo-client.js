import React from 'react'
import initApollo from './init-apollo'

export default (graphqlHost) => (App) => {
  return class Apollo extends React.Component {
    static displayName = 'withApollo(App)'
    static async getInitialProps (ctx) {
      const {isMobile} = ctx.ctx
      if (!isMobile) {
        const {reduxStore} = ctx.ctx
      
      
        // Run all GraphQL queries in the component tree
        // and extract the resulting data
        const apollo = initApollo(null, {reduxStore, graphqlHost})

        const {req} = ctx.ctx
        const fetchPolicy = req ? { fetchPolicy: 'network-only' } : { fetchPolicy: 'cache-first' }
        ctx.ctx.apolloClient = apollo
        ctx.ctx.fetchPolicy = fetchPolicy
        
        let appProps = {}
        if (App.getInitialProps) {
          appProps = await App.getInitialProps(ctx)
        }

        // Extract query data from the Apollo store
        const apolloState = apollo.cache.extract()

        return {
          ...appProps,
          apolloState
        }
      }
    }

    constructor (props) {
      super(props)
      if (!props.isMobile) {
        const reduxStore = props.reduxStore
        this.apolloClient = initApollo(props.apolloState, {reduxStore, graphqlHost})
      }      
    }

    render () {
      const {isMobile} = this.props
      if (!isMobile) {
        return <App {...this.props} apolloClient={this.apolloClient} />
      } else {
        return <App {...this.props} />
      }
    }
  }
}