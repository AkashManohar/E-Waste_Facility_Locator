import { Camera, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Recycle() {
  const navigate = useNavigate();

  // ♻️ List of Recyclable Categories
  const recycleItems = [
    { name: "Smartphone", description: "Recycle your old smartphones responsibly.", icon: "📱" },
    { name: "Laptop", description: "Dispose of your old laptops in an eco-friendly way.", icon: "💻" },
    { name: "Accessories", description: "Recycle various electronic accessories responsibly.", icon: "🎧" },
    { name: "Television", description: "Dispose of harmful components properly.", icon: "📺" },
    { name: "Refrigerator", description: "Safe removal and recycling of refrigerators.", icon: "🧊" },
    { name: "Other", description: "Recycle any other electronic devices.", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      {/* Main Header */}
      <h1 className="text-4xl font-bold text-green-700 mb-6">Recycle & Scan</h1>
      <p className="text-gray-600 text-lg text-center max-w-2xl">
        Select an item category below or scan waste items for AI classification.
      </p>

      {/* ♻️ Recyclable Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {recycleItems.map((item, index) => (
          <div key={index} className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-lg transition">
            <span className="text-5xl">{item.icon}</span>
            <h2 className="text-xl font-semibold mt-2">{item.name}</h2>
            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
          </div>
        ))}
      </div>

      {/* 🌟 Action Buttons */}
      <div className="mt-10 flex flex-col md:flex-row gap-4">
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
      </div>
    </div>
  );
}
