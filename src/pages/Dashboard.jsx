import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, MoreHorizontal, Plus, Edit2, Trash2 } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

export default function Dashboard() {
  const [pages, setPages] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [renamingPage, setRenamingPage] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchPages();
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/pages`);
      if (!response.ok) throw new Error('Failed to fetch pages');
      const result = await response.json();
      setPages(result.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching pages:', err);
      setError('Failed to load pages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (pageId) => {
    if (!window.confirm('Are you sure you want to delete this page?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/page/${pageId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete page');
      setPages(pages.filter(p => p.pageId !== pageId));
      setDropdownOpen(null);
    } catch (err) {
      alert('Failed to delete page. Please try again.');
    }
  };

  const handleRename = async (pageId) => {
    if (!newTitle.trim()) return;
    try {
      const page = pages.find(p => p.pageId === pageId);
      const response = await fetch(`${API_BASE_URL}/page/${pageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...page, title: newTitle }),
      });
      if (!response.ok) throw new Error('Failed to rename page');
      const updatedPage = await response.json();
      setPages(pages.map(p => p.pageId === pageId ? updatedPage.data : p));
      setRenamingPage(null);
      setNewTitle('');
      setDropdownOpen(null);
    } catch (err) {
      alert('Failed to rename page. Please try again.');
    }
  };

  const toggleDropdown = (pageId) => {
    setDropdownOpen(dropdownOpen === pageId ? null : pageId);
  };

  const startRename = (page) => {
    setRenamingPage(page.pageId);
    setNewTitle(page.title);
    setDropdownOpen(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchPages}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Page Dashboard</h1>
          <Link
            to="/edit/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            <Plus size={20} />
            Add New Page
          </Link>
        </div>

        {pages.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-gray-500 text-lg mb-6">No pages found. Create your first page!</p>
            <Link
              to="/edit/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              Create Page
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pages.map((page) => (
              <div
                key={page.pageId}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full"
              >
                <div className="h-48 bg-gray-100 relative overflow-hidden group">
                  {page.heroImage ? (
                    <img
                      src={page.heroImage}
                      alt={page.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                      <span className="text-5xl">📄</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  {renamingPage === page.pageId ? (
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleRename(page.pageId)}
                        className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <button
                        onClick={() => handleRename(page.pageId)}
                        className="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setRenamingPage(null);
                          setNewTitle('');
                        }}
                        className="px-3 py-1.5 bg-gray-500 text-white rounded-md text-sm hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                      {page.title}
                    </h3>
                  )}

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {page.description || 'No description available.'}
                  </p>

                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <div className="flex -mx-2">
                      <ActionButton
                        to={`/view/${page.pageId}`}
                        icon={<Eye size={18} />}
                        label="View"
                        color="blue"
                      />
                      <ActionButton
                        to={`/edit/${page.pageId}`}
                        icon={<Pencil size={18} />}
                        label="Edit"
                        color="green"
                      />
                      <div className="relative flex-1" ref={dropdownOpen === page.pageId ? dropdownRef : null}>
                        <button
                          onClick={() => toggleDropdown(page.pageId)}
                          className="w-full p-3 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition group"
                          title="More options"
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {/* Dropdown */}
                        {dropdownOpen === page.pageId && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
                            <button
                              onClick={() => startRename(page)}
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                            >
                              <Edit2 size={14} />
                              Rename
                            </button>
                            <button
                              onClick={() => handleDelete(page.pageId)}
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({ to, icon, label, color }) {
  const colors = {
    blue: 'hover:text-blue-600 hover:bg-blue-50',
    green: 'hover:text-green-600 hover:bg-green-50',
  };

  return (
    <Link
      to={to}
      className={`flex-1 p-3 flex items-center justify-center text-gray-600 ${colors[color]} rounded-lg transition group`}
      title={label}
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
    </Link>
  );
}