import './RoomCard.css';

const iconMap = {
  bed: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 9v11M22 9v11M2 14h20M4 14V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6"/></svg>
  ),
  guests: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="8" r="2.5"/><path d="M15 14c2.8 0 6 1.8 6 6"/></svg>
  ),
  area: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 3v18"/></svg>
  ),
  pool: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 18c2 0 2-1.5 4-1.5S8 18 10 18s2-1.5 4-1.5S16 18 18 18s2-1.5 4-1.5M2 14c2 0 2-1.5 4-1.5S8 14 10 14M7 14V5a2 2 0 1 1 4 0"/></svg>
  ),
  spa: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 22c4-4 8-7 8-12a4 4 0 0 0-8 0 4 4 0 0 0-8 0c0 5 4 8 8 12Z"/></svg>
  ),
  concierge: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
  ),
};

export default function RoomCard({ room, variant = 'list' }) {
  const { name, location, image, price, period = '/ night', badge, features = [] } = room;
  return (
    <article className={`room-card room-card-${variant}`}>
      <div className="room-image" style={{ backgroundImage: `url('${image}')` }}>
        {badge && <span className={`room-badge badge-${badge.tone || 'dark'}`}>{badge.label}</span>}
      </div>

      <div className="room-body">
        <div className="room-head">
          <div>
            <h3 className="room-name">{name}</h3>
            {location && <span className="room-location">{location}</span>}
          </div>
          <div className="room-price">
            <span className="price-value">${price.toLocaleString()}</span>
            <span className="price-period">{period.replace('/', '').trim().toUpperCase()}</span>
          </div>
        </div>

        {features.length > 0 && (
          <ul className="room-features">
            {features.map((f, i) => (
              <li key={i}>
                {iconMap[f.icon] || iconMap.bed}
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="room-actions">
          <button className="btn btn-ghost">View Details</button>
          {variant === 'list' && <button className="btn btn-dark">Book Now</button>}
        </div>
      </div>
    </article>
  );
}
