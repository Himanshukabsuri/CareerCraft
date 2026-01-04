import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Tools from '../components/Tools'
import Feedback from '../components/Feedback'
// import Plans from '../components/Plan'
import Footer from '../components/Footer'
import Resume_builderForm from './Resume_builderForm'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Tools/>
        <Feedback/>
        {/* <Plan/> */}
        <Footer/>
        
    </div>
  )
}

export default Home
