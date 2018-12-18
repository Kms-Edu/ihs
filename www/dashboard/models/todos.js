export default {
  todos: {
    items: ['Install easy-peasy', 'Build app', 'Profit'],
    // 👇 define actions
    add: (state, payload) => {
      state.items.push(payload) // 👈 you mutate state to update (we convert
    }                           //    to immutable updates)
  }
}
