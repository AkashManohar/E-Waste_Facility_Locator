import axios from "axios";
import { useState, useEffect } from "react";

export default function Rewards() {
  const [credits, setCredits] = useState(0);
  const [claimedRewards, setClaimedRewards] = useState([]);
  const rewards = [
    { points: 50, reward: "Reusable Shopping Bag" },
    { points: 100, reward: "10% Discount on Eco-Friendly Products" },
    { points: 200, reward: "Free E-Waste Pickup Service" }
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/user/history", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setCredits(res.data.credits);
        setClaimedRewards(res.data.claimedRewards);
      })
      .catch((err) => console.error("Error fetching rewards:", err));
  }, []);

  const redeemReward = (reward) => {
    if (credits < reward.points) {
      alert("Not enough credits!");
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:5000/user/redeem",
        { reward: reward.reward, points: reward.points },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setCredits(res.data.credits);
        setClaimedRewards([...claimedRewards, reward.reward]);
      })
      .catch((err) => alert(err.response.data.message));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold text-green-700">Rewards</h1>

      <h2 className="text-xl font-semibold text-gray-700 mt-4">Your Earned Credits</h2>
      <p className="text-4xl text-green-600 font-bold">{credits} Points</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Available Rewards</h2>
        <ul className="mt-2">
          {rewards.map((reward, index) => (
            <li key={index} className="mb-2 p-3 border rounded-lg flex justify-between">
              <span>{reward.points}+ Points → {reward.reward}</span>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => redeemReward(reward)}
              >
                Redeem
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
