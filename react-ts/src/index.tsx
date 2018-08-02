import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './modules'
import App from './App'
import 'antd/dist/antd.css'

const logger = createLogger()
const store = createStore(reducer, applyMiddleware(thunk, logger))

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
