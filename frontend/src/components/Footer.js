import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-100 p-6 mt-10">
      <div className="container mx-auto flex justify-between">
        <div>
          <h2 className="font-bold text-xl">EFinder</h2>
          <p className="text-gray-700">Transforming E-Waste Management.</p>
        </div>
        <div>
          <h3 className="font-semibold">Our Services</h3>
          <a href="/dispose" className="hover:text-blue-600"><p>📱Smartphone Recycle</p></a>
          <a href="/dispose" className="hover:text-blue-600"><p>💻Laptop Recycle</p></a>
          <a href="/dispose" className="hover:text-blue-600"><p>🎧Accessories Recycle</p></a>
          <a href="/dispose" className="hover:text-blue-600"><p>📺Television Recycle</p></a>
          <a href="/dispose" className="hover:text-blue-600"><p>🧊Refrigerator Recycle</p></a>
          <a href="/dispose" className="hover:text-blue-600"><p>⚙️Other Recycle</p></a>
        </div>
        <div>
          <h3 className="font-semibold">Company</h3>
          <a href="/" className="hover:text-blue-600"><p>🏡Home</p></a>
          <a href="/about" className="hover:text-blue-600"><p>ℹ️About Us</p></a>
          <a href="/map" className="hover:text-blue-600"><p>📌E-Facilities</p></a>
          <a href="/recycle" className="hover:text-blue-600"><p>♻️Recycle</p></a>
          <a href="/education" className="hover:text-blue-600"><p>🎓Education</p></a>
          <a href="/rules" className="hover:text-blue-600"><p>📖Rules</p></a>
        </div>
        <div>
          <h3 className="font-semibold">Contact Us</h3>
          <p>📍 Banglore, Karnataka</p>
          <p>📞 +919234567890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
