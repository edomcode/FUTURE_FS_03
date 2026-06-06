import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">LUXE RESERVE</Link>

        <nav className="nav-links">
          <NavLink to="/rooms" className={({ isActive }) => (isActive ? 'active' : '')}>Destinations</NavLink>
          <a href="#experiences">Experiences</a>
          <a href="#gallery">Gallery</a>
          <a href="#offers">Offers</a>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
          <Link to="/rooms" className="btn btn-dark">Book Now</Link>
          <div className="avatar" aria-label="Account" />
        </div>
      </div>
    </header>
  );
}
