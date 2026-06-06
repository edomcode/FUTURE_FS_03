import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Experiences.css';

const JOURNEYS = [
  {
    id: 1,
    tag: 'AUTUMN',
    title: 'Vineyard Private Tour',
    description:
      'An intimate sommelier-led excursion to an exclusive estate through centuries-old vines in Tuscany. Discover the art of Sangiovese and aged Brunello.',
    price: 850,
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    tag: 'WINTER',
    title: 'Desert Stargazing',
    description:
      'Venture deep into the Agafay basin for a private astronomer session under the vast African sky. Guided by experts, witness the universe.',
    price: 620,
    image: 'https://images.unsplash.com/photo-1532978879514-6cae1b3829cc?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    tag: 'SPRING',
    title: 'Traditional Tea Ceremony',
    description:
      'A poetic introduction to the centuries-old Japanese chado ritual, in a private Way of Tea session led by a Master of Ceremonies.',
    price: 480,
    image: 'https://images.unsplash.com/photo-1545194445-dddb8f4487c6?auto=format&fit=crop&w=1200&q=80',
  },
];

const ARTISANS = [
  {
    id: 1,
    tag: 'ATELIER',
    title: 'The Master Craftsman',
    subtitle: 'Private workshop with Italian atelier',
    image: 'https://images.unsplash.com/photo-1565017228812-7037af6a45ba?auto=format&fit=crop&w=1100&q=80',
    span: 'tall',
  },
  {
    id: 2,
    tag: 'GASTRONOMY',
    title: 'Culinary Salon',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1100&q=80',
    span: 'wide',
  },
  {
    id: 3,
    tag: 'EXPEDITION',
    title: 'Alpine Ascent',
    image: 'https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=900&q=80',
    span: 'small',
  },
  {
    id: 4,
    tag: 'CULTURE',
    title: 'Heritage Library',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80',
    span: 'small',
  },
];

export default function Experiences() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const pageSize = 3;
  const totalPages = Math.max(1, Math.ceil(JOURNEYS.length / pageSize));
  const visible = JOURNEYS.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <main className="experiences">
      <section
        className="xp-hero"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?auto=format&fit=crop&w=1900&q=80')",
        }}
      >
        <div className="xp-hero-inner">
          <span className="eyebrow xp-hero-eyebrow">Curated Moments</span>
          <h1>Worlds Away, Right Here.</h1>
          <p>
            Experience the soul of a destination through private access, heritage
            storytelling, and uncompromised exclusivity.
          </p>
        </div>
      </section>

      <section className="xp-intro container">
        <div className="xp-intro-text">
          <h2>The Art of Travel,<br />Redefined.</h2>
          <p>
            We believe luxury is not just found in the destination, but in the intimacy of
            the moment. Our curated experiences are designed for those who seek to connect
            with the heritage and heartbeat of the world's most evocative locales.
          </p>
          <a href="#journeys" className="xp-link">Discover our philosophy <span>→</span></a>
        </div>
        <div className="xp-intro-images">
          <div className="xp-intro-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=900&q=80')" }} />
          <div className="xp-intro-img tall" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=900&q=80')" }} />
        </div>
      </section>

      <section id="journeys" className="xp-journeys">
        <div className="container">
          <div className="xp-section-head">
            <div>
              <span className="eyebrow">Seasonal Collections</span>
              <h2>Signature Journeys</h2>
            </div>
            <div className="xp-arrows">
              <button onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)} aria-label="Previous">‹</button>
              <button onClick={() => setPage((p) => (p + 1) % totalPages)} aria-label="Next">›</button>
            </div>
          </div>

          <div className="xp-journey-grid">
            {visible.map((j) => (
              <article key={j.id} className="xp-journey-card">
                <div className="xp-journey-image" style={{ backgroundImage: `url('${j.image}')` }}>
                  <span className="xp-tag">{j.tag}</span>
                </div>
                <div className="xp-journey-body">
                  <h3>{j.title}</h3>
                  <p>{j.description}</p>
                  <div className="xp-journey-foot">
                    <span>FROM ${j.price} / GUEST</span>
                    <button onClick={() => navigate('/rooms')} aria-label="Explore">→</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="xp-artisan container">
        <div className="xp-section-head center">
          <span className="eyebrow">The Artisan Series</span>
          <h2>Beyond the Ordinary</h2>
        </div>
        <div className="xp-artisan-grid">
          {ARTISANS.map((a) => (
            <figure key={a.id} className={`xp-artisan-card xp-${a.span}`} style={{ backgroundImage: `url('${a.image}')` }}>
              <figcaption>
                <span className="xp-tag">{a.tag}</span>
                <h3>{a.title}</h3>
                {a.subtitle && <p>{a.subtitle}</p>}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="xp-cta">
        <div className="container xp-cta-inner">
          <h2>Your bespoke journey awaits.</h2>
          <p>Our concierge are available 24/7 to tailor every detail of your next experience to your exacting standards.</p>
          <div className="xp-cta-buttons">
            <a href="mailto:concierge@luxereserve.com" className="btn btn-light">Enquire Now</a>
            <button className="btn btn-dark" onClick={() => navigate('/offers')}>View All Collections</button>
          </div>
        </div>
      </section>
    </main>
  );
}
