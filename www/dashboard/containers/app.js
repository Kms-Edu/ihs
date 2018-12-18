import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { StoreProvider } from 'easy-peasy';

const AppContainer = (props) => {
  const {Component, pageProps, router, reduxStore, apolloClient} = props
  
  return (
    <StoreProvider store={reduxStore}>
      <ApolloProvider client={apolloClient}>
        <Component key={router.route} {...pageProps} />
      </ApolloProvider>
    </StoreProvider>
  )
}

export default AppContainer
