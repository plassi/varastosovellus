import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import App from './App'

const renderApp = () => {
  console.log(store.getState())
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
}

store.subscribe(renderApp)
renderApp()