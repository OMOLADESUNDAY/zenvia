import React from "react";
import illustration from "../../assets/secure.png"; // replace with your image path

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Illustration */}
          <div className="hidden md:flex items-center justify-center bg-gray-100 p-8">
            <img
              src={illustration}
              alt="Login Illustration"
              className="max-w-full h-auto"
            />
          </div>

          {/* Right Form */}
          <div className="flex items-center justify-center p-8 sm:p-10">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-semibold text-green-600 text-center">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-500 text-center mt-1">
                Login to continue
              </p>

              <form className="mt-8 space-y-5">
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
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  <div className="text-right mt-1">
                    <a
                      href="#"
                      className="text-sm text-green-600 hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
                >
                  LOGIN
                </button>
              </form>

              {/* Footer */}
              <p className="text-sm text-center text-gray-600 mt-6">
                New user?{" "}
                <a href="#" className="text-green-600 font-medium hover:underline">
                  Sign Up
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
