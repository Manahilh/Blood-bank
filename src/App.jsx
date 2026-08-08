import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Donors from "./pages/Donors";
import Donate from "./pages/Donate";
import Request from "./pages/Request";
import Requests from "./pages/Requests";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import DonorForm from "./pages/DonorForm";
import Navbar from "./components/navbar";

function App() {
  const location = useLocation();

  // Login aur Home page par sidebar nahi dikhana
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/";

  return (
    <div>

      {/* Sidebar */}
      {!hideNavbar && <Navbar />}

      {/* Main Content */}
      <main
  className={
    !hideNavbar
      ? "ml-72 p-8 min-h-screen bg-gray-50"
      : ""
  }
>

        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Donors */}
          <Route
            path="/donors"
            element={
              <ProtectedRoute>
                <Donors />
              </ProtectedRoute>
            }
          />

          {/* Donor Form */}
          <Route
            path="/donor-form"
            element={
              <ProtectedRoute>
                <DonorForm />
              </ProtectedRoute>
            }
          />

          {/* Blood Request */}
          <Route
            path="/request"
            element={
              <ProtectedRoute>
                <Request />
              </ProtectedRoute>
            }
          />

          {/* Requests */}
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <Requests />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />

          {/* Not Found */}
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