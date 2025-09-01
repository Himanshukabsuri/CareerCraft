import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Tools from './components/Tools'

import Dashboard from './pages/Dashboard'
import ResumeBuilderForm from './pages/Resume_builderForm'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tools' element={<Tools />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/form' element={<ResumeBuilderForm/>}/>
        
        
      </Routes>
    </div>
  )
}

export default App
