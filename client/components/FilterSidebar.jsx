import './FilterSidebar.css';

const ROOM_TYPES = ['Royal Suites', 'Executive Rooms', 'Garden Villas', 'Penthouse'];
const AMENITIES = ['Private Pool', 'Ocean View', 'Butler Service', 'Spa Access'];

export const DEFAULT_FILTERS = {
  price: 2500,
  types: {},
  amenities: {},
};

export default function FilterSidebar({ value, onChange }) {
  const { price, types, amenities } = value;

  const update = (patch) => onChange({ ...value, ...patch });
  const toggle = (key, group) =>
    update({ [group]: { ...value[group], [key]: !value[group][key] } });

  const reset = () => onChange(DEFAULT_FILTERS);

  return (
    <aside className="filters">
      <div className="filter-card">
        <div className="filter-group">
          <h5>Price Range</h5>
          <input
            type="range"
            min="200"
            max="3600"
            step="50"
            value={price}
            onChange={(e) => update({ price: Number(e.target.value) })}
            className="price-slider"
          />
          <div className="price-range-labels">
            <span>$200</span>
            <span>Up to ${price.toLocaleString()}</span>
          </div>
        </div>

        <div className="filter-group">
          <h5>Room Type</h5>
          {ROOM_TYPES.map((t) => (
            <label key={t} className="check-row">
              <input
                type="checkbox"
                checked={!!types[t]}
                onChange={() => toggle(t, 'types')}
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
                onChange={() => toggle(a, 'amenities')}
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
