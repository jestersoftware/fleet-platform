import React from 'react'
import Footer from './Footer'
import AddTodo from './containers/AddTodo'
import VisibleTodoList from './containers/VisibleTodoList'

const App = () => (
  <div style={{ width: 500, margin: '0 auto', padding: 100 }}>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App