import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiCheckCircle, FiShoppingBag, FiHome } from 'react-icons/fi';

export default function OrderConfirmation() {
  const location = useLocation();
  const { order } = location.state || {};
  
  // Fallback data if page is accessed directly
  const fallbackOrder = {
    shippingInfo: {
      firstName: 'Customer'
    },
    items: [],
    total: 0
  };
  
  const orderData = order || fallbackOrder;

  return (
    <div className="container mt-16 mx-auto p-4 md:p-8 min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full text-center">
        <div className="flex justify-center mb-6">
          <FiCheckCircle className="text-green-500 text-6xl" />
        </div>
        
        <h1 className="text-3xl font-bold text-purple-800 mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-lg mb-6">
          Thank you, {orderData.shippingInfo.firstName}! Your order has been received.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center">
            <FiShoppingBag className="mr-2" />
            Order Summary
          </h2>
          
          <div className="space-y-3 text-left">
            <div className="flex justify-between">
              <span>Order Total:</span>
              <span className="font-semibold">₹{orderData.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Method:</span>
              <span className="font-semibold">
                {orderData.paymentMethod === 'cashOnDelivery' ? 'Cash on Delivery' : 
                 orderData.paymentMethod === 'creditCard' ? 'Credit/Debit Card' : 'UPI Payment'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Items:</span>
              <span className="font-semibold">
                {orderData.items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
          </div>
        </div>
        
        <p className="mb-6">
          We've sent a confirmation email to your registered address.
          Your order will be shipped within 2-3 business days.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
          >
            <FiHome className="mr-2" />
            Back to Home
          </Link>
          
        </div>
      </div>
    </div>
  );
}