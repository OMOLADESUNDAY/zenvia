
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import logo from "/Zenvia.webp";
import { ChevronDown, Menu, X, User, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";

const Navbar = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const cartnumber =useCartStore((state) => state.cartCount);
  const cartItems = useCartStore((state)=>state.cartItems)
  const amount= cartItems.reduce((sum, item)=>sum + item.product.price, 0)
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({
    home: false,
    pages: false,
    products: false,
    user: false,
    cart: false,
  });

  const closeMobileMenu = () => {
  setMobileMenuOpen(false);
  setMobileDropdownOpen({
    home: false,
    pages: false,
    products: false,
    user: false,
    cart: false,
  });
};


  const pagesDropdown = ["About"];
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
          <Link to='/'><img src={logo} className="w-12" alt="zenvia" /></Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <li className="relative group">
              <Link to="/" className="flex items-center gap-1">
                Home 
              </Link>
             
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
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-gray-300 p-2 rounded-full">
                <Link to='/profile'><User className="w-7 h-7" /></Link>
                 
            </div>
            <div>
              <p>Welcome</p>
              <div>
                {token?<p className="capitalize">{user.name}</p>:<Link to="/login">
                  <p>Log in</p>
                </Link>
                /
                <Link to="/register">
                  <p>Register</p>
                </Link>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-300 p-2 rounded-full relative">
              <Link to='/cart'>
                <ShoppingCart className="w-7 h-7" />
              </Link>
                 <small className="absolute text-red-700 -top-2 -right-2 bg-gray-500 rounded-full w-5 h-5 text-center">{cartnumber}</small>
            </div>
           
            <div>
              <p>Cart</p>
              <div>${amount}</div>
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
                      <Link onClick={closeMobileMenu} to="/">{item}</Link>
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
                      <Link onClick={closeMobileMenu} to={`/${page.toLowerCase().replace(/\s/g, "")}`}>{page}</Link>
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
                      <Link onClick={closeMobileMenu} to={`/${product.toLowerCase().replace(/\s/g, "")}`}>{product}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Contact */}
            <li>
              <Link onClick={closeMobileMenu} to="/contact">Contact</Link>
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
                    <Link onClick={closeMobileMenu} to="/login">Log in</Link>
                  </li>
                  <li>
                    <Link onClick={closeMobileMenu} to="/register">Register</Link>
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
