import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Protected Route User:", currentUser);

      setUser(currentUser);
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  // Firebase check hone tak wait
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl animate-pulse mb-3">
            🩸
          </div>

          <p className="text-gray-500">
            Checking login...
          </p>
        </div>
      </div>
    );
  }

  // User login nahi hai
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User logged in hai
  return children;
}

export default ProtectedRoute;