import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../services/firebase";
import { addDonorToAPI } from "../services/api";

function DonorForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone || !bloodGroup || !city) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    const donorData = {
      name,
      phone,
      bloodGroup,
      city,
      availability: true,
      uid: auth.currentUser?.uid || "",
    };

    try {
      // First try Firebase
      await addDoc(collection(db, "donors"), {
        ...donorData,
        createdAt: serverTimestamp(),
      });

      setSuccess(true);

      // Clear form
      setName("");
      setPhone("");
      setBloodGroup("");
      setCity("");

      setTimeout(() => {
        setSuccess(false);
      }, 5000);

    } catch (firebaseError) {
      console.error("Firebase failed:", firebaseError);

      // JSON Server fallback
      try {
        await addDonorToAPI(donorData);

        setSuccess(true);

        setName("");
        setPhone("");
        setBloodGroup("");
        setCity("");

        setTimeout(() => {
          setSuccess(false);
        }, 5000);

      } catch (apiError) {
        console.error("JSON Server failed:", apiError);
        alert("Could not register donor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">

      {/* Header */}
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
              Become a Donor
            </h1>
          </div>

        </div>

        <p className="text-gray-500 max-w-2xl">
          Register your details and help someone find the blood
          they need. Your donation can save a life.
        </p>

      </div>


      {/* Success Message */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-4">

          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl text-green-700">
            ✓
          </div>

          <div>
            <h3 className="font-bold text-green-800">
              Donor registered successfully!
            </h3>

            <p className="text-green-700 text-sm mt-1">
              Thank you for becoming a blood donor. ❤️
            </p>
          </div>

        </div>
      )}


      {/* Form Card */}
      <div className="bg-white border rounded-3xl shadow-lg p-6 md:p-8">

        <form onSubmit={handleSubmit}>

          {/* Name + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">

            {/* Name */}
            <div>

              <label className="block font-bold text-gray-800 mb-2">
                Full Name
                <span className="text-red-500"> *</span>
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                  👤
                </span>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none p-3.5 pl-12 w-full rounded-xl transition-all duration-200"
                  required
                />

              </div>

            </div>


            {/* Phone */}
            <div>

              <label className="block font-bold text-gray-800 mb-2">
                Phone Number
                <span className="text-red-500"> *</span>
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                  📞
                </span>

                <input
                  type="tel"
                  placeholder="03XX-XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none p-3.5 pl-12 w-full rounded-xl transition-all duration-200"
                  required
                />

              </div>

            </div>

          </div>


          {/* Blood Group */}
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


          {/* City */}
          <div className="mb-7">

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


          {/* Availability Information */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-7">

            <div className="flex gap-4">

              <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center text-xl">
                🟢
              </div>

              <div>

                <h3 className="font-bold text-green-800">
                  You will be registered as Available
                </h3>

                <p className="text-sm text-green-700 mt-1">
                  You can change your availability later from
                  the Donors page.
                </p>

              </div>

            </div>

          </div>


          {/* Important Box */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-7">

            <div className="flex gap-3">

              <div className="text-2xl">
                ❤️
              </div>

              <div>

                <h3 className="font-bold text-red-800">
                  Every donation matters
                </h3>

                <p className="text-sm text-red-700 mt-1">
                  Your information will help people find a
                  suitable blood donor when needed.
                </p>

              </div>

            </div>

          </div>


          {/* Submit */}
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

                Registering...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                🩸 Register as Donor
              </span>
            )}

          </button>

        </form>

      </div>


      {/* Footer */}
      <div className="text-center mt-8 text-gray-400 text-sm">
        <p>
          One donor can make a difference. Donate blood, save lives. ❤️
        </p>
      </div>

    </div>
  );
}

export default DonorForm;