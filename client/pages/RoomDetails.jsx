import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { getRoomById } from '../services/roomService.js';
import { createBooking } from '../services/bookingService.js';
import { useAuth } from '../services/AuthContext.jsx';
import './RoomDetails.css';

export default function RoomDetails() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ checkIn: '', checkOut: '', guests: 2 });
  const [status, setStatus] = useState({ type: null, msg: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getRoomById(id).then((r) => { setRoom(r); setLoading(false); });
  }, [id]);

  const nights = (() => {
    if (!form.checkIn || !form.checkOut) return 0;
    const a = new Date(form.checkIn), b = new Date(form.checkOut);
    return Math.max(0, Math.ceil((b - a) / 86400000));
  })();
  const total = room ? nights * room.price : 0;

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, msg: '' });
    if (!user) { navigate('/login?next=' + encodeURIComponent(`/rooms/${id}?book=1`)); return; }
    if (nights <= 0) { setStatus({ type: 'error', msg: 'Please pick valid dates.' }); return; }
    setSubmitting(true);
    try {
      await createBooking({
        room: id,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: Number(form.guests),
      });
      setStatus({ type: 'success', msg: 'Booking confirmed! Redirecting…' });
      setTimeout(() => navigate('/bookings'), 1200);
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.message || 'Booking failed.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <main className="container details-loading">Loading…</main>;
  if (!room) return <main className="container details-loading">Room not found.</main>;

  return (
    <main className="room-details container">
      <button className="back-link" onClick={() => navigate(-1)}>← Back</button>

      <div className="details-grid">
        <div>
          <div className="details-image" style={{ backgroundImage: `url('${room.image}')` }} />
          <div className="details-info">
            <span className="eyebrow">{room.location}</span>
            <h1>{room.name}</h1>
            <p className="details-desc">{room.description || 'A curated sanctuary crafted for the discerning traveller.'}</p>

            <div className="details-meta">
              <div><strong>{room.capacity || 2}</strong><span>Guests</span></div>
              {room.sizeSqFt > 0 && <div><strong>{room.sizeSqFt}</strong><span>Sq Ft</span></div>}
              <div><strong>${room.price.toLocaleString()}</strong><span>Per Night</span></div>
            </div>

            {room.amenities?.length > 0 && (
              <div className="details-amenities">
                <h4>Amenities</h4>
                <ul>
                  {room.amenities.map((a) => <li key={a}>{a}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>

        <form className="booking-card" onSubmit={onSubmit} id={params.get('book') ? 'book' : undefined}>
          <h3>Reserve this sanctuary</h3>
          <label>Check in
            <input type="date" required value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} />
          </label>
          <label>Check out
            <input type="date" required value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} />
          </label>
          <label>Guests
            <input type="number" min="1" max={room.capacity || 8} value={form.guests}
              onChange={(e) => setForm({ ...form, guests: e.target.value })} />
          </label>

          {nights > 0 && (
            <div className="price-summary">
              <span>${room.price.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}</span>
              <strong>${total.toLocaleString()}</strong>
            </div>
          )}

          {status.msg && <div className={`status ${status.type}`}>{status.msg}</div>}

          <button type="submit" className="btn btn-dark book-submit" disabled={submitting}>
            {submitting ? 'Booking…' : user ? 'Confirm Booking' : 'Sign in to Book'}
          </button>
        </form>
      </div>
    </main>
  );
}
