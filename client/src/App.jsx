import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Home from '../pages/Home.jsx';
import Rooms from '../pages/Rooms.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
      </Routes>
      <Footer />
    </>
  );
}
