import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function Home() {
  return (
    <div className="min-h-screen bg-[#191919] text-white font-[Poppins]">
      <div className="min-h-screen container mx-auto px-4 py-8">

        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center space-x-4 justify-start">
            <h1 className="text-3xl font-bold tracking-wide text-white">elevate.</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="py-2 px-6 border border-white rounded-lg font-semibold text-white hover:bg-[#FF785A] transition duration-300 w-full sm:w-auto">
              Login
            </button>
            <button className="py-2 px-6 bg-[#FFAA5A] rounded-lg font-semibold text-white hover:bg-[#FF785A] transition duration-300 w-full sm:w-auto">
              Signup
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center py-16 md:py-24 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Learn. Grow. Succeed.
          </h1>
          <p className="text-base sm:text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover top-rated courses in development, design, marketing, and more. Start building your future today with Elevate.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button className="bg-[#FFAA5A] text-white py-3 px-6 rounded-lg font-semibold 
              hover:bg-[#FF785A] hover:shadow-md hover:scale-105 
              transition-all duration-300 transform shadow-lg w-full sm:w-auto">
              Explore Courses
            </button>

            <button className="bg-[#FFAA5A] text-white py-3 px-6 rounded-lg font-semibold 
              hover:bg-[#FF785A] hover:shadow-md hover:scale-105 
              transition-all duration-300 transform shadow-lg w-full sm:w-auto">
              Course Videos
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="my-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
            
            {/* Logo & Social */}
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-2xl text-[#FFAA5A] font-bold mb-2">elevate.</h1>
              <p className="mb-2">Follow us</p>
              <div className="flex space-x-4">
                <a href="#"><FaFacebook className="text-2xl hover:text-blue-400 duration-300" /></a>
                <a href="#"><FaInstagram className="text-2xl hover:text-pink-600 duration-300" /></a>
                <a href="#"><FaTwitter className="text-2xl hover:text-blue-600 duration-300" /></a>
              </div>
            </div>

            {/* Connect Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-3">Connects</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition">YouTube - Elevate</li>
                <li className="hover:text-white cursor-pointer transition">Telegram - Elevate</li>
                <li className="hover:text-white cursor-pointer transition">GitHub - Elevate</li>
              </ul>
            </div>

            {/* Policies */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-3">© 2024 Elevate</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition">Terms & Conditions</li>
                <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer transition">Refund & Cancellation</li>
              </ul>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default Home;
