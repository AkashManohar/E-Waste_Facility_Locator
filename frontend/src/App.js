import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Recycle from "./pages/Recycle";
import Education from "./pages/Education";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import DisposePage from "./pages/DisposePage";
import GoogleMapEmbedPage from "./pages/GoogleMapEmbedPage";
import PrivateRoute from "./components/PrivateRoute";
import WasteClassifier from "./pages/WasteClassifier";
import Rules from "./pages/Rules";
import About from "./pages/About";  // ✅ Import About Page


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/user/details", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, [user]); // Update when user state changes

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recycle" element={<Recycle />} />
            <Route path="/education" element={<Education />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/about" element={<About />} />
            <Route path="/dispose" element={<PrivateRoute><DisposePage /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/map" element={<GoogleMapEmbedPage />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes */}
            <Route path="/classifier" element={<WasteClassifier />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
