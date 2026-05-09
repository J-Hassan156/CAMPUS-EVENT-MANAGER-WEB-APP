import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Admin from './pages/Admin';
import Login from './pages/Login';
import MyRegistrations from './pages/MyRegistrations';
import './App.css';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/login" element={token ? <Navigate to="/admin" /> : <Login />} />
          <Route path="/admin" element={token ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/my-registrations" element={<MyRegistrations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
