import { useState } from 'react'
import Navbar from './components/common/Navbar'
import SearchNav from './components/common/SearchNav'
import Home from './pages/public/Home'



function App() {

  return (
    <>
      <Navbar/>
      <SearchNav/>
      <Home/>
    </>
  )
}

export default App
