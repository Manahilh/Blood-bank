import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, logout, db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

function Dashboard() {
  // =========================
  // Dashboard Statistics
  // =========================
  const [totalDonors, setTotalDonors] = useState(0);
  const [availableDonors, setAvailableDonors] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);

  const [loading, setLoading] = useState(true);

  // =========================
  // Get Data From Firebase
  // =========================
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get Donors
        const donorSnapshot = await getDocs(
          collection(db, "donors")
        );

        const donors = donorSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Total Donors
        setTotalDonors(donors.length);

        // Available Donors
        const available = donors.filter(
          (donor) => donor.availability === true
        );

        setAvailableDonors(available.length);

        // Get Requests
        const requestSnapshot = await getDocs(
          collection(db, "requests")
        );

        const requests = requestSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Total Requests
        setTotalRequests(requests.length);

        // Pending Requests
        const pending = requests.filter(
          (request) => request.status === "Pending"
        );

        setPendingRequests(pending.length);

      } catch (error) {
        console.error(
          "Dashboard Firebase Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // =========================
  // Logout
  // =========================
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen">

      {/* =========================
          HEADER
      ========================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-8">

        <div>

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-2xl">
              🩸
            </div>

            <div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Blood Bank Dashboard
              </h1>

              <p className="text-gray-500 mt-1">
                Manage donors, requests and blood donations
              </p>

            </div>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-red-700 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          🚪 Logout
        </button>

      </div>


      {/* =========================
          WELCOME BANNER
      ========================= */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white rounded-3xl p-7 md:p-10 mb-8 shadow-xl">

        {/* Decorative circles */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>

        <div className="absolute right-20 -bottom-20 w-52 h-52 bg-white/10 rounded-full"></div>

        <div className="relative z-10">

          <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm mb-5">
            ❤️ Every Donation Matters
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Welcome to Blood Bank
          </h2>

          <p className="text-red-100 max-w-2xl text-lg">
            Together, we can connect blood donors with people
            who need them. Your contribution can help save a life.
          </p>

          <p className="mt-4 text-sm text-red-100">
            Logged in as:{" "}
            <span className="font-bold text-white">
              {auth.currentUser?.email}
            </span>
          </p>

        </div>

      </div>


      {/* =========================
          FIREBASE STATISTICS
      ========================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

        {/* TOTAL DONORS */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm font-medium">
                Total Donors
              </p>

              <h3 className="text-4xl font-extrabold text-red-600 mt-2">
                {loading ? "..." : totalDonors}
              </h3>

            </div>

            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-xl">
              🩸
            </div>

          </div>

          <p className="text-gray-400 text-sm mt-3">
            Registered donors
          </p>

        </div>


        {/* AVAILABLE DONORS */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm font-medium">
                Available Donors
              </p>

              <h3 className="text-4xl font-extrabold text-green-600 mt-2">
                {loading ? "..." : availableDonors}
              </h3>

            </div>

            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-xl">
              ✅
            </div>

          </div>

          <p className="text-gray-400 text-sm mt-3">
            Currently available
          </p>

        </div>


        {/* TOTAL REQUESTS */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm font-medium">
                Total Requests
              </p>

              <h3 className="text-4xl font-extrabold text-orange-600 mt-2">
                {loading ? "..." : totalRequests}
              </h3>

            </div>

            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-xl">
              🚨
            </div>

          </div>

          <p className="text-gray-400 text-sm mt-3">
            Blood requests
          </p>

        </div>


        {/* PENDING REQUESTS */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm font-medium">
                Pending Requests
              </p>

              <h3 className="text-4xl font-extrabold text-blue-600 mt-2">
                {loading ? "..." : pendingRequests}
              </h3>

            </div>

            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl">
              ⏳
            </div>

          </div>

          <p className="text-gray-400 text-sm mt-3">
            Waiting for fulfillment
          </p>

        </div>

      </div>


      {/* =========================
          QUICK ACTIONS
      ========================= */}
      <div className="mb-6">

        <p className="text-red-600 font-bold text-sm uppercase tracking-wider">
          Quick Actions
        </p>

        <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
          What would you like to do?
        </h2>

        <p className="text-gray-500 mt-2">
          Choose an option below to continue.
        </p>

      </div>


      {/* =========================
          ACTION CARDS
      ========================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


        {/* REGISTER DONOR */}
        <div className="group bg-white border rounded-2xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

          <div className="flex items-start justify-between">

            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
              🩸
            </div>

            <span className="text-gray-300 group-hover:text-red-500 transition-colors">
              →
            </span>

          </div>

          <h2 className="text-2xl font-bold mt-5">
            Register as Donor
          </h2>

          <p className="text-gray-500 mt-2 mb-6">
            Register your blood group and city so people can
            find you when blood is needed.
          </p>

          <Link
            to="/donor-form"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-red-700 hover:scale-105 transition-all duration-300"
          >
            Register Donor
            <span>→</span>
          </Link>

        </div>


        {/* FIND DONORS */}
        <div className="group bg-white border rounded-2xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

          <div className="flex items-start justify-between">

            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
              🔎
            </div>

            <span className="text-gray-300 group-hover:text-blue-500 transition-colors">
              →
            </span>

          </div>

          <h2 className="text-2xl font-bold mt-5">
            Find Blood Donors
          </h2>

          <p className="text-gray-500 mt-2 mb-6">
            Search available donors by blood group and city
            and find the right match.
          </p>

          <Link
            to="/donors"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-300"
          >
            Find Donors
            <span>→</span>
          </Link>

        </div>


        {/* REQUEST BLOOD */}
        <div className="group bg-white border rounded-2xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

          <div className="flex items-start justify-between">

            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
              🚨
            </div>

            <span className="text-gray-300 group-hover:text-orange-500 transition-colors">
              →
            </span>

          </div>

          <h2 className="text-2xl font-bold mt-5">
            Request Blood
          </h2>

          <p className="text-gray-500 mt-2 mb-6">
            Create a blood request for a patient and specify
            the required blood group and urgency.
          </p>

          <Link
            to="/request"
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-orange-700 hover:scale-105 transition-all duration-300"
          >
            Request Blood
            <span>→</span>
          </Link>

        </div>


        {/* VIEW REQUESTS */}
        <div className="group bg-white border rounded-2xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

          <div className="flex items-start justify-between">

            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
              📋
            </div>

            <span className="text-gray-300 group-hover:text-green-500 transition-colors">
              →
            </span>

          </div>

          <h2 className="text-2xl font-bold mt-5">
            Blood Requests
          </h2>

          <p className="text-gray-500 mt-2 mb-6">
            View current blood requests, urgency levels and
            their latest status.
          </p>

          <Link
            to="/requests"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 hover:scale-105 transition-all duration-300"
          >
            View Requests
            <span>→</span>
          </Link>

        </div>

      </div>


      {/* =========================
          BOTTOM MESSAGE
      ========================= */}
      <div className="mt-10 bg-gray-900 text-white rounded-3xl p-8 text-center shadow-xl">

        <div className="text-4xl mb-3 animate-pulse">
          ❤️
        </div>

        <h2 className="text-2xl font-bold">
          One Donation Can Save Up To Three Lives
        </h2>

        <p className="text-gray-400 mt-2">
          Be someone's reason to smile today.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;