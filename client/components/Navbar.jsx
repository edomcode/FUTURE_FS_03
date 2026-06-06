import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext.jsx';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>LUXE RESERVE</Link>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/rooms" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>Destinations</NavLink>
          <NavLink to="/experiences" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>Experiences</NavLink>
          <NavLink to="/gallery" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>Gallery</NavLink>
          <NavLink to="/offers" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>Offers</NavLink>
          {user && (
            <NavLink to="/bookings" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
              My Bookings
            </NavLink>
          )}
        </nav>

        <div className="nav-actions">
          <Link to="/rooms" className="btn btn-dark book-now-btn">Book Now</Link>

          {user ? (
            <div className="user-menu">
              <button className="avatar" onClick={() => setMenuOpen((v) => !v)} aria-label="Account">
                {user.name?.[0]?.toUpperCase() || 'U'}
              </button>
              {menuOpen && (
                <div className="user-dropdown" onMouseLeave={() => setMenuOpen(false)}>
                  <div className="user-info">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                  <Link to="/bookings" onClick={() => setMenuOpen(false)}>My Bookings</Link>
                  <button onClick={handleLogout}>Log out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-link">Sign in</Link>
          )}

          <button
            className="menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
