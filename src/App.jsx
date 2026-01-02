import { useState } from 'react'
import Navbar from './components/common/Navbar'
import SearchNav from './components/common/SearchNav'
import Home from './pages/public/Home'
import Footer from './components/common/Footer'
import { Route,Routes } from 'react-router-dom'
import SingleProductPage from './pages/public/SingleProduct'
import About from './pages/public/About'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Checkout from './pages/user/Checkout'


function App() {

  return (
    <>
      <Navbar/>
      <SearchNav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/single/:id' element={<SingleProductPage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
