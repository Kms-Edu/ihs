import { createStore } from 'easy-peasy';
const initializeStore = (model, initialState) => {
  return createStore(model, {
    initialState,
  })
}

export default initializeStore
