import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Tools from '../components/Tools'
import Feedback from '../components/Feedback'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Tools/>
        <Feedback/>
        <Footer/>
    </div>
  )
}

export default Home
