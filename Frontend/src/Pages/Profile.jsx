import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPencilAlt, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        navigate("/login");
        return;
      }

      try {
        console.log(storedUser.user._id)
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile/${storedUser.user.email}`);
        setUser(data);
        
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/profile/${user._id}`, user);
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-4 md:p-6 lg:p-8 xl:p-10 w-full mt-14">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">User Profile</h2>
          <button 
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? <FaSave className="w-4 h-4 inline" /> : <FaPencilAlt className="w-4 h-4 inline" />}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(user).map((key) => (
            <div key={key}>
              <label className="block font-medium text-gray-700 capitalize">{key}</label>
              <input
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                name={key}
                value={user[key]}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;