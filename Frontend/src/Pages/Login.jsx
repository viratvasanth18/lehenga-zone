import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiLoader } from "react-icons/fi"; // Import Loader Icon
import img from "../assets/Logo1.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // New state for loader

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Define admin credentials
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";
  
    if (formData.email === adminEmail && formData.password === adminPassword) {
      setMessage("Admin Login Successful! Redirecting...");
      setTimeout(() => navigate("/admin"), 1500);
      return;
    }
  
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, formData);
      localStorage.setItem("user", JSON.stringify(data));
  
      setMessage("Login Successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.error || "Invalid Credentials");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center min-h-screen border-gray-100 border rounded-2xl shadow-md bg-gradient-to-r from-blue-100 to-purple-200">
      {/* Left Side - Image & Text */}
      <div className="md:flex md:w-1/2 h-full items-center justify-center mt-3.5">
        <div className="text-center max-w-md">
          <img src={img} alt="Illustration" className="w-80 mx-auto mb-6 rounded-2xl sm:mt-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            Bride &<span className="text-green-600"> Groom Destination</span>
          </h2>
          <p className="text-gray-600 mt-2 pb-2.5">
            It is certainly important because it is only through hard work that we can achieve the goals of our life.
          </p>
        </div>
      </div>
      
      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center items-center md:w-1/2 w-full p-8 md:p-20 bg-gradient-to-r from-blue-100 to-purple-200 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Login</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="relative mb-4">
            <FiMail className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="pl-10 border border-gray-300 rounded-md p-2 w-full focus:ring focus:outline-1 focus:outline-orange-400"
            />
          </div>
          
          <div className="relative mb-4">
            <FiLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="pl-10 border border-gray-300 rounded-md p-2 w-full focus:ring focus:outline-1 focus:outline-orange-400"
            />
          </div>

          <div className="flex justify-center text-sm text-gray-600 mb-4">
            <a href="#" className="pr-2">Don't have an account?</a>
            <Link to="/register" className="hover:text-blue-600">Create an Account</Link> 
          </div>

          <button type="submit" className="bg-green-500 text-white p-2 rounded-md w-full hover:bg-green-600">
            Login
          </button>

        
          {message && (
            <div className="flex justify-center items-center mt-2">
              <p className={message.includes("Success") ? "text-green-500" : "text-red-500"}>
                {message}
              </p>
              {loading && message.includes("Success") && (
                <FiLoader className="ml-2 text-green-500 animate-spin" /> 
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
