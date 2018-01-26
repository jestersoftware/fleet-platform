// DATA AND TODO EXAMPLES


// import React from 'react';
// import ReactDOM from 'react-dom';

// import { Provider } from 'react-redux'
// import { createStore } from 'redux'

// import registerServiceWorker from './registerServiceWorker'

// import './index.css'

// // import App from './App';
// import App from './components/example/todo/App'
// // import App from './components/example/api/App'

// import reducers from './components/example/todo/state/reducers'
// // import reducers from './components/example/api/state/reducers'

// let store = createStore(reducers)

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>, 
//     document.getElementById('root')
// );

// registerServiceWorker();


// // Log the initial state
// console.log(store.getState())

// // Every time the state changes, log it
// // Note that subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// )

// // // Dispatch some actions
// // store.dispatch(addTodo('Learn about actions'))
// // store.dispatch(addTodo('Learn about reducers'))
// // store.dispatch(addTodo('Learn about store'))
// // store.dispatch(toggleTodo(0))
// // store.dispatch(toggleTodo(1))
// // store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// // Stop listening to state updates
// // unsubscribe()





// API EXAMPLE


import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { selectSubreddit, fetchPosts, fetchPostsIfNeeded } from './components/example/api/state/actions'
import rootReducer from './components/example/api/state/reducers'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

store.dispatch(selectSubreddit('reactjs'))

// store
//   .dispatch(fetchPosts('reactjs'))
//   .then(() => console.log(store.getState()))

store
  .dispatch(fetchPostsIfNeeded('reactjs'))
  .then(() => console.log(store.getState()))