import React, { useState } from "react";
import logo from "../../public/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ password });
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("AdminLogin successful: ", response.data);
      toast.success(response.data.message);
      navigate("/admin/dashboard");
      localStorage.setItem("admin", JSON.stringify(response.data));
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "AdminLogin failed!!!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white">
  {/* Header */}
  <header className="w-full px-6 py-4 flex justify-between items-center bg-opacity-0 z-10">
    <div className="flex items-center space-x-3">
      <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
      <Link to="/" className="text-2xl font-bold text-orange-500 tracking-wide">
        CourseHaven
      </Link>
    </div>
    <div className="flex space-x-4">
      <Link
        to="/admin/signup"
        className="border border-gray-600 hover:border-orange-500 text-gray-300 hover:text-orange-500 px-5 py-2 rounded-md transition duration-300"
      >
        Signup
      </Link>
      <Link
        to="/courses"
        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md transition duration-300"
      >
        Join now
      </Link>
    </div>
  </header>

  {/* Admin Login Form */}
  <div className="flex justify-center items-center h-[calc(100vh-80px)] px-4">
    <div className="w-full max-w-md bg-gray-950 bg-opacity-90 p-8 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-semibold text-center mb-2">
        Welcome to <span className="text-orange-500">CourseHaven</span>
      </h2>
      <p className="text-center text-gray-400 mb-6">
        Log in to access admin dashboard!
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="text-gray-400 block mb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="name@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="text-gray-400 block mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="********"
              required
            />
            <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
              👁️
            </span>
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</div>

  );
}

export default AdminLogin;
