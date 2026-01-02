import React, { useState } from "react";
import illustration from "../../assets/secure.png"; // replace with your image path
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
   const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Left Illustration */}
          <div className="hidden md:flex items-center justify-center bg-gray-100 p-8">
            <img
              src={illustration}
              alt="Register Illustration"
              className="max-w-full h-auto"
            />
          </div>

          {/* Right Form */}
          <div className="flex items-center justify-center p-8 sm:p-10">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-semibold text-green-600 text-center">
                Register
              </h2>
              <p className="text-sm text-gray-500 text-center mt-1">
                Join to us
              </p>

              <form className="mt-8 space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your name
                  </label>
                  <input
                    type="text"
                    placeholder="Jhon Deo"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                {/* Password */}
                 <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none pr-10"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>

                {/* Confirm Password */}
                <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none pr-10"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
     {/* Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
                >
                  REGISTER
                </button>
              </form>

              {/* Footer */}
              <p className="text-sm text-center text-gray-600 mt-6">
                Already user?{" "}
                <a href="#" className="text-green-600 font-medium hover:underline">
                  Login
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
