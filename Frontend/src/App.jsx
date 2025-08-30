import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Tools from './components/Tools'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tools' element={<Tools />} />
      </Routes>
    </div>
  )
}

export default App
