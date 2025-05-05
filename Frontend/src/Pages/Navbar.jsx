import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";
import Logo from "../assets/Logo1.png";

export default function Navbar({ cartItems = [] }) {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartUpdated, setCartUpdated] = useState(false);
  const navigate = useNavigate();

  // Calculate total items in cart
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  // Trigger animation when cart items change
  useEffect(() => {
    if (cartCount > 0) {
      setCartUpdated(true);
      const timer = setTimeout(() => setCartUpdated(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Check if user is logged in on page load
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  // Live search redirect
  useEffect(() => {
    const delayRedirect = setTimeout(() => {
      if (searchQuery.trim()) {
        navigate(`/filter-products?query=${encodeURIComponent(searchQuery)}`);
      }
    }, 300);

    return () => clearTimeout(delayRedirect);
  }, [searchQuery, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="shadow-md fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-1 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full" />
          <span className="text-base sm:text-lg md:text-xl font-bold text-black tracking-wide">
            Lehenga Zone
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-black font-medium">
          <li><Link to="/" className="hover:text-blue-500 transition">Home</Link></li>
          <li><Link to="/collection" className="hover:text-blue-500 transition">Collection</Link></li>
          <li><Link to="/about" className="hover:text-blue-500 transition">About</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500 transition">Contact</Link></li>
        </ul>

        {/* Icons Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1">
            <FiSearch className="text-gray-600 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-48"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Cart Icon with Indicator */}
          <div className="relative">
            <Link 
              to='/cart' 
              className={`
                p-2 rounded-full hover:bg-gray-200 transition
                ${cartUpdated ? 'animate-bounce' : ''}
              `}
            >
              <FiShoppingCart className="text-gray-600 w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative profile-menu flex flex-col items-center">
            <button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <FiUser className="text-gray-600 w-5 h-5 cursor-pointer" />
            </button>

            {user && (
              <p className="text-sm text-gray-700 font-semibold mt-1">Hi, {user.user.name}!</p>
            )}

            {profileOpen && (
              <div className="absolute top-10 text-center right-0 mt-2 w-40 bg-white shadow-lg rounded-md"
                onClick={() => setProfileOpen(false)}
              >
                {user ? (
                  <>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-blue-400 hover:text-white">Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 hover:bg-blue-400 hover:text-white">Orders</Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-center"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="block px-4 py-2 hover:bg-blue-400 hover:text-white">
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <div className="px-6">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 mb-4">
              <FiSearch className="text-gray-600 w-5 h-5 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent outline-none w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <ul className="space-y-4 text-center text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
              <li><Link to="/" className="block py-2 hover:text-blue-500">Home</Link></li>
              <li><Link to="/collection" className="block py-2 hover:text-blue-500">Collection</Link></li>
              <li><Link to="/about" className="block py-2 hover:text-blue-500">About</Link></li>
              <li><Link to="/contact" className="block py-2 hover:text-blue-500">Contact</Link></li>
              {!user && (
                <li><Link to="/login" className="block py-2 hover:text-blue-500">Login</Link></li>
              )}
              {user && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}