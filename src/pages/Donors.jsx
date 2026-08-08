import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

function Donors() {
  const [donors, setDonors] = useState([]);
  const [searchBloodGroup, setSearchBloodGroup] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // =========================
  // FETCH DONORS FROM FIREBASE
  // =========================
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "donors")
        );

        const donorList = querySnapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setDonors(donorList);
      } catch (error) {
        console.error("Error fetching donors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  // =========================
  // TOGGLE AVAILABILITY
  // =========================
  const toggleAvailability = async (
    donorId,
    currentAvailability
  ) => {
    try {
      setUpdatingId(donorId);

      await updateDoc(doc(db, "donors", donorId), {
        availability: !currentAvailability,
      });

      // Update UI immediately
      setDonors((previousDonors) =>
        previousDonors.map((donor) =>
          donor.id === donorId
            ? {
                ...donor,
                availability: !currentAvailability,
              }
            : donor
        )
      );
    } catch (error) {
      console.error(
        "Availability update error:",
        error
      );

      alert("Could not update donor availability.");
    } finally {
      setUpdatingId(null);
    }
  };

  // =========================
  // FILTER DONORS
  // =========================
  const filteredDonors = donors
    .filter((donor) =>
      donor.bloodGroup
        ?.toLowerCase()
        .includes(searchBloodGroup.toLowerCase())
    )
    .filter((donor) =>
      donor.city
        ?.toLowerCase()
        .includes(searchCity.toLowerCase())
    );

  const availableCount = donors.filter(
    (donor) => donor.availability === true
  ).length;

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
            Loading donors...
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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-8">

        <div>

          <div className="flex items-center gap-3">

            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-3xl">
              🩸
            </div>

            <div>

              <p className="text-red-600 font-bold text-sm uppercase tracking-wider">
                Blood Bank
              </p>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Find Blood Donors
              </h1>

            </div>

          </div>

          <p className="text-gray-500 mt-3 max-w-2xl">
            Search registered donors by blood group and city.
            Check their availability and contact them when needed.
          </p>

        </div>


        {/* Donor Statistics */}
        <div className="bg-white border rounded-2xl px-6 py-4 shadow-sm">

          <div className="flex items-center gap-5">

            <div>
              <p className="text-gray-500 text-sm">
                Total Donors
              </p>

              <p className="text-3xl font-extrabold text-red-600">
                {donors.length}
              </p>
            </div>

            <div className="w-px h-12 bg-gray-200"></div>

            <div>
              <p className="text-gray-500 text-sm">
                Available
              </p>

              <p className="text-3xl font-extrabold text-green-600">
                {availableCount}
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* =========================
          SEARCH / FILTER CARD
      ========================= */}
      <div className="bg-white border rounded-3xl p-5 md:p-6 shadow-sm mb-8">

        <div className="flex items-center gap-2 mb-5">

          <span className="text-xl">
            🔎
          </span>

          <h2 className="font-bold text-xl">
            Search Donors
          </h2>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Blood Group */}
          <div>

            <label className="block text-sm font-bold text-gray-700 mb-2">
              Blood Group
            </label>

            <select
              value={searchBloodGroup}
              onChange={(e) =>
                setSearchBloodGroup(e.target.value)
              }
              className="border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none p-3.5 w-full rounded-xl transition-all duration-200 bg-white"
            >
              <option value="">
                All Blood Groups
              </option>

              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

          </div>


          {/* City */}
          <div>

            <label className="block text-sm font-bold text-gray-700 mb-2">
              City
            </label>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2">
                📍
              </span>

              <input
                type="text"
                placeholder="Search by city e.g. Karachi"
                value={searchCity}
                onChange={(e) =>
                  setSearchCity(e.target.value)
                }
                className="border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none p-3.5 pl-12 w-full rounded-xl transition-all duration-200"
              />

            </div>

          </div>

        </div>


        {/* Clear Filters */}
        {(searchBloodGroup || searchCity) && (
          <button
            onClick={() => {
              setSearchBloodGroup("");
              setSearchCity("");
            }}
            className="mt-4 text-red-600 font-semibold text-sm hover:text-red-700 transition-colors"
          >
            ✕ Clear Filters
          </button>
        )}

      </div>


      {/* =========================
          RESULTS HEADER
      ========================= */}
      <div className="flex justify-between items-center mb-5">

        <div>

          <h2 className="text-2xl font-bold text-gray-900">
            Donor Results
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {filteredDonors.length} donor
            {filteredDonors.length !== 1 ? "s" : ""} found
          </p>

        </div>

      </div>


      {/* =========================
          NO DONORS AT ALL
      ========================= */}
      {donors.length === 0 ? (

        <div className="bg-white border rounded-3xl p-12 text-center shadow-sm">

          <div className="text-6xl mb-5">
            🩸
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            No Donors Registered
          </h2>

          <p className="text-gray-500 mt-2">
            There are currently no registered donors.
          </p>

        </div>

      ) : filteredDonors.length === 0 ? (

        /* =========================
           NO SEARCH RESULTS
        ========================= */
        <div className="bg-white border rounded-3xl p-12 text-center shadow-sm">

          <div className="text-5xl mb-4">
            🔎
          </div>

          <h2 className="text-xl font-bold text-gray-800">
            No Matching Donors
          </h2>

          <p className="text-gray-500 mt-2">
            Try another blood group or city.
          </p>

          <button
            onClick={() => {
              setSearchBloodGroup("");
              setSearchCity("");
            }}
            className="mt-5 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Clear Search
          </button>

        </div>

      ) : (

        /* =========================
           DONOR CARDS
        ========================= */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {filteredDonors.map((donor) => (

            <div
              key={donor.id}
              className="group bg-white border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* Card Header */}
              <div className="flex justify-between items-start gap-4">

                <div className="flex items-center gap-4">

                  {/* Blood Group Circle */}
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center font-extrabold text-xl group-hover:scale-110 transition-transform duration-300">
                    {donor.bloodGroup || "?"}
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-gray-900">
                      {donor.name || "Unknown Donor"}
                    </h2>

                    <p className="text-gray-500 flex items-center gap-1 mt-1">
                      📍 {donor.city || "City not provided"}
                    </p>

                  </div>

                </div>


                {/* Availability Badge */}
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
                    donor.availability
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {donor.availability
                    ? "● Available"
                    : "● Unavailable"}
                </span>

              </div>


              {/* Divider */}
              <div className="border-t my-5"></div>


              {/* Donor Information */}
              <div className="grid grid-cols-2 gap-3">

                <div className="bg-gray-50 rounded-xl p-4">

                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Blood Group
                  </p>

                  <p className="text-lg font-bold text-red-600 mt-1">
                    {donor.bloodGroup || "N/A"}
                  </p>

                </div>


                <div className="bg-gray-50 rounded-xl p-4">

                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Location
                  </p>

                  <p className="text-lg font-bold text-gray-800 mt-1 truncate">
                    {donor.city || "N/A"}
                  </p>

                </div>

              </div>


              {/* Phone */}
              <div className="flex items-center gap-3 mt-4 bg-gray-50 rounded-xl p-4">

                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  📞
                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Contact Number
                  </p>

                  <p className="font-bold text-gray-800">
                    {donor.phone || "Not provided"}
                  </p>

                </div>

              </div>


              {/* Availability Button */}
              <button
                onClick={() =>
                  toggleAvailability(
                    donor.id,
                    donor.availability
                  )
                }
                disabled={updatingId === donor.id}
                className={`w-full mt-5 py-3 rounded-xl font-bold transition-all duration-300 ${
                  updatingId === donor.id
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : donor.availability
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-green-50 text-green-700 hover:bg-green-100"
                }`}
              >
                {updatingId === donor.id ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">
                      ⟳
                    </span>
                    Updating...
                  </span>
                ) : donor.availability ? (
                  "Make Unavailable"
                ) : (
                  "✓ Make Available"
                )}
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Donors;