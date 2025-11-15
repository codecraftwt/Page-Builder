import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EditPage from './pages/EditPage';
import ViewPage from './pages/ViewPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit/:pageId" element={<EditPage />} />
        <Route path="/view/:pageId" element={<ViewPage />} />
      </Routes>
    </Router>
  );
}
