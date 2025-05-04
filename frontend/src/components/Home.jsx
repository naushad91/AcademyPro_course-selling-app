function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#28262a] via-[#32373e] to-[#2b315e] text-white font-sans">
      <div className="min-h-screen container mx-auto px-4 py-8">

        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <img src="academypro-high-resolution-logo-transparent.png" alt="Course Logo" className="w-10 h-10" />
            <h1 className="text-3xl font-display font-bold tracking-wide">AcademyPro</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-transparent text-white py-2 px-4 border border-white rounded-lg font-semibold hover:bg-white hover:text-[#2575fc] transition duration-300 shadow-sm">
              Login
            </button>

            <button className="bg-white text-black py-2 px-4 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition duration-300 shadow-md">
              Signup
            </button>
          </div>
        </header>

        {/* Main section */}
        <section className="text-center py-24 px-4">
          <h1 className="text-6xl font-display font-extrabold leading-tight mb-6 text-white drop-shadow-lg">
            AcademyPro
          </h1>
          <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed font-sans">
            Discover top-rated courses in development, design, marketing, and more. Start building your future today.
          </p>

          <div className="flex justify-center gap-6">
            <button className="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-green-600 duration-300 shadow-lg">
              Explore Courses
            </button>

            <button className="bg-white text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-green-500 hover:text-white duration-300 shadow-lg">
              Course Videos
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 text-center text-sm text-gray-300 font-sans">
          © 2025 AcademyPro. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Home;
