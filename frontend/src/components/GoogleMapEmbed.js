import React, { useState, useEffect } from "react";

const GoogleMapEmbed = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError("Location access denied. Enable location services.");
          console.error("Error fetching location:", error);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // Generate Google Maps URL
  const googleMapsURL = userLocation
    ? `https://www.google.com/maps/search/E-Waste+Collection+Centers+near+me/@${userLocation.lat},${userLocation.lng},13z`
    : "https://www.google.com/maps/search/E-Waste+Collection+Centers+near+me/";

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">


      {/* Map Embed */}
      <div style={{ width: "100%", height: "400px", borderRadius: "10px", overflow: "hidden" }}>
        {userLocation ? (
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: "10px" }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=E-Waste+Collection+Centers+near+me&ll=${userLocation.lat},${userLocation.lng}&z=13&output=embed`}
          ></iframe>
        ) : (
          <p className="text-gray-600">{error || "Fetching location..."}</p>
        )}
      </div>

      {/* Redirect Button */}
      <button
        onClick={() => window.open(googleMapsURL, "_blank")}
        className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
      >
        View in Google Maps
      </button>
    </div>
  );
};

export default GoogleMapEmbed;
