
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaDiscourse, FaDownload } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi"; // Icons for sidebar toggle
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function Purchases() {
  const [purchases, setPurchase] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open state

  const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token; // using optional chaining to avoid app crashing

  console.log("purchases: ", purchases);

  // Token handling
  useEffect(() => {
 
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (!token) {
    navigate("/login");
  }

  // Fetch purchases
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/purchases`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setPurchase(response.data.courseData);
      } catch (error) {
        setErrorMessage("Failed to fetch purchase data");
      }
    };
    fetchPurchases();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      navigate("/login");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white to-gray-100">
  {/* Sidebar */}
  <div
    className={`fixed inset-y-0 left-0 bg-white shadow-md p-5 transform ${
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 z-50`}
  >
    <nav className="pt-6">
      <ul className="space-y-4">
        <li>
          <Link to="/" className="flex items-center text-gray-700 hover:text-orange-500">
            <RiHome2Fill className="mr-2" /> Home
          </Link>
        </li>
        <li>
          <Link to="/courses" className="flex items-center text-gray-700 hover:text-orange-500">
            <FaDiscourse className="mr-2" /> Courses
          </Link>
        </li>
        <li>
          <a href="#" className="flex items-center text-indigo-600 font-medium">
            <FaDownload className="mr-2" /> Purchases
          </a>
        </li>
        <li>
          <Link to="/settings" className="flex items-center text-gray-700 hover:text-orange-500">
            <IoMdSettings className="mr-2" /> Settings
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="flex items-center text-gray-700 hover:text-red-500">
              <IoLogOut className="mr-2" /> Logout
            </button>
          ) : (
            <Link to="/login" className="flex items-center text-gray-700 hover:text-orange-500">
              <IoLogIn className="mr-2" /> Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  </div>

  {/* Sidebar Toggle Button (Mobile) */}
  <button
    className="fixed top-4 left-4 z-50 md:hidden bg-orange-500 text-white p-2 rounded-lg shadow-md"
    onClick={toggleSidebar}
  >
    {isSidebarOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
  </button>

  {/* Main Content */}
  <div
    className={`flex-1 p-6 transition-all duration-300 ${
      isSidebarOpen ? "ml-64" : "ml-0"
    } md:ml-64`}
  >
    <h2 className="text-2xl font-bold mb-6 text-gray-800">My Purchases</h2>

    {/* Error message */}
    {errorMessage && (
      <div className="text-red-500 text-center mb-4">{errorMessage}</div>
    )}

    {/* Render purchases */}
    {purchases.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {purchases.map((purchase, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-5">
            <img
              className="rounded-lg w-full h-40 object-cover mb-4"
              src={purchase.image?.url || "https://via.placeholder.com/200"}
              alt={purchase.title}
            />
            <div>
              <h3 className="text-md font-bold text-gray-800 mb-1">
                {purchase.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {purchase.description.length > 100
                  ? `${purchase.description.slice(0, 100)}...`
                  : purchase.description}
              </p>
              <span className="text-green-600 font-semibold text-sm">
                ${purchase.price} only
              </span>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">You have no purchases yet.</p>
    )}
  </div>
</div>
  );
}

export default Purchases;
