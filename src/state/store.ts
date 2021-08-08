import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(
//   reducers,
//   applyMiddleware(thunk)
// );

//applyMiddleware allows us to use dispatch in our components
// composeEnhancers allows us to use our redux extension in browser
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);