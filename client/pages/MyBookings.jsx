import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyBookings, cancelBooking } from '../services/bookingService.js';
import './MyBookings.css';

const formatDate = (d) => new Date(d).toLocaleDateString(undefined, {
  year: 'numeric', month: 'short', day: 'numeric',
});

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onCancel = async (id) => {
    if (!confirm('Cancel this booking?')) return;
    try {
      await cancelBooking(id);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Cancel failed.');
    }
  };

  return (
    <main className="bookings-page container">
      <header className="bookings-header">
        <h1>My Bookings</h1>
        <p>Manage your upcoming and past reservations.</p>
      </header>

      {loading && <div className="bookings-empty">Loading…</div>}
      {!loading && error && <div className="bookings-empty error">{error}</div>}
      {!loading && !error && bookings.length === 0 && (
        <div className="bookings-empty">
          You have no bookings yet. <Link to="/rooms">Browse sanctuaries →</Link>
        </div>
      )}

      <ul className="bookings-list">
        {bookings.map((b) => (
          <li key={b._id} className="booking-row">
            <div
              className="booking-thumb"
              style={{ backgroundImage: `url('${b.room?.images?.[0] || ''}')` }}
            />
            <div className="booking-info">
              <h3>{b.room?.name || 'Sanctuary'}</h3>
              <span className="muted">{b.room?.location}</span>
              <div className="booking-meta">
                <span>{formatDate(b.checkIn)} → {formatDate(b.checkOut)}</span>
                <span>{b.guests} guest{b.guests > 1 ? 's' : ''}</span>
                <span className={`status-pill status-${b.status}`}>{b.status}</span>
              </div>
            </div>
            <div className="booking-actions">
              <strong>${b.totalPrice?.toLocaleString()}</strong>
              {b.status !== 'cancelled' && (
                <button className="btn btn-light" onClick={() => onCancel(b._id)}>
                  Cancel
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
