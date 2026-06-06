import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Home from '../pages/Home.jsx';
import Rooms from '../pages/Rooms.jsx';
import RoomDetails from '../pages/RoomDetails.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import MyBookings from '../pages/MyBookings.jsx';
import Gallery from '../pages/Gallery.jsx';
import Offers from '../pages/Offers.jsx';
import { AuthProvider, useAuth } from '../services/AuthContext.jsx';

function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/bookings"
          element={<RequireAuth><MyBookings /></RequireAuth>}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}
