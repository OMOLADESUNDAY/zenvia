
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import SearchNav from '../components/common/SearchNav'
import Footer from '../components/common/Footer'

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <SearchNav />
      <Outlet />
      <Footer />
    </>
  )
}

export default PublicLayout
