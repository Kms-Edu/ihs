export default {
  websocket: {
    status: null,
    setStatus: (state, payload) => {
      state.status = payload
    }
  }  
}
