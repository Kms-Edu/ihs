import {SubscriptionClient} from 'subscriptions-transport-ws';

export const createSubscriptionClient = ({
  wsUrl,
}) => {
  const wsClient = new SubscriptionClient(wsUrl, {
    reconnect: true,
    timeout: 30000,
    connectionParams: async () => {
      const token = localStorage.getItem('token');
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  });

  wsClient.maxConnectTimeGenerator.duration = () => wsClient.maxConnectTimeGenerator.max
  wsClient.onDisconnected(() => { 
    console.log('Disconnected')
  });

  wsClient.onConnecting(() => { 
    console.log('Connecting')
  });

  wsClient.onReconnecting(() => { 
    console.log('Reconnecting')
  });

  wsClient.onConnected(() => { 
    console.log('Connected')
  });

  return wsClient
}

export default createSubscriptionClient