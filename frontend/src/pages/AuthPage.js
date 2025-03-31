import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get the page user was trying to access before being redirected
  const redirectPath = new URLSearchParams(location.search).get("redirect") || "/dashboard";

  // ✅ Handle Login/Register Request
  const handleSubmit = async () => {
    try {
      const endpoint = isLogin ? "http://localhost:5000/auth/login" : "http://localhost:5000/auth/register";
      const data = isLogin ? { email, password } : { name, email, password };

      console.log("📤 Sending Request:", data); // Debugging log

      const response = await axios.post(endpoint, data);

      if (response.data.token) {
        console.log("✅ Login Successful:", response.data);

        // ✅ Store Token & User Info in Local Storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // ✅ Notify Other Components (Navbar, Dashboard, etc.)
        window.dispatchEvent(new Event("storage"));

        setMessage("Login successful!");
        
        // ✅ Redirect to intended page instead of always going to Dashboard
        navigate(redirectPath);
      } else {
        setMessage("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Login/Register Error:", error.response?.data || error);
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="w-96 p-8 shadow-lg rounded-xl bg-white text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">{isLogin ? "Login" : "Register"}</h1>

        {/* Name Field for Registration */}
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-3 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        {/* Email Field */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Field */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        {/* Error/Success Message */}
        {message && <p className="mt-2 text-red-500 text-sm">{message}</p>}

        {/* Toggle Between Login/Register */}
        <p
          className="mt-4 text-sm text-gray-600 cursor-pointer hover:text-green-500"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}
