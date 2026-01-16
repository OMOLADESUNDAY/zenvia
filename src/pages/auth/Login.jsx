import React, { useState } from "react";
import illustration from "../../assets/secure.png"; // replace with your image path
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
import CopyText from "../../components/common/CopyText";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const navigate=useNavigate()
    const [copied,setCopied]=useState('')
    const [copiedpassword,setCopiedpassword]=useState('')
    const login = useAuthStore((state) => state.login);
    const [showPassword, setShowPassword] = useState(false);
    const url=`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`
    const [payload,setPayload]=useState({email:'',password:""})
    const [isLoading,setIsLoading]=useState(false)
    const [error, setError] = useState('');
    const handleSubmit=async(e)=>{
     e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(url, payload);
      console.log("Login success:", response.data);
       login({ token:response.data.token, user:response.data.user });
      navigate("/");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
    }
    const handleChange = (e) => {
  const { name, value } = e.target;
  setPayload((prev) => ({
    ...prev,
    [name]: value,
  }));
};


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

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                   name="email"
                      value={payload.email}
                onChange={handleChange}
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
           name="password"
           value={payload.password}
          onChange={handleChange}
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

      <div className="text-right mt-1">
        <a
          href="#"
          className="text-sm text-green-600 hover:underline"
        >
          Forgot Password?
        </a>
      </div>
    </div>
           {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
                {/* Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
                >
                   {isLoading ? "Logging in..." : "LOGIN"}
                </button>
              </form>

              {/* Footer */}
              <p className="text-sm text-center text-gray-600 mt-6">
                New user?{" "}
                <Link to='/register' className="text-green-600 font-medium hover:underline">
                  Sign Up
                </Link>
              </p>

              <div>
                <p>Test Account</p>
                <p>Email:dobeswalter@gmail.com <span><CopyText setCopied={setCopied} text="dobeswalter@gmail.com" />{copied}</span></p>
                <p>password:Tester1234@# <span><CopyText setCopied={setCopiedpassword} text="Tester1234@#" /></span>{copiedpassword}</p>
                
              </div>


            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

