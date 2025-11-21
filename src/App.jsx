import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Dashboard from './pages/Dashboard';
import EditPage from './pages/EditPage';
import ViewPage from './pages/ViewPage';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/edit/:pageId" element={<EditPage />} />
          <Route path="/view/:pageId" element={<ViewPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}
