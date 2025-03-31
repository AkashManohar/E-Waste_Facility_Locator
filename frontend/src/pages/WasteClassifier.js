import { useState, useRef, useEffect } from "react";
import { Camera, FilePlus, RefreshCw } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function WasteClassifier() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  // ✅ Check if user is logged in, otherwise redirect to login with a redirect path
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(`/auth?redirect=${encodeURIComponent(location.pathname)}`); 
    }
  }, [navigate, location.pathname]);

  // ✅ Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setCapturedImage(null);
  };

  // ✅ Open camera
  const openCamera = () => {
    setCameraOpen(true);
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  };

  // ✅ Capture image from camera
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
      setCameraOpen(false);
      video.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  // ✅ Close camera
  const closeCamera = () => {
    setCameraOpen(false);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  // ✅ Handle classification
  const classifyWaste = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    let formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    } else if (capturedImage) {
      const blob = await fetch(capturedImage).then(res => res.blob());
      formData.append("file", blob, "captured-image.png");
    } else {
      alert("Please select or capture an image.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/classify", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });

      setClassificationResult(response.data);

      // ✅ Save to user history
      await axios.post(
        "http://localhost:5000/user/history",
        {
          wasteType: response.data.class,
          image: response.data.imageUrl || capturedImage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Classification Error:", error);
      alert("Error classifying image.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-12 rounded-2xl shadow-lg text-center max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-green-700 mb-6">AI Waste Classifier</h1>

        <div className="flex justify-center gap-4 mb-6">
          {/* ✅ Choose File Button */}
          <label className="px-6 py-3 bg-gray-200 rounded-lg cursor-pointer">
            <input type="file" className="hidden" onChange={handleFileChange} />
            <center><FilePlus className="w-5 h-5" /></center>
            Choose File
          </label>

          {/* ✅ Capture Image Button */}
          <button onClick={openCamera} className="px-6 py-3 bg-purple-500 text-white rounded-lg">
          <center><Camera className="w-5 h-5" /></center>
            Capture Image
          </button>
        </div>

        {/* ✅ Classification Button */}
        <button
  onClick={classifyWaste}
  className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition"
  disabled={loading}
>
  {loading ? (
    <>
      <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Classifying...
    </>
  ) : (
    <>
      <RefreshCw className="w-5 h-5 mr-2" /> Classify Waste
    </>
  )}
</button>

        {/* ✅ Display Selected Image */}
{selectedFile && (
  <div className="relative mt-6">
    <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="w-full rounded-lg shadow" />
    <button 
      onClick={() => setSelectedFile(null)}
      className="absolute top-2 right-2"
    >
      ❌
    </button>
  </div>
)}

{/* ✅ Display Captured Image */}
{capturedImage && (
  <div className="relative mt-6">
    <img src={capturedImage} alt="Captured" className="w-full rounded-lg shadow" />
    <button 
      onClick={() => setCapturedImage(null)}
      className="absolute top-2 right-2"
    >
      ❌
    </button>
  </div>
)}


        {/* ✅ Classification Result */}
        {classificationResult && (
          <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-600 text-green-700 text-lg font-bold rounded">
            Prediction: {classificationResult.class}
          </div>
        )}
      </div>

      {/* ✅ Camera Modal */}
      {cameraOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
          <div className="relative bg-white p-6 rounded-lg shadow-lg">
            <video ref={videoRef} autoPlay className="w-80 h-60"></video>
            <canvas ref={canvasRef} className="hidden"></canvas>

            <div className="flex justify-between mt-4">
              <button onClick={captureImage} className="px-4 py-2 bg-green-600 text-white rounded-lg">Capture</button>
              <button onClick={closeCamera} className="px-4 py-2 bg-red-600 text-white rounded-lg">X</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
