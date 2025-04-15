import React, { useState } from "react";
import logo from "../../public/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      console.log("Login successful: ", response.data);
      toast.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "Login failed!!!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col items-center justify-center px-4">
  {/* Header */}
  <header className="absolute top-0 left-0 w-full flex justify-between items-center p-5 container mx-auto">
    <div className="flex items-center space-x-2">
      <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
      <Link to="/" className="text-xl font-bold text-orange-500">
        CourseHaven
      </Link>
    </div>
    <div className="flex items-center space-x-4">
      <Link
        to="/signup"
        className="border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-200 transition"
      >
        Signup
      </Link>
      <Link
        to="/courses"
        className="bg-orange-500 px-4 py-2 rounded-md text-white text-sm hover:bg-orange-600 transition"
      >
        Join now
      </Link>
    </div>
  </header>

  {/* Login Form */}
  <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm mt-20">
    <h2 className="text-lg font-semibold text-center mb-4">
      Welcome to <span className="text-orange-500">CourseHaven</span>
    </h2>
    <p className="text-center text-gray-600 mb-6">Log in to access paid content!</p>

    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="********"
          required
        />
      </div>

      {errorMessage && (
        <div className="text-red-500 text-center text-sm mb-4">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
      >
        Login
      </button>
    </form>
  </div>
</div>

  );
}

export default Login;
