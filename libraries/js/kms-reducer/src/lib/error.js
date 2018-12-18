export default {
  error: {
    message: null,
    setError: (state, payload) => {
      state.message = payload // 👈 you mutate state to update (we convert
    }   
  }  
}
