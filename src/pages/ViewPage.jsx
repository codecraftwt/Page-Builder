import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import LandingPage from "./LandingPage";

const API_BASE_URL = 'http://localhost:5000/api';

export default function ViewPage() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('desktop');

  useEffect(() => {
    fetchPageData();
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
      setError('Failed to load page data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading page...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Page not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-white overflow-auto relative">
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 w-10 h-10 z-[9999] text-black bg-gray-400 p-2.5 rounded-full hover:bg-gray-500"
        title="Back to Dashboard"
      >
        <ArrowLeft size={16} />
      </button>
      <button
        onClick={() => navigate(`/edit/${pageId}`)}
        className="fixed top-4 right-20 w-10 h-10 z-[9999] text-black bg-blue-400 p-2.5 rounded-full hover:bg-blue-500"
        title="Edit Page"
      >
        <Pencil size={16} />
      </button>
      {/* <div className="fixed top-4 right-4 z-[9999]">
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
      </div> */}
      <div
        className={`bg-white overflow-hidden ${
          viewMode === 'mobile' ? 'max-w-sm w-80 mx-auto' : ''
        }`}
      >
        <div style={viewMode === 'mobile' ? { transform: 'scale(0.8)', transformOrigin: 'top center' } : {}}>
          <LandingPage data={data} viewMode={viewMode} />
        </div>
      </div>
    </div>
  );
}
