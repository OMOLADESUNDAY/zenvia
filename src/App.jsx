import { useState } from 'react'
import Navbar from './components/common/Navbar'
import SearchNav from './components/common/SearchNav'
import Home from './pages/public/Home'
import Footer from './components/common/Footer'
import { Route,Routes } from 'react-router-dom'
import SingleProductPage from './pages/public/SingleProduct'


function App() {

  return (
    <>
      <Navbar/>
      <SearchNav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/single/:id' element={<SingleProductPage/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
