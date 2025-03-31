import { Link } from "react-router-dom";
import heroImage from "../assets/hero-image.png"; // Ensure this image is in the assets folder

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-10 py-16 min-h-screen bg-green-50">
      {/* ✅ Left Side - Text Content */}
      <div className="md:w-1/2">
        <p className="text-green-600 font-semibold">— Welcome to EFinder</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        Empowering Innovation for <br />
          <span className="text-green-700">a Sustainable Future</span>
        </h1>
        <h2 className="text-2xl text-gray-300 font-semibold mt-2">
          E-Waste Facility Locator
        </h2>
        <p className="text-lg text-gray-700 mt-4">
          EFinder: Revolutionizing E-Waste Management. Easily locate recycling facilities with our platform your gateway to sustainable and responsible disposal.
        </p>

        {/* ✅ Buttons */}
        <div className="mt-6 flex space-x-4">
          <Link
            to="/recycle"
            className="px-6 py-3 bg-green-600 text-white font-bold uppercase rounded-lg hover:bg-green-700 transition"
          >
            Start Recycling
          </Link>
          <Link
            to="/map"
            className="px-6 py-3 bg-green-600 text-white font-bold uppercase rounded-lg hover:bg-green-700 transition"
          >
            Locate Facility
          </Link>
        </div>
      </div>

      {/* ✅ Right Side - Circular Image with Decorative Elements */}
      <div className="relative md:w-1/2 flex justify-center mt-10 md:mt-0">
        <div className="relative w-96 h-96">
          {/* Circular Image */}
          <img
            src={heroImage}
            alt="E-Waste Facility Locator"
            className="rounded-full shadow-lg w-full h-full object-cover"
          />
          {/* Floating Decorative Dots */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-full h-full rounded-full border-4 border-green-300 absolute animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
