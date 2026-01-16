// import { useState } from 'react'
// import Navbar from './components/common/Navbar'
// import SearchNav from './components/common/SearchNav'
// import Home from './pages/public/Home'
// import Footer from './components/common/Footer'
// import { Route,Routes } from 'react-router-dom'
// import SingleProductPage from './pages/public/SingleProduct'
// import About from './pages/public/About'
// import Login from './pages/auth/Login'
// import Register from './pages/auth/Register'
// import Cart from './pages/public/Cart'
// import AccountInfo from './pages/user/Profile'
// import ContactPage from './pages/public/Contact'
// import CheckoutPageWrapper from './layouts/CheckoutPageWrapper'
// import PaymentSuccessModal from './components/ui/PaymentSuccessModal'
// import CategoryPage from './pages/public/Category'
// import AdminProtected from './route/AdminProtected'
// import UserProtected from './route/UserProtected'


// function App() {

//   return (
//     <>
//       <Navbar/>
//       <SearchNav/>
//       <Routes>
//         <Route path='/' element={<Home/>}/>
//         <Route path='/single/:id' element={<SingleProductPage/>}/>
//          <Route path='/categories/:slug' element={<CategoryPage/>}/>
//         <Route path='/about' element={<About/>}/>
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/register' element={<Register/>}/>
//         <Route path='/checkout' element={<CheckoutPageWrapper/>}/>
//         <Route path='/cart' element={<Cart/>}/>
//         <Route path='/profile' element={<AccountInfo/>}/>
//         <Route path='/contact' element={<ContactPage/>}/>
//         <Route path='/payment-successful' element={<PaymentSuccessModal/>}/>
//       </Routes>
//       <Footer/>
//     </>
//   )
// }

// export default App











import { useState } from 'react'
import Navbar from './components/common/Navbar'
import SearchNav from './components/common/SearchNav'
import Home from './pages/public/Home'
import Footer from './components/common/Footer'
import { Route, Routes } from 'react-router-dom'
import SingleProductPage from './pages/public/SingleProduct'
import About from './pages/public/About'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Cart from './pages/public/Cart'
import AccountInfo from './pages/user/Profile'
import ContactPage from './pages/public/Contact'
import CheckoutPageWrapper from './layouts/CheckoutPageWrapper'
import PaymentSuccessModal from './components/ui/PaymentSuccessModal'
import CategoryPage from './pages/public/Category'
import AdminProtected from './route/AdminProtected'
import UserProtected from './route/UserProtected'

function App() {
  return (
    <>
      <Navbar />
      <SearchNav />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/single/:id' element={<SingleProductPage />} />
        <Route path='/categories/:slug' element={<CategoryPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<UserProtected> <Cart /></UserProtected>} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/payment-successful' element={<UserProtected><PaymentSuccessModal /></UserProtected> } />

        {/* Protected Routes */}
        <Route
          path='/checkout'
          element={
            <UserProtected>
              <CheckoutPageWrapper />
            </UserProtected>
          }
        />
        <Route
          path='/profile'
          element={
            <UserProtected>
              <AccountInfo />
            </UserProtected>
          }
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
