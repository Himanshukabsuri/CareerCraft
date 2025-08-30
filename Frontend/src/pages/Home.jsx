import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Tools from '../components/Tools'
import Feedback from '../components/Feedback'
import Plan from '../components/plan'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Tools/>
        <Feedback/>
        <Plan/>
    </div>
  )
}

export default Home
