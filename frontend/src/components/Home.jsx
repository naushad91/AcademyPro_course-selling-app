import { useState } from 'react';
import { FaBars, FaTimes, FaSearch, FaShoppingCart } from 'react-icons/fa';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="min-h-screen bg-[#191919] text-white font-[Poppins]">
      <div className="container mx-auto px-4 py-4">

        {/* Navbar */}
        <nav className="flex justify-between items-center py-3 px-3 md:px-5 shadow-lg bg-[#1f1f1f] rounded-xl text-sm md:text-base">
          {/* Left Section */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Hamburger (Mobile Only) */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-xl">
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Logo */}
            <div className="text-2xl md:text-3xl font-bold text-[#FFAA5A]">elevate.</div>

            {/* Search (Desktop inline) */}
            <div className="hidden md:flex items-center space-x-2">
              <button onClick={() => setShowSearch(!showSearch)} className="text-lg hover:text-[#FFAA5A]">
                {showSearch ? <FaTimes /> : <FaSearch />}
              </button>
              {showSearch && (
                <input
                  type="text"
                  placeholder="Find your next elevated learning..."
                  className="py-1 px-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFAA5A] transition w-64"
                />
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Mobile Icons */}
            <div className="flex md:hidden items-center space-x-3">
              <button onClick={() => setShowSearch(!showSearch)} className="text-xl hover:text-[#FFAA5A]">
                {showSearch ? <FaTimes /> : <FaSearch />}
              </button>
              <FaShoppingCart className="text-xl cursor-pointer hover:text-[#FFAA5A]" />
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-3">
              <li>
                <button className="py-1.5 px-3 border border-white rounded-md font-semibold text-white hover:bg-[#FF785A] transition duration-300">
                  Login
                </button>
              </li>
              <li>
                <button className="py-1.5 px-3 border border-white rounded-md font-semibold text-white hover:bg-[#FF785A] transition duration-300">
                  Signup
                </button>
              </li>
              <li>
                <button className="py-1.5 px-3 border border-white rounded-md font-semibold text-white hover:bg-[#FF785A] transition duration-300">
                  Plans & Pricing
                </button>
              </li>
              <li>
                <FaShoppingCart className="text-xl cursor-pointer hover:text-[#FFAA5A]" />
              </li>
            </ul>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-20 left-0 w-full bg-[#1f1f1f] border-t border-gray-700 z-10 md:hidden">
              <ul className="flex flex-col px-6 py-4 space-y-4">
                <li>
                  <button className="py-2 px-4 border border-white rounded-lg font-semibold text-white hover:bg-[#FF785A] transition duration-300 w-full text-left">
                    Login
                  </button>
                </li>
                <li>
                  <button className="py-2 px-4 border border-white rounded-lg font-semibold text-white hover:bg-[#FF785A] transition duration-300 w-full text-left">
                    Signup
                  </button>
                </li>
                <li>
                  <button className="py-2 px-4 border border-white rounded-lg font-semibold text-white hover:bg-[#FF785A] transition duration-300 w-full text-left">
                    Plans & Pricing
                  </button>
                </li>
              </ul>
            </div>
          )}
        </nav>

        {/* Search Input (Mobile only) */}
        {showSearch && (
          <div className="mt-4 md:hidden flex justify-center">
            <input
              type="text"
              placeholder="Find your next elevated learning..."
              className="w-full md:w-1/2 py-2 px-4 rounded-lg bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFAA5A] transition"
            />
          </div>
        )}

        {/* Hero Section */}
        <section className="text-center py-20 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Learn. Grow. Succeed.
          </h1>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover top-rated courses in development, design, marketing, and more. Start building your future today with Elevate.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#FFAA5A] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#FF785A] transition-all duration-300 transform">
              Explore Courses
            </button>
            <button className="bg-[#FFAA5A] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#FF785A] transition-all duration-300 transform">
              Course Videos
            </button>
          </div>
        </section>

