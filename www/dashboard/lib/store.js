import { createStore } from 'easy-peasy';
import model from '../models'

const initializeStore = (initialState) => {
  return createStore(model, {
    initialState,
  })
}

export default initializeStore
