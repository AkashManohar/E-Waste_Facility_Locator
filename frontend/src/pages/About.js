import { FaRecycle, FaLeaf, FaUsers,FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-green-50 p-8 flex flex-col items-center text-center">
      {/* Page Header */}
      <h1 className="text-4xl font-bold text-green-700">About Us</h1>
      <p className="text-lg text-gray-600 mt-2 max-w-3xl">
        We are dedicated to promoting responsible e-waste recycling and reducing environmental impact.
      </p>

      {/* Mission & Vision Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-green-700">🌍 Our Mission</h2>
          <p className="text-gray-700 mt-2">
            To create a sustainable future by providing an easy and accessible way for people to recycle e-waste responsibly.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-green-700">🚀 Our Vision</h2>
          <p className="text-gray-700 mt-2">
            To be the leading platform in e-waste management, empowering communities to recycle and make a difference.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-12 max-w-4xl">
        <h2 className="text-3xl font-bold text-green-700">How It Works</h2>
        <p className="text-lg text-gray-600 mt-2">
          Our platform makes e-waste recycling easy and rewarding.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaRecycle className="w-12 h-12 text-green-600 mx-auto" />
            <h3 className="text-xl font-semibold mt-2">1. Locate Facility</h3>
            <p className="text-gray-700 mt-2">Find the nearest certified e-waste facility using our locator.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaLeaf className="w-12 h-12 text-green-600 mx-auto" />
            <h3 className="text-xl font-semibold mt-2">2. Dispose Responsibly</h3>
            <p className="text-gray-700 mt-2">Drop off your e-waste or schedule a pickup.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaUsers className="w-12 h-12 text-green-600 mx-auto" />
            <h3 className="text-xl font-semibold mt-2">3. Earn Rewards</h3>
            <p className="text-gray-700 mt-2">Earn points and redeem exciting eco-friendly rewards.</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-12 max-w-4xl">
        <h2 className="text-3xl font-bold text-green-700">Why Choose Us?</h2>
        <p className="text-lg text-gray-600 mt-2">
          We are committed to making e-waste recycling simple, rewarding, and impactful.
        </p>
        <ul className="mt-4 space-y-3 text-left text-gray-700 max-w-2xl">
          <li className="flex items-center">
            ✅ **Certified Recycling Centers:** Partnered with government-approved facilities.
          </li>
          <li className="flex items-center">
            ✅ **User-Friendly Platform:** Simple and intuitive design.
          </li>
          <li className="flex items-center">
            ✅ **Eco-Friendly Rewards:** Earn points for every responsible action.
          </li>
          <li className="flex items-center">
            ✅ **Community Impact:** Join thousands making a difference.
          </li>
        </ul>
      </div>

      {/* Our Impact */}
      <div className="mt-10 bg-white p-8 rounded-lg shadow-md max-w-4xl">
        <h2 className="text-2xl font-semibold text-green-700">Our Impact</h2>
        <div className="grid grid-cols-3 gap-6 mt-6 text-center">
          <div>
            <h3 className="text-3xl font-bold text-green-700">50K+</h3>
            <p className="text-gray-600">Devices Recycled</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-green-700">200+</h3>
            <p className="text-gray-600">Recycling Centers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-green-700">10K+</h3>
            <p className="text-gray-600">Users Engaged</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-10">
        <Link
          to="/recycle"
          className="flex items-center px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Get Started <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
}
