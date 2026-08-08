import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

function AdminRoute({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  // Firebase user check ho raha ho
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-5xl animate-pulse mb-4">
            🩸
          </div>

          <p className="text-gray-600 font-semibold">
            Checking Admin Access...
          </p>
        </div>
      </div>
    );
  }

  // Login nahi hai
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin email
  const adminEmail = "manahilhussain2603@gmail.com";

  const isAdmin =
    user.email?.trim().toLowerCase() ===
    adminEmail.trim().toLowerCase();

  // User admin nahi hai
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Admin hai
  return children;
}

export default AdminRoute;