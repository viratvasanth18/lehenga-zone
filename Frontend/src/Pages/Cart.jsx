import React from "react";
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Cart({ cartItems = [], setCartItems }) {
  const removeItem = (id) => {
    const newCart = cartItems.filter(item => item._id !== id);
    setCartItems(newCart);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    const newCart = cartItems.map(item =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(newCart);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * (1 - item.discount / 100)) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-purple-800">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link 
            to="/collection" 
            className="inline-flex items-center bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 font-bold text-gray-700">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              {cartItems.map((item) => {
                const discountedPrice = item.price * (1 - item.discount / 100);
                return (
                  <div key={item._id} className="grid grid-cols-12 p-4 border-b items-center">
                    <div className="col-span-12 md:col-span-5 flex items-center mb-3 md:mb-0">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item._id)}
                          className="text-red-500 text-sm flex items-center mt-1"
                        >
                          <FaTrash className="mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-4 md:col-span-2 text-center mb-3 md:mb-0">
                      <span className="text-gray-500 line-through text-sm mr-1">
                        ₹{item.price}
                      </span>
                      <span className="font-medium">₹{discountedPrice.toFixed(0)}</span>
                    </div>
                    
                    <div className="col-span-4 md:col-span-3 flex justify-center mb-3 md:mb-0">
                      <div className="flex items-center border rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <FaMinus />
                        </button>
                        <span className="px-3 py-1 border-x">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-4 md:col-span-2 text-right font-medium">
                      ₹{(discountedPrice * item.quantity).toFixed(0)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t">
                  <span>Total</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
              </div>


<Link 
  to="/shipping" 
  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors text-center block"
>
  Proceed to Checkout
</Link>


              <Link 
                to="/collection" 
                className="block text-center mt-4 text-purple-600 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}