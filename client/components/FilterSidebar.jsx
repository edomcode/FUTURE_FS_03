import { useState } from 'react';
import './FilterSidebar.css';

const ROOM_TYPES = ['Royal Suites', 'Executive Rooms', 'Garden Villas', 'Penthouse'];
const AMENITIES = ['Private Pool', 'Ocean View', 'Butler Service', 'Spa Access'];

export default function FilterSidebar() {
  const [price, setPrice] = useState(1200);
  const [types, setTypes] = useState({ 'Royal Suites': true });
  const [amenities, setAmenities] = useState({ 'Butler Service': true });

  const toggle = (state, setState, key) =>
    setState({ ...state, [key]: !state[key] });

  const reset = () => {
    setPrice(1200);
    setTypes({});
    setAmenities({});
  };

  return (
    <aside className="filters">
      <div className="filter-card">
        <div className="filter-group">
          <h5>Price Range</h5>
          <input
            type="range"
            min="200"
            max="2500"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="price-slider"
          />
          <div className="price-range-labels">
            <span>$200</span>
            <span>$2,500+</span>
          </div>
        </div>

        <div className="filter-group">
          <h5>Room Type</h5>
          {ROOM_TYPES.map((t) => (
            <label key={t} className="check-row">
              <input
                type="checkbox"
                checked={!!types[t]}
                onChange={() => toggle(types, setTypes, t)}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h5>Amenities</h5>
          {AMENITIES.map((a) => (
            <label key={a} className="check-row">
              <input
                type="checkbox"
                checked={!!amenities[a]}
                onChange={() => toggle(amenities, setAmenities, a)}
              />
              <span>{a}</span>
            </label>
          ))}
        </div>

        <button className="btn btn-light reset-btn" onClick={reset}>
          Reset Filters
        </button>
      </div>

      <div className="rewards-card">
        <div className="rewards-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M20 12V8H6a2 2 0 0 1 0-4h12v4" />
            <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
          </svg>
        </div>
        <h4>Member Rewards</h4>
        <p>Enjoy up to 25% off when booking directly through Luxe Reserve.</p>
        <button className="btn btn-light rewards-btn">Join Now</button>
      </div>
    </aside>
  );
}
