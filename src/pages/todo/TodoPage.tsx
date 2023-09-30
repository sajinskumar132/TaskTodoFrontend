import React from 'react'
import Todos from '../../components/Todo/Todos'
import Navbar from '../../components/Navbar/Navbar'
import Toolbar from '../../components/Toolbar/Toolbar'

function TodoPage() {
  return (
    <>
       <Navbar/>
       <Toolbar/>
       <Todos/>
    </>
  )
}

export default TodoPage