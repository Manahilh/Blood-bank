import { useState } from "react";

function Donate() {
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    bloodGroup: "",
    city: "",
    phone: "",
    lastDonated: "",
    medicalNotes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Donor Form Submitted");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Donor Registration
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="cnic"
          placeholder="CNIC"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <select
          name="bloodGroup"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        >
          <option value="">Select Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>

        <input
          type="text"
          name="city"
          placeholder="City"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="date"
          name="lastDonated"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <textarea
          name="medicalNotes"
          placeholder="Medical Notes"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-red-600 text-white p-2 rounded w-full"
        >
          Register Donor
        </button>

      </form>
    </div>
  );
}

export default Donate;