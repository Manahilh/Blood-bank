import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 animate-fadeIn">

      <div className="text-center max-w-lg">

        {/* Blood Drop */}
        <div className="relative inline-flex mb-6">

          <div className="w-28 h-28 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-6xl">
              🩸
            </span>
          </div>

        </div>


        {/* 404 */}
        <h1 className="text-7xl md:text-8xl font-extrabold text-red-600 tracking-tight">
          404
        </h1>


        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
          Oops! Page Not Found
        </h2>


        {/* Description */}
        <p className="text-gray-500 mt-3 leading-relaxed">
          The page you're looking for doesn't exist or may have
          been moved. Don't worry, you can safely go back to
          the Blood Bank dashboard.
        </p>


        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">

          <Link
            to="/"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            🏠 Go Home
          </Link>


          <Link
            to="/dashboard"
            className="border-2 border-gray-200 hover:border-red-500 hover:text-red-600 text-gray-700 font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1"
          >
            📊 Dashboard
          </Link>

        </div>


        {/* Bottom Message */}
        <div className="mt-10 bg-red-50 border border-red-100 rounded-2xl p-5">

          <p className="text-red-700 font-semibold">
            ❤️ Every drop counts. Every donor matters.
          </p>

          <p className="text-red-600 text-sm mt-1">
            Together, we can help save lives.
          </p>

        </div>

      </div>

    </div>
  );
}

export default NotFound;