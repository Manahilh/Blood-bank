import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase";

function Navbar() {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logout Successful");
      navigate("/login");
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed");
    }
  };

  // Admin email
  const adminEmail = "manahilhussain2603@gmail.com";

  const isAdmin =
    user?.email?.trim().toLowerCase() ===
    adminEmail.trim().toLowerCase();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },
    {
      name: "Find Donors",
      path: "/donors",
      icon: "🔎",
    },
    {
      name: "Register Donor",
      path: "/donor-form",
      icon: "🩸",
    },
    {
      name: "Request Blood",
      path: "/request",
      icon: "🚨",
    },
    {
      name: "Blood Requests",
      path: "/requests",
      icon: "📋",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* =========================
          MOBILE HAMBURGER BUTTON
      ========================= */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-[60] w-12 h-12 bg-red-600 text-white rounded-xl shadow-lg flex items-center justify-center text-2xl hover:bg-red-700 transition"
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* =========================
          MOBILE OVERLAY
      ========================= */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* =========================
          SIDEBAR
      ========================= */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          w-72 h-screen
          bg-gradient-to-b from-red-600 via-red-600 to-red-800
          text-white
          flex flex-col
          shadow-2xl
          overflow-hidden
          transition-transform duration-300 ease-in-out

          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Decorative Background */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500 rounded-full opacity-20" />

        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-red-900 rounded-full opacity-30" />

        {/* =========================
            MOBILE CLOSE BUTTON
        ========================= */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 z-10 w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-xl hover:bg-white/25 transition"
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* =========================
            LOGO
        ========================= */}
        <div className="relative px-6 pt-7 pb-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center text-3xl shadow-lg animate-pulse">
              🩸
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-wide">
                Blood Bank
              </h1>

              <p className="text-xs text-red-100 mt-1">
                Save Life • Donate Blood
              </p>
            </div>
          </div>
        </div>

        {/* =========================
            USER PROFILE
        ========================= */}
        {user && (
          <div className="relative mx-4 mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-11 h-11 shrink-0 rounded-full bg-white text-red-600 flex items-center justify-center font-extrabold text-lg shadow-md">
                {user.email?.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="text-xs text-red-100 mb-1">
                  Logged in as
                </p>

                <p className="text-sm font-semibold truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Admin Badge */}
            {isAdmin && (
              <div className="mt-3 inline-flex items-center gap-1.5 bg-yellow-400 text-yellow-900 text-xs font-extrabold px-3 py-1.5 rounded-full shadow-sm">
                👑 Administrator
              </div>
            )}
          </div>
        )}

        {/* =========================
            NAVIGATION
        ========================= */}
        <nav className="relative px-4 mt-6 space-y-2 flex-1 overflow-y-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-red-200 px-3 mb-3">
            Main Menu
          </p>

          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`group relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-300 ${
                  active
                    ? "bg-white text-red-600 shadow-xl translate-x-1"
                    : "text-white hover:bg-white/15 hover:translate-x-1"
                }`}
              >
                {/* Active Indicator */}
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-red-600 rounded-r-full" />
                )}

                {/* Icon */}
                <span
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-xl transition-all duration-300 ${
                    active
                      ? "bg-red-100"
                      : "bg-white/10 group-hover:bg-white/20 group-hover:scale-110"
                  }`}
                >
                  {item.icon}
                </span>

                {/* Text */}
                <span className="font-semibold">
                  {item.name}
                </span>

                {/* Arrow */}
                {active && (
                  <span className="ml-auto text-red-500 font-bold">
                    →
                  </span>
                )}
              </button>
            );
          })}

          {/* =========================
              ADMIN
          ========================= */}
          {isAdmin && (
            <>
              <div className="pt-4 pb-2 px-3">
                <p className="text-xs font-bold uppercase tracking-widest text-red-200">
                  Administration
                </p>
              </div>

              <button
                onClick={() => handleNavigation("/admin")}
                className={`group relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-300 ${
                  location.pathname === "/admin"
                    ? "bg-white text-red-600 shadow-xl translate-x-1"
                    : "text-white hover:bg-white/15 hover:translate-x-1"
                }`}
              >
                {location.pathname === "/admin" && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-red-600 rounded-r-full" />
                )}

                <span
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-xl transition-all duration-300 ${
                    location.pathname === "/admin"
                      ? "bg-red-100"
                      : "bg-white/10 group-hover:bg-white/20 group-hover:rotate-12"
                  }`}
                >
                  👑
                </span>

                <span className="font-semibold">
                  Admin Dashboard
                </span>

                {location.pathname === "/admin" && (
                  <span className="ml-auto text-red-500 font-bold">
                    →
                  </span>
                )}
              </button>
            </>
          )}
        </nav>

        {/* =========================
            LOGOUT
        ========================= */}
        <div className="relative p-4">
          <div className="border-t border-white/15 pt-4">
            <button
              onClick={handleLogout}
              className="group w-full flex items-center justify-center gap-3 bg-white text-red-600 font-bold py-3.5 rounded-xl shadow-lg transition-all duration-300 hover:bg-red-50 hover:-translate-y-1 hover:shadow-xl active:scale-95"
            >
              <span className="text-xl transition-transform duration-300 group-hover:-translate-x-1">
                🚪
              </span>

              Logout
            </button>

            <p className="text-center text-xs text-red-200 mt-3">
              Blood Bank Management System
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Navbar;