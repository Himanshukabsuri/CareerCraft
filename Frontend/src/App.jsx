import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Tools from './components/Tools'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilderForm from './pages/Resume_builderForm'
import ResumeForm from './pages/Resume_form'
import AIPackageResult from './pages/AIPackageResult'
import RoadmapHistory from './pages/RoadmapHistory'
import ResumeHistory from './pages/ResumeHistory'
import Login from './components/Login'
import Contact from './pages/Contact'
import Services from './pages/Services'
import AboutUs from './pages/AboutUs' 
import AtsAnalyzer from './pages/AtsAnalyzer'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        
        <Route path="/ai/ats-analyzer" element={<AtsAnalyzer />} />
        <Route path='/tools' element={<Tools />} />
        <Route path='/ai' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='Resume-builder' element={<ResumeBuilderForm/>}/>
          <Route path='/ai/resume-form' element={<ResumeForm />} />
          <Route path='/ai/roadmap-history' element={<RoadmapHistory/>}/> {/* remove double slash */}
          <Route path="/ai/resume-history" element={<ResumeHistory />} />
          <Route path='AIPackageResult' element={<AIPackageResult/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
