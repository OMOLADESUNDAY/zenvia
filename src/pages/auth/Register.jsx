import React, { useState } from "react";
import illustration from "../../assets/secure.png";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import SmallLoadingSpinner from '../../components/common/SmallLoadingSpinner'
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage]=useState('')
  const [loading,setLoading]=useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error while typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(formData.password))
    ) {
      newErrors.password =
        "Password must be at least 6 characters and include a number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const registerNow = async(e) => {
    e.preventDefault();
setLoading(true)
    if (!validate()) return;
    const {name,email,password}=formData
    const payload={name,email,password}
    const url=`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`
    try {
      const res=await axios.post(url,payload)
      setLoading(false)
      setMessage(res.data.message)
    } catch (error) {
      setMessage('error')
    }
    
     // ✅ Clear form after successful register
  // setFormData({
  //   name: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // // Optional: clear errors & hide password
  // setErrors({});
  // setShowPassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Illustration */}
          <div className="hidden md:flex items-center justify-center bg-gray-100 p-8">
            <img src={illustration} alt="Register" />
          </div>

          {/* Form */}
          <div className="flex items-center justify-center p-8 sm:p-10">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-semibold text-green-600 text-center">
                Register
              </h2>

              <form onSubmit={registerNow} className="mt-8 space-y-5">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                     placeholder="David Joe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md pr-10 focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md pr-10 focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>


                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                >
                 {loading? <SmallLoadingSpinner/>: "REGISTER"}
                </button>

              </form>
              <p className={message==='error'?'text-red-700':'text-green-900'}>{message}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
