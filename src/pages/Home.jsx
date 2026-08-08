import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">

      {/* Hero Section */}
      <section className="min-h-screen flex items-center">

        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="animate-pulse">

            <div className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold mb-5">
              🩸 Every Drop Counts
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Donate Blood.
              <span className="text-red-600">
                {" "}Save Lives.
              </span>
            </h1>

            <p className="text-gray-600 text-lg mt-6 leading-relaxed max-w-xl">
              Connecting blood donors with people who need blood.
              Find donors, register as a donor and send urgent blood
              requests — all in one place.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">

              <button
                onClick={() => navigate("/donor-form")}
                className="bg-red-600 text-white px-7 py-3.5 rounded-xl font-bold shadow-lg hover:bg-red-700 hover:scale-105 transition-all duration-300"
              >
                🩸 Become a Donor
              </button>

              <button
                onClick={() => navigate("/request")}
                className="border-2 border-red-600 text-red-600 px-7 py-3.5 rounded-xl font-bold hover:bg-red-600 hover:text-white hover:scale-105 transition-all duration-300"
              >
                🚨 Need Blood?
              </button>

            </div>

          </div>

          {/* Right Blood Animation */}
          <div className="flex justify-center">

            <div className="relative">

              {/* Glow */}
              <div className="absolute inset-0 bg-red-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>

              {/* Blood Drop */}
              <div className="relative text-[220px] md:text-[280px] drop-shadow-2xl animate-bounce">
                🩸
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="py-20 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-red-600 font-bold">
              OUR FEATURES
            </p>

            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">
              Everything You Need
            </h2>

            <p className="text-gray-500 mt-3">
              A simple platform designed to make blood donation easier.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className="group p-7 rounded-2xl border bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform">
                🔎
              </div>

              <h3 className="text-xl font-bold mb-3">
                Find Donors
              </h3>

              <p className="text-gray-500">
                Search donors by blood group and city to quickly
                find the blood you need.
              </p>

            </div>

            {/* Card 2 */}
            <div className="group p-7 rounded-2xl border bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform">
                ❤️
              </div>

              <h3 className="text-xl font-bold mb-3">
                Become a Donor
              </h3>

              <p className="text-gray-500">
                Register yourself as a blood donor and help someone
                in an emergency.
              </p>

            </div>

            {/* Card 3 */}
            <div className="group p-7 rounded-2xl border bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform">
                🚨
              </div>

              <h3 className="text-xl font-bold mb-3">
                Emergency Requests
              </h3>

              <p className="text-gray-500">
                Submit urgent blood requests and connect with
                available donors.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Call To Action */}
      <section className="py-20 bg-red-600 text-white">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <div className="text-6xl mb-6 animate-pulse">
            ❤️
          </div>

          <h2 className="text-4xl font-extrabold">
            Your Blood Can Save a Life
          </h2>

          <p className="mt-4 text-red-100 text-lg">
            Become a donor today and make a difference.
          </p>

          <button
            onClick={() => navigate("/donor-form")}
            className="mt-8 bg-white text-red-600 px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition-all duration-300"
          >
            Register as Donor
          </button>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center">

        <p>
          🩸 Blood Bank Management System
        </p>

        <p className="text-sm mt-1">
          Saving lives, one donation at a time.
        </p>

      </footer>

    </div>
  );
}

export default Home;