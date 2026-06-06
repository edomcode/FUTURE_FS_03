import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ destination: '', checkIn: '', checkOut: '', guests: '' });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(form).forEach(([k, v]) => v && params.set(k, v));
    navigate(`/rooms${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <section className="hero">
      <div
        className="hero-bg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1800&q=80')",
        }}
      />
      <div className="hero-overlay" />

      <div className="hero-content container">
        <span className="hero-eyebrow">Experience the Unseen</span>
        <h1 className="hero-title">Elegance in Every<br />Detail.</h1>
      </div>

      <form className="hero-search" onSubmit={onSubmit}>
        <div className="search-field">
          <label>Where to?</label>
          <input type="text" placeholder="Destination" value={form.destination} onChange={update('destination')} />
        </div>
        <div className="search-field">
          <label>Check in</label>
          <input type="date" value={form.checkIn} onChange={update('checkIn')} />
        </div>
        <div className="search-field">
          <label>Check out</label>
          <input type="date" value={form.checkOut} onChange={update('checkOut')} />
        </div>
        <div className="search-field">
          <label>Guests</label>
          <input type="number" min="1" max="12" placeholder="Add guests" value={form.guests} onChange={update('guests')} />
        </div>
        <button type="submit" className="btn btn-dark search-btn">Search</button>
      </form>
    </section>
  );
}
