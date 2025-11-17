import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Expand } from "lucide-react";
import EditorRender from "../components/editor/EditorRender";
import LandingPage from "./LandingPage";

const DEFAULT_DATA = {
  title: "New Page",
  description: "Describe your page here...",
  company: "Your Company",
  location: "",
  salary: "",
  email: "",
  phone: "",
  heroImage: "",
  colors: { primary: "#3b82f6", bg: "#f9fafb" },
  titleStyles: {
    color: "#ffffff",
    fontSize: "48px",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    textDecoration: "none",
    fontStyle: "normal",
    lineHeight: "1.2",
    letterSpacing: "0px"
  },
  heroImageStyles: {
    width: "100%",
    height: "500px",
    borderRadius: "0px",
    objectFit: "cover",
    borderWidth: "0px",
    borderColor: "#000000",
    borderStyle: "solid",
    boxShadow: "none",
    opacity: "1"
  },
  testimonials: [
    { name: "", role: "", comment: "" }
  ]
};

const API_BASE_URL = 'http://localhost:5000/api';

export default function EditPage() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState('desktop'); 

  useEffect(() => {
    if (pageId && pageId !== 'new') {
      fetchPageData();
    } else {
      setData(DEFAULT_DATA);
      setLoading(false);
    }
  }, [pageId]);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/page/${pageId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch page data');
      }
      const result = await response.json();
      setData(result.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching page data:', err);
      setError('Failed to load page data. Using default data.');
      setData(DEFAULT_DATA);
    } finally {
      setLoading(false);
    }
  };

  const handleDataChange = (newData) => {
    setData(newData);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      let response;

      if (pageId === 'new' || !pageId) {
        // Create new page
        response = await fetch(`${API_BASE_URL}/page`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } else {
        // Update existing page
        response = await fetch(`${API_BASE_URL}/page/${pageId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save page data');
      }

      const savedData = await response.json();
      setData(savedData.data);
      setError(null);

      // Navigate to dashboard after save
      navigate('/');
    } catch (err) {
      console.error('Error saving page data:', err);
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'desktop' ? 'mobile' : 'desktop');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading page data...</p>
      </div>
    );
  }



  return (
    <div className="flex h-screen bg-gray-100">
      {/* LEFT: EDITOR */}
      <div className="w-1/2 p-8 bg-white border-r border-gray-300 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Editor</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <EditorRender data={data} setData={handleDataChange} />
      </div>

      {/* RIGHT: PREVIEW */}
      <div className="w-1/2 p-8 bg-gray-50 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Live Preview</h1>
          <button
            onClick={() => navigate(`/view/${pageId}`)}
            className="px-3 py-1 text-black rounded text-sm font-medium hover:bg-blue-200"
            title="View Full Page"
          >
            <Expand size={16} />
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
