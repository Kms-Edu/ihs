import {SubscriptionClient} from 'subscriptions-transport-ws';

export const createSubscriptionClient = ({
  wsUrl,
  reduxStore,
}) => {
  const wsClient = new SubscriptionClient(wsUrl, {
    reconnect: true,
    timeout: 30000,
    connectionParams: async () => {
      const token = reduxStore.getState().auth.token//localStorage.getItem('token');
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  });

  wsClient.maxConnectTimeGenerator.duration = () => wsClient.maxConnectTimeGenerator.max
  wsClient.onDisconnected(() => { 
    //console.log('Disconnected')
    reduxStore.dispatch.websocket.setStatus('Disconnected')
  });

  wsClient.onConnecting(() => { 
    //console.log('Connecting')
    reduxStore.dispatch.websocket.setStatus('Connecting')
  });

  wsClient.onReconnecting(() => { 
    //console.log('Reconnecting')
    reduxStore.dispatch.websocket.setStatus('Reconnecting')
  });

  wsClient.onConnected(() => { 
    //console.log('Connected')
    reduxStore.dispatch.websocket.setStatus('Connected')
  });

  return wsClient
}

export default createSubscriptionClient