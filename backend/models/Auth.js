import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const data = isLogin ? { email: formData.email, password: formData.password } : formData;

      const response = await axios.post(`http://localhost:5000${endpoint}`, data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-700">{isLogin ? "Login" : "Register"}</h1>

      {!isLogin && (
        <input
          type="text"
          placeholder="Full Name"
          className="w-80 p-3 mt-4 border rounded-lg"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      )}

      <input
        type="email"
        placeholder="Email"
        className="w-80 p-3 mt-4 border rounded-lg"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-80 p-3 mt-4 border rounded-lg"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <button onClick={handleSubmit} className="w-80 p-3 mt-4 bg-green-600 text-white rounded-lg">
        {isLogin ? "Login" : "Register"}
      </button>

      {message && <p className="mt-3 text-red-500">{message}</p>}

      <p className="mt-4 text-sm cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </p>
    </div>
  );
}
