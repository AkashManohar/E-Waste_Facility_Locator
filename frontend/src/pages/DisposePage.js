import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DisposePage() {
  const navigate = useNavigate();
  const [deviceType, setDeviceType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [credits, setCredits] = useState(0);
  const [price, setPrice] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);

  // ✅ List of device types, brands, and models
  const devices = {
    Smartphone: {
      brands: {
        Apple: ["iPhone 13", "iPhone 12", "iPhone 11"],
        Samsung: ["Galaxy S21", "Galaxy Note 10", "Galaxy A52"],
      },
      creditMultiplier: 50, // 💰 50 credits per unit price
    },
    Laptop: {
      brands: {
        Dell: ["Inspiron 15", "XPS 13", "Latitude 5400"],
        HP: ["Pavilion", "Envy", "Spectre"],
      },
      creditMultiplier: 60, // 💰 60 credits per unit price
    },
    Accessories: {
      brands: {
        JBL: ["Headphones", "Speakers"],
        Sony: ["Earbuds", "Headphones"],
      },
      creditMultiplier: 40, // 💰 40 credits per unit price
    },
    Television: {
      brands: {
        Sony: ["Bravia 4K", "Bravia OLED"],
        LG: ["Smart TV", "OLED TV"],
      },
      creditMultiplier: 60, // 💰 60 credits per unit price
    },
    Refrigerator: {
      brands: {
        Samsung: ["Double Door", "Single Door"],
        Whirlpool: ["Frost-Free", "Convertible"],
      },
      creditMultiplier: 50, // 💰 60 credits per unit price
    },
    Other: {
      brands: {},
      creditMultiplier: 20, // 💰 Default multiplier for unknown devices
    },
  };

  // ✅ Calculate credits dynamically based on price & device type
  useEffect(() => {
    if (price && deviceType) {
      const multiplier = devices[deviceType]?.creditMultiplier || 1;
      setCredits(parseInt(price) * multiplier);
    } else {
      setCredits(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, deviceType]);

  // ✅ Check authentication & fetch user details
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("🔹 Token Found:", token);

    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/auth");
      return;
    }

    axios
      .get("http://localhost:5000/user/details", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log("✅ User Details:", res.data);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("❌ Error fetching user details:", err.response?.data || err);
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/auth");
      });
  }, [navigate]);

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to submit your e-waste disposal.");
      navigate("/auth");
      return;
    }

    // ✅ Validate required fields
    if (!deviceType || !brand || !model || !credits || !pickupDate || !pickupTime || !location || !phone) {
      alert("Please fill in all the fields.");
      return;
    }

    const disposalData = { deviceType, brand, model, credits, pickupDate, pickupTime, location, phone };

    console.log("📤 Sending Disposal Data:", disposalData);

    try {
      const response = await axios.post("http://localhost:5000/user/dispose", disposalData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Disposal Success:", response.data);
      alert("E-Waste Disposal Successful! Your credits have been updated.");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error submitting disposal:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to submit disposal. Try again.");
    }
  };

  return (
    <div className="min-h-screen p-6 flex justify-center items-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-green-700 text-center mb-4">E-Waste Disposal</h1>

        {/* ✅ Show logged-in user name */}
        {user && <p className="text-center text-green-700 font-semibold">Welcome, {user.name}!</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* ✅ Select Device Type */}
          <select className="w-full p-2 border rounded" value={deviceType} onChange={(e) => setDeviceType(e.target.value)}>
            <option value="">Select Device</option>
            {Object.keys(devices).map((device) => (
              <option key={device} value={device}>{device}</option>
            ))}
          </select>

          {/* ✅ Select Brand OR Enter Manually for 'Other' */}
          {deviceType === "Other" ? (
            <input type="text" className="w-full p-2 border rounded" placeholder="Enter Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
          ) : (
            <select className="w-full p-2 border rounded" value={brand} onChange={(e) => setBrand(e.target.value)} disabled={!deviceType}>
              <option value="">Select Brand</option>
              {deviceType && Object.keys(devices[deviceType]?.brands || {}).map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          )}

          {/* ✅ Select Model OR Enter Manually for 'Other' */}
          {deviceType === "Other" ? (
            <input type="text" className="w-full p-2 border rounded" placeholder="Enter Model" value={model} onChange={(e) => setModel(e.target.value)} />
          ) : (
            <select className="w-full p-2 border rounded" value={model} onChange={(e) => setModel(e.target.value)} disabled={!brand}>
              <option value="">Select Model</option>
              {brand && devices[deviceType]?.brands[brand]?.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          )}

          {/* Price Input */}
          <input type="number" className="w-full p-2 border rounded" placeholder="Number of Items" value={price} onChange={(e) => setPrice(e.target.value)} />

          {/* Pickup Date & Time */}
          <input type="date" className="w-full p-2 border rounded" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
          <input type="time" className="w-full p-2 border rounded" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />

          {/* Location & Phone */}
          <input type="text" className="w-full p-2 border rounded" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <input type="text" className="w-full p-2 border rounded" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

          {/* Earned Credits Display */}
          <h2 className="text-center text-lg font-semibold text-green-700">Earned Credits: {credits} Points</h2>

          {/* Submit Button */}
          <button type="submit" className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Submit</button>
        </form>
      </div>
    </div>
  );
}
