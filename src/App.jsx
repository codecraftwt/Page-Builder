// src/App.jsx
import { useState, useEffect } from "react";
import EditorRender from "./components/editor/EditorRender";
import LandingPage from "./pages/LandingPage";

const DEFAULT_DATA = {
  title: "Senior React Developer",
  description: "We are looking for a passionate developer to join our team...",
  company: "Walstar",
  location: "Maharastra, India",
  salary: "₹15-25 LPA",
  heroImage: "",
  colors: { primary: "#3b82f6", bg: "#f9fafb" },
  testimonials: [
    { name: "Rahul", role: "Ex-Employee", comment: "Best company I worked for!" }
  ]
};

export default function App() {
  const [data, setData] = useState(DEFAULT_DATA);

  useEffect(() => {
    const savedData = localStorage.getItem('pageData');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (err) {
        console.error('Error parsing saved data:', err);
        setData(DEFAULT_DATA);
      }
    }
  }, []);

  const handleDataChange = (newData) => {
    setData(newData);
    // Save to localStorage
    localStorage.setItem('pageData', JSON.stringify(newData));
  };
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' or 'mobile'
  const [fullScreen, setFullScreen] = useState(false);

  const toggleViewMode = () => {
    setViewMode(viewMode === 'desktop' ? 'mobile' : 'desktop');
  };

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  if (fullScreen) {
    return (
      <div className="h-screen w-screen bg-white overflow-auto">
        <button
          onClick={toggleFullScreen}
          className="fixed top-4 right-6 w-10 h-10 z-50 text-black bg-slate-300 p-2 rounded-full hover:bg-gray-400"
          title="Exit Full Screen"
        >
          ✕
        </button>
        <LandingPage data={data} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* LEFT: EDITOR */}
      <div className="w-1/2 p-8 bg-white border-r border-gray-300 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Editor</h1>
        <EditorRender data={data} setData={handleDataChange} />
      </div>

      {/* RIGHT: PREVIEW */}
      <div className="w-1/2 p-8 bg-gray-50 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Live Preview</h1>
          <button
            onClick={toggleFullScreen}
            className="px-3 py-1  text-black rounded text-sm font-medium hover:bg-blue-200"
            title="Expand to Full Screen"
          >
            ⛶
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('desktop')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                viewMode === 'desktop'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Desktop
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                viewMode === 'mobile'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Mobile
            </button>
          </div>
        </div>
        <div
          className={`bg-white rounded-lg shadow-lg overflow-hidden ${
            viewMode === 'mobile' ? 'max-w-sm w-80 mx-auto' : ''
          }`}
        >
          <div style={viewMode === 'mobile' ? { transform: 'scale(0.8)', transformOrigin: 'top center' } : {}}>
            <LandingPage data={data} viewMode={viewMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
