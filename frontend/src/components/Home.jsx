import React, { useEffect, useState } from "react";
import logo from "../../public/logo.webp";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // token
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        console.log(response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  // logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white text-gray-800">
    <div className="h-auto text-gray-800 container mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt=""
            className="w-7 h-7 md:w-10 md:h-10 rounded-full"
          />
          <h1 className="md:text-2xl text-blue-600 font-bold">AcademyPro</h1>
        </div>
        <div className="space-x-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition-all px-4 py-2 text-sm md:text-lg rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to={"/login"}
                className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition-all px-4 py-2 text-sm md:text-lg rounded"
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition-all px-4 py-2 text-sm md:text-lg rounded"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </header>
  
      {/* Main section */}
      <section className="text-center py-20 bg-gray-50">
        <h1 className="text-4xl font-semibold text-blue-600">AcademyPro</h1>
        <p className="text-gray-600 mt-4">
          Sharpen your skills with courses crafted by experts.
        </p>
        <div className="space-x-4 mt-8">
          <Link
            to={"/courses"}
            className="bg-blue-600 text-white p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-blue-700 transition-all"
          >
            Explore courses
          </Link>
          <Link
            to={"https://www.youtube.com/learncodingofficial"}
            className="bg-white border border-gray-300 text-gray-800 p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-blue-100 transition-all"
          >
            Course Videos
          </Link>
        </div>
      </section>
  
      {/* Slider Section */}
      <section className="p-10 bg-white">
        <Slider {...settings}>
          {courses.map((course) => (
            <div key={course._id} className="p-4">
              <div className="relative w-92 transition-transform duration-300 transform hover:scale-105">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <img
                    className="h-32 w-full object-contain bg-gray-50"
                    src={course.image.url}
                    alt=""
                  />
                  <div className="p-6 text-center">
                    <h2 className="text-xl font-bold text-gray-800">
                      {course.title}
                    </h2>
                    <Link
                      to={`/buy/${course._id}`}
                      className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-all"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
  
      <hr className="my-12 border-gray-300" />
  
      {/* Footer */}
      <footer className="py-12 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="" className="w-10 h-10 rounded-full" />
              <h1 className="text-2xl text-blue-600 font-bold">AcademyPro</h1>
            </div>
            <div className="mt-3 ml-2 md:ml-8">
              <p className="mb-2">Follow us</p>
              <div className="flex space-x-4">
                <a href="">
                  <FaFacebook className="text-2xl hover:text-blue-500" />
                </a>
                <a href="">
                  <FaInstagram className="text-2xl hover:text-pink-500" />
                </a>
                <a href="">
                  <FaTwitter className="text-2xl hover:text-blue-400" />
                </a>
              </div>
            </div>
          </div>
  
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold md:mb-4 text-gray-800">
              Connects
            </h3>
            <ul className="space-y-2 text-gray-500">
              <li className="hover:text-gray-800 cursor-pointer">YouTube - AcademyPro</li>
              <li className="hover:text-gray-800 cursor-pointer">Telegram - AcademyPro</li>
              <li className="hover:text-gray-800 cursor-pointer">GitHub - AcademyPro</li>
            </ul>
          </div>
  
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              © 2025 AcademyPro
            </h3>
            <ul className="space-y-2 text-gray-500">
              <li className="hover:text-gray-800 cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-gray-800 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-gray-800 cursor-pointer">
                Refund & Cancellation
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  </div>
  
  );
}

export default Home;
