import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Donors from "./pages/Donors";
import Request from "./pages/Request";
import Requests from "./pages/Requests";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import DonorForm from "./pages/DonorForm";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();

  // Home aur Login page par sidebar nahi dikhana
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login";

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =========================
          LEFT SIDEBAR
      ========================= */}
      {!hideNavbar && <Navbar />}


      {/* =========================
          MAIN CONTENT
      ========================= */}
      <main
        className={
          !hideNavbar
            ? "ml-72 min-h-screen p-6 md:p-8"
            : "min-h-screen"
        }
      >

        <Routes>

          {/* =========================
              HOME
          ========================= */}
          <Route
            path="/"
            element={<Home />}
          />


          {/* =========================
              LOGIN
          ========================= */}
          <Route
            path="/login"
            element={<Login />}
          />


          {/* =========================
              DASHBOARD
          ========================= */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />


          {/* =========================
              DONORS
          ========================= */}
          <Route
            path="/donors"
            element={
              <ProtectedRoute>
                <Donors />
              </ProtectedRoute>
            }
          />


          {/* =========================
              DONOR REGISTRATION
          ========================= */}
          <Route
            path="/donor-form"
            element={
              <ProtectedRoute>
                <DonorForm />
              </ProtectedRoute>
            }
          />


          {/* =========================
              BLOOD REQUEST
          ========================= */}
          <Route
            path="/request"
            element={
              <ProtectedRoute>
                <Request />
              </ProtectedRoute>
            }
          />


          {/* =========================
              ALL REQUESTS
          ========================= */}
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <Requests />
              </ProtectedRoute>
            }
          />


          {/* =========================
              ADMIN
          ========================= */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />


          {/* =========================
              404 PAGE
          ========================= */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </main>

    </div>
  );
}

export default App;