import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi"; // Loader Icon

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email.includes("@")) errors.email = "Valid email is required";
    if (!/^[0-9]{10}$/.test(formData.mobile))
      errors.mobile = "Valid 10-digit mobile number required";
    if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Show loader when submitting

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, formData);
      setMessage("Signup Successful! Redirecting...");
      
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed");
      setLoading(false); // Stop loader on error
    }
  };

  return (
    <div
      className="font-[Poppins] flex items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/background.jpeg')" }}
    >
      <div className="rounded-lg shadow-md w-full max-w-md p-8 backdrop-blur-lg bg-opacity-90 border">
        <h2 className="text-2xl text-white font-bold text-center mb-4">
          Create an Account
        </h2>

        {message && (
          <div className="flex justify-center items-center mb-2">
            <p className={message.includes("Successful") ? "text-green-500" : "text-red-500"}>
              {message}
            </p>
            {loading && message.includes("Successful") && (
              <FiLoader className="ml-2 text-green-500 animate-spin" size={18} />
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-2 border rounded focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 border rounded focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full p-2 border rounded focus:outline-none"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full p-2 border rounded focus:outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <div>
            <label className="block text-white text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full p-2 border rounded focus:outline-none"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Signup
          </button>

          {/* Already have an account? Login */}
          <p className="text-center text-white mt-1">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Please Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
