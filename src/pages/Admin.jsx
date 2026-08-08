import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

function Admin() {
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH FIREBASE DATA
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const donorSnapshot = await getDocs(
          collection(db, "donors")
        );

        const donorList = donorSnapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setDonors(donorList);

        const requestSnapshot = await getDocs(
          collection(db, "requests")
        );

        const requestList = requestSnapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setRequests(requestList);
      } catch (error) {
        console.error("Error loading admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // =========================
  // STATISTICS
  // =========================
  const availableDonors = donors.filter(
    (donor) => donor.availability === true
  );

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending"
  );

  const fulfilledRequests = requests.filter(
    (request) => request.status === "Fulfilled"
  );

  const criticalRequests = requests.filter(
    (request) => request.urgency === "Critical"
  );

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-pulse mb-4">
            🩸
          </div>

          <p className="text-gray-500 font-medium">
            Loading Admin Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">

      {/* =========================
          HEADER
      ========================= */}
      <div className="mb-8">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-3xl">
            👑
          </div>

          <div>

            <p className="text-red-600 font-bold text-sm uppercase tracking-wider">
              Administration
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Admin Dashboard
            </h1>

          </div>

        </div>

        <p className="text-gray-500 mt-3">
          Monitor donors, blood availability and blood requests
          from one place.
        </p>

      </div>


      {/* =========================
          STATISTICS
      ========================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">

        {/* Total Donors */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500 font-medium">
                Total Donors
              </p>

              <h2 className="text-4xl font-extrabold text-gray-900 mt-2">
                {donors.length}
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                Registered donors
              </p>
            </div>

            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-2xl">
              👥
            </div>

          </div>

        </div>


        {/* Available Donors */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500 font-medium">
                Available Donors
              </p>

              <h2 className="text-4xl font-extrabold text-green-600 mt-2">
                {availableDonors.length}
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                Currently available
              </p>
            </div>

            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
              🟢
            </div>

          </div>

        </div>


        {/* Total Requests */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500 font-medium">
                Total Requests
              </p>

              <h2 className="text-4xl font-extrabold text-blue-600 mt-2">
                {requests.length}
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                Blood requests
              </p>
            </div>

            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">
              🩸
            </div>

          </div>

        </div>


        {/* Pending */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500 font-medium">
                Pending Requests
              </p>

              <h2 className="text-4xl font-extrabold text-orange-500 mt-2">
                {pendingRequests.length}
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                Need attention
              </p>
            </div>

            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl">
              ⏳
            </div>

          </div>

        </div>


        {/* Fulfilled */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500 font-medium">
                Fulfilled Requests
              </p>

              <h2 className="text-4xl font-extrabold text-green-600 mt-2">
                {fulfilledRequests.length}
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                Successfully completed
              </p>
            </div>

            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
              ✅
            </div>

          </div>

        </div>


        {/* Critical */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500 font-medium">
                Critical Requests
              </p>

              <h2 className="text-4xl font-extrabold text-red-600 mt-2">
                {criticalRequests.length}
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                Immediate attention
              </p>
            </div>

            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-2xl animate-pulse">
              🚨
            </div>

          </div>

        </div>

      </div>


      {/* =========================
          CRITICAL ALERT
      ========================= */}
      {criticalRequests.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl animate-pulse">
              🚨
            </div>

            <div>
              <h3 className="font-bold text-red-800">
                Critical Requests Need Attention
              </h3>

              <p className="text-red-700 text-sm mt-1">
                There are {criticalRequests.length} critical
                blood request
                {criticalRequests.length !== 1 ? "s" : ""}.
              </p>
            </div>

          </div>

        </div>
      )}


      {/* =========================
          DONORS SECTION
      ========================= */}
      <div className="bg-white border rounded-3xl shadow-sm p-6 mb-8">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Recent Donors
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Registered blood donors
            </p>
          </div>

          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-bold">
            {donors.length}
          </div>

        </div>


        {donors.length === 0 ? (

          <div className="text-center py-10">

            <div className="text-5xl mb-3">
              👥
            </div>

            <p className="text-gray-500">
              No donors registered yet.
            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {donors.slice(0, 5).map((donor) => (

              <div
                key={donor.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50 hover:bg-red-50 rounded-2xl p-4 transition-all duration-200"
              >

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center font-bold">
                    {donor.bloodGroup || "?"}
                  </div>

                  <div>

                    <p className="font-bold text-gray-900">
                      {donor.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      📍 {donor.city}
                    </p>

                  </div>

                </div>


                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold self-start sm:self-auto ${
                    donor.availability
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {donor.availability
                    ? "● Available"
                    : "● Unavailable"}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* =========================
          REQUESTS SECTION
      ========================= */}
      <div className="bg-white border rounded-3xl shadow-sm p-6">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Recent Blood Requests
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Latest requests submitted by users
            </p>
          </div>

          <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-bold">
            {requests.length}
          </div>

        </div>


        {requests.length === 0 ? (

          <div className="text-center py-10">

            <div className="text-5xl mb-3">
              📋
            </div>

            <p className="text-gray-500">
              No blood requests yet.
            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {requests.slice(0, 5).map((request) => (

              <div
                key={request.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gray-50 hover:bg-blue-50 rounded-2xl p-4 transition-all duration-200"
              >

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center font-bold">
                    {request.bloodGroup || "?"}
                  </div>

                  <div>

                    <p className="font-bold text-gray-900">
                      {request.bloodGroup} Blood
                    </p>

                    <p className="text-sm text-gray-500">
                      📍 {request.city} • {request.units} unit
                      {request.units !== 1 ? "s" : ""}
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-3">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      request.urgency === "Critical"
                        ? "bg-red-100 text-red-700"
                        : request.urgency === "Urgent"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {request.urgency}
                  </span>


                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      request.status === "Pending"
                        ? "bg-orange-100 text-orange-700"
                        : request.status === "Fulfilled"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {request.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Admin;