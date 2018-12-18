import quiz from './quiz'
import auth from './auth'
import todos from './todos'
import error from './error'
import websocket from './websocket'

export default {
  ...quiz,
  ...auth,
  ...todos,
  ...error,
  ...websocket,
}
