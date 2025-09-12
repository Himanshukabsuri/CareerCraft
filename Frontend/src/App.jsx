import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Tools from './components/Tools'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilderForm from './pages/Resume_builderForm'
import ResumeForm from './pages/Resume_form'
import AIPackageResult from './pages/AIPackageResult'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tools' element={<Tools />} />
        <Route path='/ai' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='Resume-builder' element={<ResumeBuilderForm/>}/>
          <Route path='/ai/resume-form' element={<ResumeForm />} />

          <Route path='AIPackageResult' element={<AIPackageResult/>}/>

          </Route>
        
        
      </Routes>
    </div>
  )
}

export default App
