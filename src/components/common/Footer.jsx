
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-white mt-16">
      <div className="container mx-auto px-4 py-10">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* BRAND & CONTACT */}
          <div className="space-y-3">
            <h3 className="font-bold uppercase">ZENVIA – 1st NG Tech Online Market</h3>
            <p className="text-sm text-gray-500">Hotline 24/7</p>
            <p className="text-green-600 text-xl font-bold">(+234) 706 925 8526</p>
            <p className="text-sm text-gray-500">
              25 Sunday Bus Stop, Ijoka, Akure, NG
            </p>
            <p className="text-sm text-gray-500">sundayomoladee11@gmail.com</p>

            {/* Socials */}
            <div className="flex gap-3 pt-2">
              {[<Twitter />, <Facebook />, <Linkedin />, <Instagram />].map((icon, i) => (
                <span
                  key={i}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="font-bold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                { label: "About Zenvia", link: "/about" },
                { label: "Contact", link: "/contact" },
                { label: "My Account", link: "/profile" }
              ].map((item, i) => (
                <li key={i}>
                  <Link to={item.link} className="hover:text-green-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* HELP CENTER */}
          <div>
            <h4 className="font-bold mb-3">Help Center</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                { label: "Customer Service", link: "/customer-service" },
                { label: "My Account", link: "/account" },
                { label: "Policy", link: "/policy" },
                { label: "Terms & Conditions", link: "/terms" },
              ].map((item, i) => (
                <li key={i}>
                  <Link to={item.link} className="hover:text-green-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUBSCRIBE */}
          <div className="mt-4">
            <h4 className="font-bold mb-3">Subscribe</h4>
            <p className="text-sm text-gray-500">
              Get 10% off for your first order
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-600 transition">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2024 Shawontech. All Rights Reserved</p>

          <div className="flex gap-4">
            {["PayPal", "MasterCard", "Visa", "Stripe", "Klarna"].map((pay, i) => (
              <span key={i} className="font-medium">
                {pay}
              </span>
            ))}
          </div>

          <span className="hover:text-green-500 cursor-pointer">
            Mobile Site
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
