// import React from 'react'
// import { useTranslation } from "react-i18next";
// import LanguageSwitcher from './LanguageSwitcher';
// import CurrencySwitcher from './currencySwitcher';
// import "./navbar.css"
// import logo from "../../../public/Zenvia.webp"
// import { ChevronDown } from 'lucide-react';
// import { Link } from 'react-router-dom';
// const Navbar = () => {
//     const { t } = useTranslation();
//   return (
//     <nav className='container navbar'>
//         <section className='top-navbar flex align-center justify-between'>
//             <div className='flex nav-hotline'><small>Hotline 24/7</small><small><b>(234)7069258526</b></small></div>
//             <div className='flex'>
//                 <div><LanguageSwitcher/></div>
//                 <div><CurrencySwitcher/></div>
//             </div>
           
//         </section>
//         <section className='bottom-navbar flex justify-between pt-3 pb-3'>
//         <div className="bottom-left-navbar flex items-center gap-8">
//             <img src={logo} className='w-12' alt="zenvia" />
//             <ul className='flex items-center gap-2'>
//                 <li className='list-none flex text-sm'><b><Link>Home</Link></b> <ChevronDown className='text-sm cursor-pointer' /></li>
                    
//                 <li className='list-none flex text-sm'><b><Link>Pages</Link></b> <ChevronDown className='text-sm cursor-pointer'/></li>

//                 <li className='list-none flex text-sm'><b><Link>Products</Link></b> <ChevronDown className='text-sm cursor-pointer'/> </li>
//                 <li className='list-none flex text-sm'><b><Link>Contact</Link></b> </li>
//             </ul>
//         </div>
//         <div className="bottom-right-navbar flex items-center ">
//             <div className='flex items-center gap-3'>
//                 <img src={logo} className='w-7 h-7' alt="user" />
//                 <div>
//                     <p>Welcome</p>
//                     <div><Link><b>Log in</b></Link>/<Link><b>Register</b></Link></div>
//                 </div>
//             </div>

//             <div className='flex items-center gap-3'>
//                 <img src={logo} className='w-7 h-7' alt="user" />
//                 <div>
//                     <p>Cart</p>
//                     <div>$900</div>
//                 </div>
//             </div>
//         </div>
//         </section>
//     </nav>
//   )
// }

// export default Navbar

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import logo from "/Zenvia.webp";
import { ChevronDown, Menu, X, User, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({
    home: false,
    pages: false,
    products: false,
    user: false,
    cart: false,
  });

  const pagesDropdown = ["About Us", "FAQ", "Team"];
  const productsDropdown = ["Product A", "Product B", "Product C"];
  const homeDropdown = ["Sub Home 1", "Sub Home 2"];

  const toggleDropdown = (name) => {
    setMobileDropdownOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <nav className="w-full shadow-md bg-white">
      {/* Top Navbar */}
      <div className="hidden md:flex container mx-auto justify-between items-center py-2 px-4 text-sm">
        <div className="flex gap-2">
          <small>Hotline 24/7</small>
          <small>
            <b>(234)7069258526</b>
          </small>
        </div>
        <div className="flex gap-4">
          <LanguageSwitcher />
          <CurrencySwitcher />
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="flex items-center gap-8">
          <img src={logo} className="w-12" alt="zenvia" />

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <li className="relative group">
              <Link to="/" className="flex items-center gap-1">
                Home <ChevronDown className="w-4 h-4" />
              </Link>
              <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
                {homeDropdown.map((item) => (
                  <li
                    key={item}
                    className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                  >
                    <Link to="/">{item}</Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="relative group">
              <Link to="/pages" className="flex items-center gap-1">
                Pages <ChevronDown className="w-4 h-4" />
              </Link>
              <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
                {pagesDropdown.map((page) => (
                  <li
                    key={page}
                    className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                  >
                    <Link to={`/${page.toLowerCase().replace(/\s/g, "")}`}>
                      {page}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="relative group">
              <Link to="/products" className="flex items-center gap-1">
                Products <ChevronDown className="w-4 h-4" />
              </Link>
              <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
                {productsDropdown.map((product) => (
                  <li
                    key={product}
                    className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                  >
                    <Link to={`/${product.toLowerCase().replace(/\s/g, "")}`}>
                      {product}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-gray-300 p-2 rounded-full">
                 <User className="w-7 h-7" />
            </div>
            <div>
              <p>Welcome</p>
              <div>
                <Link to="/login">
                  <b>Log in</b>
                </Link>
                /
                <Link to="/register">
                  <b>Register</b>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-300 p-2 rounded-full">
                 <ShoppingCart className="w-7 h-7" />
            </div>
           
            <div>
              <p>Cart</p>
              <div>$900</div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col gap-2 p-4">
            {/* Home */}
            <li>
              <button
                className="flex justify-between w-full items-center"
                onClick={() => toggleDropdown("home")}
              >
                Home <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdownOpen.home ? "rotate-180" : ""}`} />
              </button>
              {mobileDropdownOpen.home && (
                <ul className="pl-4 mt-1 flex flex-col gap-1">
                  {homeDropdown.map((item) => (
                    <li key={item}>
                      <Link to="/">{item}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Pages */}
            <li>
              <button
                className="flex justify-between w-full items-center"
                onClick={() => toggleDropdown("pages")}
              >
                Pages <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdownOpen.pages ? "rotate-180" : ""}`} />
              </button>
              {mobileDropdownOpen.pages && (
                <ul className="pl-4 mt-1 flex flex-col gap-1">
                  {pagesDropdown.map((page) => (
                    <li key={page}>
                      <Link to={`/${page.toLowerCase().replace(/\s/g, "")}`}>{page}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Products */}
            <li>
              <button
                className="flex justify-between w-full items-center"
                onClick={() => toggleDropdown("products")}
              >
                Products <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdownOpen.products ? "rotate-180" : ""}`} />
              </button>
              {mobileDropdownOpen.products && (
                <ul className="pl-4 mt-1 flex flex-col gap-1">
                  {productsDropdown.map((product) => (
                    <li key={product}>
                      <Link to={`/${product.toLowerCase().replace(/\s/g, "")}`}>{product}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Contact */}
            <li>
              <Link to="/contact">Contact</Link>
            </li>

            {/* User / Login Register */}
            <li>
              <button
                className="flex justify-between w-full items-center"
                onClick={() => toggleDropdown("user")}
              >
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>Account</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdownOpen.user ? "rotate-180" : ""}`} />
              </button>
              {mobileDropdownOpen.user && (
                <ul className="pl-4 mt-1 flex flex-col gap-1">
                  <li>
                    <Link to="/login">Log in</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Cart */}
            <li>
              <button
                className="flex justify-between w-full items-center"
                onClick={() => toggleDropdown("cart")}
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdownOpen.cart ? "rotate-180" : ""}`} />
              </button>
              {mobileDropdownOpen.cart && (
                <ul className="pl-4 mt-1 flex flex-col gap-1">
                  <li>Total: $900</li>
                  <li>
                    <Link to="/cart">View Cart</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
