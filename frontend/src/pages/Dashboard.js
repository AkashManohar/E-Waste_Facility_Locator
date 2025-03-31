import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, RefreshCw } from "lucide-react";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]); // ✅ Added history state
  const [credits, setCredits] = useState(0); // ✅ Added credits state
  const [claimedRewards, setClaimedRewards] = useState([]); // ✅ Added claimedRewards state
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth"); // Redirect to login if not authenticated
      return;
    }

    // ✅ Fetch User Profile
    axios
      .get("http://localhost:5000/user/details", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUser(res.data.user);
        setCredits(res.data.user.credits || 0);
      })
      .catch((err) => {
        console.error("❌ Error fetching user profile:", err.response?.data || err);
        localStorage.removeItem("token");
        navigate("/auth");
      });

    // ✅ Fetch User Recycling History
    axios
      .get("http://localhost:5000/user/history", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setHistory(res.data.history || []);
        setClaimedRewards(res.data.claimedRewards || []);
      })
      .catch((err) => console.error("❌ Error fetching history:", err))
      .finally(() => setLoading(false)); // ✅ Set loading to false

  }, [navigate]);

  // ✅ Rewards List
  const rewards = [
    { points: 50, reward: "Reusable Shopping Bag" },
    { points: 100, reward: "10% Discount on Eco-Friendly Products" },
    { points: 200, reward: "Free E-Waste Pickup Service" },
  ];

  // ✅ Redeem Reward (Fixed API route)
  const redeemReward = (reward) => {
    const token = localStorage.getItem("token");
  
    axios
      .post("http://localhost:5000/user/redeem", 
        { reward: reward.reward, points: reward.points }, 
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log("✅ Reward Redeemed Successfully:", res.data);
  
        // ✅ Update UI immediately
        setCredits(res.data.credits); 
        setClaimedRewards([...claimedRewards, { reward: reward.reward, date: new Date().toISOString() }]);
      })
      .catch((err) => alert(err.response?.data?.message || "Error redeeming reward"));
  };
  

  // ✅ Reset User Data (Fixed API route)
  const resetData = () => {
    if (window.confirm("Are you sure you want to reset your credits and history?")) {
      const token = localStorage.getItem("token");
  
      axios
        .post("http://localhost:5000/user/reset", {}, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
          setCredits(0);
          setHistory([]);
          setClaimedRewards([]);
          alert("Your credits, history, and rewards have been reset.");
        })
        .catch((err) => console.error("❌ Error resetting data:", err));
    }
  };
  
  // ✅ Loading State
  if (loading) return <p className="text-center mt-10">🔄 Loading...</p>;

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-green-700 text-center">Dashboard</h1>

      {/* ✅ User Profile Section */}
      <div className="bg-white p-6 shadow-md rounded-lg text-center mt-4">
        <h2 className="text-xl font-semibold text-gray-700">User Profile</h2>
        <p className="text-lg">{user?.name}</p>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      {/* ✅ Earned Credits */}
      <div className="mt-4 bg-white p-6 shadow-md rounded-lg text-center">
        <h2 className="text-xl font-semibold text-gray-700">Your Earned Credits</h2>
        <p className="text-4xl text-green-600 font-bold">{credits} Points</p>
      </div>

      {/* ✅ Rewards List */}
      <div className="mt-4 bg-white p-6 shadow-md rounded-lg text-center">
        <h2 className="text-xl font-semibold text-gray-700">Rewards List</h2>
        <ul className="mt-2 border p-4 rounded-lg bg-gray-50 shadow text-left">
          {rewards.map((reward, index) => (
            <li key={index} className="mb-2 p-3 border rounded-lg bg-gray-100 shadow-sm flex justify-between items-center">
              <span className="font-semibold">{reward.points}+ Points → {reward.reward}</span>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                onClick={() => redeemReward(reward)}
              >
                Redeem
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Rewards Claimed History */}
      <div className="mt-4 bg-white p-6 shadow-md rounded-lg text-center">
        <h2 className="text-xl font-semibold text-gray-700">Rewards Claimed History</h2>
        <ul className="mt-2 border p-4 rounded-lg bg-gray-50 shadow">
          {claimedRewards.length > 0 ? (
            claimedRewards.map((item, index) => (
              <li key={index} className="mb-2 p-3 border rounded-lg bg-gray-100 shadow-sm flex justify-between items-center">
                <p className="font-semibold">{item?.reward || "Unknown Reward"}</p> 
                <p className="text-sm text-gray-500">Claimed on: {item?.date ? new Date(item.date).toLocaleString() : "N/A"}</p>
              </li>
            ))
          ) : (
            <p>No rewards claimed yet.</p>
          )}
        </ul>
      </div>

      {/* ✅ Recycling History */}
      <div className="mt-6 bg-white p-6 shadow-md rounded-lg text-center">
  <h2 className="text-xl font-semibold text-gray-700">Recycling History</h2>
  <ul className="mt-2 border p-4 rounded-lg bg-gray-50 shadow">
    {history.length > 0 ? (
      history.map((item, index) => (
        <li key={index} className="mb-2 p-3 border rounded-lg bg-gray-100 shadow-sm flex justify-between items-center">
          <p><strong>Device Type:</strong> {item.deviceType || "N/A"}</p>
          <p><strong>Brand:</strong> {item.brand || "N/A"}</p>
          <p><strong>Model:</strong> {item.model || "N/A"}</p>
          <p><strong>Earned Credits:</strong> <span className="text-green-700 font-bold">{item.credits} points</span></p>
          <p><strong>Pickup Date:</strong> {item.pickupDate ? new Date(item.pickupDate).toLocaleDateString() : "N/A"}</p>
          <p><strong>Pickup Time:</strong> {item.pickupTime || "N/A"}</p>
          <p><strong>Location:</strong> {item.location || "N/A"}</p>
          <p><strong>Phone:</strong> {item.phone || "N/A"}</p>
        </li>
      ))
    ) : (
      <p>No recycling history yet.</p>
    )}
  </ul>
</div>
<div className="mt-6 bg-white p-6 shadow-md rounded-lg">
  <h2 className="text-xl font-semibold text-gray-700">Recycling History</h2>
  <ul className="mt-2 border p-4 rounded-lg bg-gray-50 shadow">
    {history.length > 0 ? (
      history.map((item, index) => (
        <li key={index} className="mb-2 p-3 border rounded-lg bg-gray-100 shadow-sm">
          <p><strong>Waste Type:</strong> {item.wasteType || "N/A"}</p>
          {item.image && <img src={item.image} alt="Waste" className="w-24 mt-2 rounded-lg shadow-md" />}
          <p><strong>Classified Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
        </li>
      ))
    ) : (
      <p className="text-gray-500">No recycling history yet.</p>
    )}
  </ul>
</div>



      {/* ✅ Dispose & Reset Buttons */}
      <div className="text-center mt-6 flex justify-center gap-4">
         {/* Recycle Button */}
         <button
          onClick={() => navigate("/dispose")}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Recycle Now</span>
        </button>

        {/* Scan Now Button */}
        <button
          onClick={() => navigate("/classifier")}
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition flex items-center justify-center space-x-2"
        >
          <Camera className="w-5 h-5" />
          <span>Scan Now</span>
        </button>
        <button onClick={resetData} className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition">
          Reset
        </button>
      </div>
    </div>
  );
}
