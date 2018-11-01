import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Router, Route, Switch } from 'react-router'
import { BrowserRouter, Link } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import store from './store'
import CreatingRoute from './creating_route'
import Child from './child'

/// /////////////////////////////////////////////////
// import reducer from './reducers';
//
// const store=createStore(reducer,
//
//    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//
//
// );

/// /////////////////////////////////////////////////
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/test' component={CreatingRoute} />
        <Route path="/b/:id" component={Child} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
