import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("Fetching location...");
  const [user, setUser] = useState(null); // Store user data

  // ✅ Check authentication status when the component mounts
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (storedUser && token) {
        setUser(JSON.parse(storedUser)); // Set the user data if logged in
      } else {
        setUser(null); // Clear user state if not logged in
      }
    };

    checkAuthStatus(); // Initial check

    // ✅ Listen for authentication changes (login/logout)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ✅ Fetch User Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocation("Banglore, Karnataka"), // Replace with dynamic location fetching
        () => setLocation("Location Unavailable")
      );
    }
  }, []);

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Reset user state
    navigate("/auth");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />
        <span className="text-green-700 text-lg font-bold">EFinder</span>
      </div>

      {/* Navigation Links */}
      <div className="space-x-6 font-semibold">
        <Link to="/" className="hover:text-green-600">Home</Link>
        <Link to="/about" className="hover:text-green-600">About</Link>
        <Link to="/map" className="hover:text-green-600">E-Facilities</Link>
        <Link to="/recycle" className="hover:text-green-600">Recycle</Link>
        <Link to="/education" className="hover:text-green-600">Education</Link>
        <Link to="/rules" className="hover:text-green-600">Rules</Link>
      </div>

      {/* Location & Authentication */}
      <div className="flex items-center space-x-4">
        <span className="text-green-700 font-semibold">{location}</span>

        {/* ✅ Show Dashboard & Logout if Logged In */}
        {user ? (
          <>
            <Link to="/dashboard" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Login/Signup
          </button>
        )}
      </div>
    </nav>
  );
}
