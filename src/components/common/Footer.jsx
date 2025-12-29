import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white  mt-16">
      <div className="container mx-auto px-4 py-10">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

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
              {[<Twitter />,<Facebook />, <Linkedin />, <Instagram />].map((icon, i) => (
                <span
                  key={i}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {/* TOP CATEGORIES */}
          <div>
            <h4 className="font-bold mb-3">Top Categories</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                "Laptops",
                "PC & Computers",
                "Cell Phones",
                "Tablets",
                "Gaming & VR",
                "Networks",
                "Cameras",
                "Sounds",
                "Office",
              ].map((item, i) => (
                <li key={i} className="hover:text-green-500 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="font-bold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {["About Zenvia", "Contact", "Career", "Blog", "Sitemap", "Store Locations"].map(
                (item, i) => (
                  <li key={i} className="hover:text-green-500 cursor-pointer">
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* HELP CENTER */}
          <div>
            <h4 className="font-bold mb-3">Help Center</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                "Customer Service",
                "Policy",
                "Terms & Conditions",
                "Track Order",
                "FAQs",
                "My Account",
                "Product Support",
              ].map((item, i) => (
                <li key={i} className="hover:text-green-500 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* PARTNER */}
          <div>
            <h4 className="font-bold mb-3">Partner</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {["Become Seller", "Affiliate", "Advertise", "Partnership"].map(
                (item, i) => (
                  <li key={i} className="hover:text-green-500 cursor-pointer">
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* SUBSCRIBE */}
        <div className="mt-10 border-t pt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <h4 className="font-bold">
              Subscribe & get <span className="text-red-500">10% off</span> for your first order
            </h4>
            <p className="text-sm text-gray-500">
              By subscribing, you agree to our Policy
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
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

          <span className="hover:text-green-500 cursor-pointer">Mobile Site</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
