import { useState } from 'react'
import Navbar from './components/common/Navbar'
import SearchNav from './components/common/SearchNav'
import Home from './pages/public/Home'
import Footer from './components/common/Footer'



function App() {

  return (
    <>
      <Navbar/>
      <SearchNav/>
      <Home/>
      <Footer/>
    </>
  )
}

export default App