{/* Features Section */}
<section className="px-4 md:px-8 py-16 bg-[#191919]">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
    How Elevate Transforms Your Learning
  </h2>
  <div className="flex overflow-x-auto space-x-6 md:space-x-8 scrollbar-hide md:grid md:grid-cols-4 md:gap-6">
    {/* Card 1 */}
    <div className="min-w-[280px] md:min-w-0 bg-[#1f1f1f] rounded-2xl p-6 shadow-lg hover:shadow-2xl border-2 border-[#333] hover:border-[#FFAA5A] transition duration-300">
      <div className="flex items-center justify-center mb-4">
        <i className="fas fa-laptop-code text-3xl text-[#FFAA5A]"></i>
      </div>
      <h3 className="text-xl font-semibold text-[#FFAA5A] mb-3">Real-World Projects</h3>
      <p className="text-white/80">Learn by doing with hands-on tasks that mirror actual industry scenarios.</p>
    </div>

    {/* Card 2 */}
    <div className="min-w-[280px] md:min-w-0 bg-[#1f1f1f] rounded-2xl p-6 shadow-lg hover:shadow-2xl border-2 border-[#333] hover:border-[#FFAA5A] transition duration-300">
      <div className="flex items-center justify-center mb-4">
        <i className="fas fa-chalkboard-teacher text-3xl text-[#FFAA5A]"></i>
      </div>
      <h3 className="text-xl font-semibold text-[#FFAA5A] mb-3">Expert-Led Courses</h3>
      <p className="text-white/80">Gain insights from instructors who have cracked the code in their fields.</p>
    </div>

    {/* Card 3 */}
    <div className="min-w-[280px] md:min-w-0 bg-[#1f1f1f] rounded-2xl p-6 shadow-lg hover:shadow-2xl border-2 border-[#333] hover:border-[#FFAA5A] transition duration-300">
      <div className="flex items-center justify-center mb-4">
        <i className="fas fa-sitemap text-3xl text-[#FFAA5A]"></i>
      </div>
      <h3 className="text-xl font-semibold text-[#FFAA5A] mb-3">Structured Paths</h3>
      <p className="text-white/80">Clear, guided learning journeys to keep your growth on track and focused.</p>
    </div>

    {/* Card 4 */}
    <div className="min-w-[280px] md:min-w-0 bg-[#1f1f1f] rounded-2xl p-6 shadow-lg hover:shadow-2xl border-2 border-[#333] hover:border-[#FFAA5A] transition duration-300">
      <div className="flex items-center justify-center mb-4">
        <i className="fas fa-users text-3xl text-[#FFAA5A]"></i>
      </div>
      <h3 className="text-xl font-semibold text-[#FFAA5A] mb-3">Active Community</h3>
      <p className="text-white/80">Join a vibrant group of learners, mentors, and peers all striving to elevate.</p>
    </div>
  </div>
</section>

{/* Testimonial Section */}
<section className="px-4 md:px-8 py-16 bg-[#191919]">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
    What Our Learners Say
  </h2>
  <div className="flex overflow-x-auto space-x-6 md:space-x-8 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Testimonial 1 */}
    <div className="min-w-[280px] bg-[#1f1f1f] rounded-2xl p-6 shadow-lg hover:shadow-2xl border-2 border-[#333] hover:border-[#FFAA5A] transition duration-300">
      <div className="flex justify-center mb-4">
        <img className="w-16 h-16 rounded-full" src="https://via.placeholder.com/150" alt="Person 1" />
      </div>
      <p className="text-white/80 mb-3">"The hands-on projects helped me apply everything I learned in real scenarios. It was challenging but rewarding!"</p>
      <h4 className="text-[#FFAA5A] font-semibold">John Doe</h4>
      <p className="text-sm text-white/60">Software Engineer</p>
    </div>

    {/* Testimonial 2 */}
    <div className="min-w-[280px] bg-[#1f1f1f] rounded-2xl p-6 shadow-lg hover:shadow-2xl border-2 border-[#333] hover:border-[#FFAA5A] transition duration-300">
      <div className="flex justify-center mb-4">
        <img className="w-16 h-16 rounded-full" src="https://via.placeholder.com/150" alt="Person 2" />
      </div>
      <p className="text-white/80 mb-3">"The instructors are truly experts in their field. The structured paths made learning feel seamless and achievable."</p>
      <h4 className="text-[#FFAA5A] font-semibold">Jane Smith</h4>
      <p className="text-sm text-white/60">UX Designer</p>
    </div>

    {/* Testimonial 3 */}
    <div className="min-w-[280px] bg-[#1f1f1f] rounded-2xl p-6 shadow-lg hover:shadow-2xl border-2 border-[#333] hover:border-[#FFAA5A] transition duration-300">
      <div className="flex justify-center mb-4">
        <img className="w-16 h-16 rounded-full" src="https://via.placeholder.com/150" alt="Person 3" />
      </div>
      <p className="text-white/80 mb-3">"Joining this community was the best decision I made. The support from fellow learners is priceless!"</p>
      <h4 className="text-[#FFAA5A] font-semibold">Michael Brown</h4>
      <p className="text-sm text-white/60">Data Analyst</p>
    </div>

    {/* Testimonial 4 */}
    <div className="min-w-[280px] bg-[#1f1f1f] rounded-2xl p-6 shadow-lg hover:shadow-2xl border-2 border-[#333] hover:border-[#FFAA5A] transition duration-300">
      <div className="flex justify-center mb-4">
        <img className="w-16 h-16 rounded-full" src="https://via.placeholder.com/150" alt="Person 4" />
      </div>
      <p className="text-white/80 mb-3">"The courses are very engaging and the feedback from instructors helped me improve quickly. I feel confident now!"</p>
      <h4 className="text-[#FFAA5A] font-semibold">Emily Davis</h4>
      <p className="text-sm text-white/60">Marketing Manager</p>
    </div>
  </div>
</section>


        {/* Footer */}
        <footer className="my-12 px-4">
          <div className="flex flex-col md:flex-row justify-between gap-10 text-center md:text-left">
            {/* Logo & Social */}
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-2xl text-[#FFAA5A] font-bold mb-2">elevate.</h1>
              <p className="mb-2">Follow us</p>
              <div className="flex space-x-4">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
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
