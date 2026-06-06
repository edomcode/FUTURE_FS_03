import './Hero.css';

export default function Hero() {
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

      <div className="hero-search">
        <div className="search-field">
          <label>Where to?</label>
          <input type="text" placeholder="Destination" />
        </div>
        <div className="search-field">
          <label>Check in</label>
          <input type="text" placeholder="Add date" />
        </div>
        <div className="search-field">
          <label>Check out</label>
          <input type="text" placeholder="Add date" />
        </div>
        <div className="search-field">
          <label>Guests</label>
          <input type="text" placeholder="Add guests" />
        </div>
        <button className="btn btn-dark search-btn">Search</button>
      </div>
    </section>
  );
}
