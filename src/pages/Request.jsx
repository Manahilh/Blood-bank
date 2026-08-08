import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../services/firebase";

function Request() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [units, setUnits] = useState("");
  const [urgency, setUrgency] = useState("");
  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bloodGroup || !city || !units || !urgency) {
      alert("Please fill all required fields.");
      return;
    }

    if (Number(units) < 1) {
      alert("Required units must be at least 1.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      await addDoc(collection(db, "requests"), {
        bloodGroup,
        city,
        units: Number(units),
        urgency,
        reason,
        requesterEmail: auth.currentUser?.email || "",
        uid: auth.currentUser?.uid || "",
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      // Clear form
      setBloodGroup("");
      setCity("");
      setUnits("");
      setUrgency("");
      setReason("");

      setSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);

    } catch (error) {
      console.error("Request submission error:", error);
      alert("Something went wrong while submitting the request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">

      {/* =========================
          HEADER
      ========================= */}
      <div className="mb-8">

        <div className="flex items-center gap-3 mb-3">

          <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-3xl">
            🩸
          </div>

          <div>
            <p className="text-red-600 font-bold text-sm uppercase tracking-wider">
              Blood Bank
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Request Blood
            </h1>
          </div>

        </div>

        <p className="text-gray-500 max-w-2xl">
          Submit a blood request by providing the required blood
          group, location, quantity and urgency.
        </p>

      </div>


      {/* =========================
          SUCCESS MESSAGE
      ========================= */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-4">

          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">
            ✓
          </div>

          <div>
            <h3 className="font-bold text-green-800">
              Blood request submitted successfully!
            </h3>

            <p className="text-green-700 text-sm mt-1">
              Your request has been saved and is now pending.
            </p>
          </div>

        </div>
      )}


      {/* =========================
          FORM CARD
      ========================= */}
      <div className="bg-white border rounded-3xl shadow-lg p-6 md:p-8">

        <form onSubmit={handleSubmit}>

          {/* =========================
              BLOOD GROUP
          ========================= */}
          <div className="mb-7">

            <label className="block font-bold text-gray-800 mb-3">
              Blood Group
              <span className="text-red-500"> *</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

              {[
                "A+",
                "A-",
                "B+",
                "B-",
                "AB+",
                "AB-",
                "O+",
                "O-",
              ].map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => setBloodGroup(group)}
                  className={`py-3 rounded-xl border-2 font-bold transition-all duration-200 ${
                    bloodGroup === group
                      ? "bg-red-600 border-red-600 text-white scale-105 shadow-lg"
                      : "bg-white border-gray-200 text-gray-700 hover:border-red-400 hover:text-red-600"
                  }`}
                >
                  {group}
                </button>
              ))}

            </div>

          </div>


          {/* =========================
              CITY + UNITS
          ========================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">

            {/* City */}
            <div>

              <label className="block font-bold text-gray-800 mb-2">
                City
                <span className="text-red-500"> *</span>
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                  📍
                </span>

                <input
                  type="text"
                  placeholder="e.g. Karachi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none p-3.5 pl-12 w-full rounded-xl transition-all duration-200"
                  required
                />

              </div>

            </div>


            {/* Units */}
            <div>

              <label className="block font-bold text-gray-800 mb-2">
                Required Units
                <span className="text-red-500"> *</span>
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                  🧪
                </span>

                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 2"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  className="border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none p-3.5 pl-12 w-full rounded-xl transition-all duration-200"
                  required
                />

              </div>

            </div>

          </div>


          {/* =========================
              URGENCY
          ========================= */}
          <div className="mb-7">

            <label className="block font-bold text-gray-800 mb-3">
              Urgency
              <span className="text-red-500"> *</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              {/* Normal */}
              <button
                type="button"
                onClick={() => setUrgency("Normal")}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  urgency === "Normal"
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >

                <div className="flex items-center gap-3">

                  <span className="text-2xl">
                    🟢
                  </span>

                  <div>
                    <p className="font-bold text-gray-800">
                      Normal
                    </p>

                    <p className="text-xs text-gray-500">
                      Regular request
                    </p>
                  </div>

                </div>

              </button>


              {/* Urgent */}
              <button
                type="button"
                onClick={() => setUrgency("Urgent")}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  urgency === "Urgent"
                    ? "border-orange-500 bg-orange-50 shadow-md"
                    : "border-gray-200 hover:border-orange-300"
                }`}
              >

                <div className="flex items-center gap-3">

                  <span className="text-2xl">
                    🟠
                  </span>

                  <div>
                    <p className="font-bold text-gray-800">
                      Urgent
                    </p>

                    <p className="text-xs text-gray-500">
                      Needed soon
                    </p>
                  </div>

                </div>

              </button>


              {/* Critical */}
              <button
                type="button"
                onClick={() => setUrgency("Critical")}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  urgency === "Critical"
                    ? "border-red-500 bg-red-50 shadow-md"
                    : "border-gray-200 hover:border-red-300"
                }`}
              >

                <div className="flex items-center gap-3">

                  <span className="text-2xl">
                    🔴
                  </span>

                  <div>
                    <p className="font-bold text-gray-800">
                      Critical
                    </p>

                    <p className="text-xs text-gray-500">
                      Immediate need
                    </p>
                  </div>

                </div>

              </button>

            </div>

          </div>


          {/* =========================
              REASON
          ========================= */}
          <div className="mb-7">

            <label className="block font-bold text-gray-800 mb-2">
              Reason
              <span className="text-gray-400 font-normal">
                {" "}
                (Optional)
              </span>
            </label>

            <textarea
              placeholder="Briefly explain why blood is required..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="5"
              className="border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none p-4 w-full rounded-xl resize-none transition-all duration-200"
            />

          </div>


          {/* =========================
              INFORMATION BOX
          ========================= */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-7">

            <div className="flex gap-3">

              <div className="text-2xl">
                ❤️
              </div>

              <div>

                <h3 className="font-bold text-red-800">
                  Important
                </h3>

                <p className="text-sm text-red-700 mt-1">
                  Please make sure the blood group, city and
                  required units are correct before submitting
                  your request.
                </p>

              </div>

            </div>

          </div>


          {/* =========================
              SUBMIT BUTTON
          ========================= */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
            }`}
          >

            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="animate-spin">
                  ⟳
                </span>
                Submitting Request...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                🩸 Submit Blood Request
              </span>
            )}

          </button>

        </form>

      </div>


      {/* =========================
          FOOTER MESSAGE
      ========================= */}
      <div className="text-center mt-8 text-gray-400 text-sm">
        <p>
          Every request helps connect people with life-saving
          blood donations. ❤️
        </p>
      </div>

    </div>
  );
}

export default Request;