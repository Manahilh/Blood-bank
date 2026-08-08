import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { loginUser, registerUser } from "../services/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        await registerUser(email, password);

        alert("Account created successfully! You can now login.");

        setIsSignup(false);
        setPassword("");
      } else {
        const userCredential = await loginUser(email, password);

        dispatch(setUser(userCredential.user));

        alert("Login Successful!");

        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);

      if (error.code === "auth/invalid-credential") {
        alert("Invalid email or password.");
      } else if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered.");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters.");
      } else if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email.");
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* =========================
            LEFT SIDE
        ========================= */}
        <div className="hidden md:flex bg-red-600 text-white p-10 flex-col justify-center relative overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-500 rounded-full opacity-50" />

          <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-red-700 rounded-full opacity-40" />

          <div className="relative z-10">

            <div className="text-7xl mb-6">
              🩸
            </div>

            <h1 className="text-4xl font-extrabold mb-4">
              Blood Bank
            </h1>

            <p className="text-red-100 text-lg leading-relaxed">
              Connecting blood donors with people who need
              them. One donation can help save a life.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">
                <span className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  ✓
                </span>
                <span>Find blood donors easily</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  ✓
                </span>
                <span>Create urgent blood requests</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  ✓
                </span>
                <span>Help save lives</span>
              </div>

            </div>

          </div>

        </div>


        {/* =========================
            RIGHT SIDE
        ========================= */}
        <div className="p-7 md:p-10 flex items-center">

          <div className="w-full">

            {/* Mobile Logo */}
            <div className="md:hidden text-center mb-7">

              <div className="text-5xl mb-2">
                🩸
              </div>

              <h1 className="text-2xl font-extrabold text-red-600">
                Blood Bank
              </h1>

            </div>


            {/* Heading */}
            <div className="mb-7">

              <p className="text-red-600 font-bold text-sm uppercase tracking-wider">
                {isSignup ? "Join Us" : "Welcome Back"}
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-1">
                {isSignup ? "Create Account" : "Sign In"}
              </h2>

              <p className="text-gray-500 mt-2">
                {isSignup
                  ? "Create your account and become part of our donor community."
                  : "Sign in to access your Blood Bank dashboard."}
              </p>

            </div>


            {/* Form */}
            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-5">

                <label className="block font-bold text-gray-700 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    ✉️
                  </span>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl p-3.5 pl-12 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                    required
                  />

                </div>

              </div>


              {/* Password */}
              <div className="mb-6">

                <label className="block font-bold text-gray-700 mb-2">
                  Password
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    🔒
                  </span>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl p-3.5 pl-12 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                    required
                  />

                </div>

              </div>


              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 hover:-translate-y-1 hover:shadow-xl"
                }`}
              >

                {loading
                  ? "Please wait..."
                  : isSignup
                  ? "Create Account"
                  : "Login"}

              </button>

            </form>


            {/* Switch Login / Signup */}
            <div className="text-center mt-6">

              <p className="text-gray-500 text-sm">

                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}

                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setPassword("");
                  }}
                  className="ml-2 text-red-600 font-bold hover:text-red-700"
                >
                  {isSignup ? "Login" : "Sign Up"}
                </button>

              </p>

            </div>


            {/* Bottom Message */}
            <div className="mt-7 bg-red-50 border border-red-100 rounded-2xl p-4 text-center">

              <p className="text-red-700 text-sm font-semibold">
                ❤️ Every drop counts. Every donor matters.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;