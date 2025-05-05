import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Collection from './Pages/Collection';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Register from './Pages/Register';
// import Orders from './Pages/OrdersPage';
import Profile from './Pages/Profile';
import AdminPage from './Pages/AdminPage';
import FilterProducts from './Pages/FilterProducts';
import ShippingPage from './Pages/ShippingPage';
import OrderConfirmation from './Pages/OrderConfirmation';
import OrdersPage from './Pages/OrdersPage';


function Layout({ cartItems, setCartItems }) {
  const location = useLocation();  
  const hideNavbarRoutes = ['/login', '/register'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar cartItems={cartItems} />}
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/collection" 
            element={<Collection cartItems={cartItems} setCartItems={setCartItems} />} 
          />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/cart" 
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/filter-products" element={<FilterProducts />} />

          
          <Route path="/shipping" element={<ShippingPage cartItems={cartItems} setCartItems={setCartItems} />} />
<Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('fashionCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('fashionCart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Router>
      <Layout cartItems={cartItems} setCartItems={setCartItems} />
    </Router>
  );
}