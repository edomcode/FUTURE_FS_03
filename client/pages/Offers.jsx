import { useNavigate } from 'react-router-dom';
import './Offers.css';

const iconMap = {
  tour: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 21V7l9-4 9 4v14"/><path d="M9 21V12h6v9"/></svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>
  ),
  gift: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7c-2 0-4-1-4-3s2-3 4 0c2-3 4-2 4 0s-2 3-4 3Z"/></svg>
  ),
  spa: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 22c4-4 8-7 8-12a4 4 0 0 0-8 0 4 4 0 0 0-8 0c0 5 4 8 8 12Z"/></svg>
  ),
  sunrise: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M17 18a5 5 0 0 0-10 0M12 2v6M4.2 10.2l1.4 1.4M1 18h2M21 18h2M18.4 11.6l1.4-1.4M22 22H2"/></svg>
  ),
  nutrition: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z"/><circle cx="12" cy="9" r="2.5"/></svg>
  ),
  fork: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 2v8a3 3 0 0 0 6 0V2M10 10v12M17 2c-2 0-3 2-3 5s1 5 3 5v10"/></svg>
  ),
  wine: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 3h8v5a4 4 0 0 1-8 0V3ZM12 12v8M8 21h8"/></svg>
  ),
  chef: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 14a4 4 0 0 1 0-8 4 4 0 0 1 6-2 4 4 0 0 1 6 2 4 4 0 0 1 0 8M6 14h12v6H6z"/></svg>
  ),
};

const OFFERS = [
  {
    id: 1,
    eyebrow: 'Limited Availability',
    title: 'The Heritage Escape',
    description:
      'Immerse yourself in the narrative of our flagship estate. Secure your residence sixty days in advance to enjoy privileged rates and a private architectural tour of our historic grounds.',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=80',
    side: 'left',
    bullets: [
      { icon: 'tour', label: 'Private Curator-led Estate Tour' },
      { icon: 'calendar', label: '20% Advantage on Early Bookings' },
      { icon: 'gift', label: 'Vintage Champagne Reception on Arrival' },
    ],
  },
  {
    id: 2,
    eyebrow: 'Signature Series',
    title: 'Wellness Retreat',
    description:
      'Reclaim your serenity with our comprehensive wellness journey. This all-inclusive package harmonises luxury accommodation with bespoke therapeutic treatments designed by our resident practitioners.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80',
    side: 'right',
    bullets: [
      { icon: 'spa', label: 'Daily 90-minute Signature Spa Treatment' },
      { icon: 'sunrise', label: 'Private Sunrise Meditation & Yoga Sessions' },
      { icon: 'nutrition', label: 'Personalised Nutritional Consultation' },
    ],
  },
  {
    id: 3,
    eyebrow: 'Epicurean Choice',
    title: 'Culinary Journey',
    description:
      'Celebrate the art of the table. A weekend dedicated to gastronomic excellence, featuring an eight-course tasting menu paired with rare vintages from our cellar.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80',
    side: 'left',
    bullets: [
      { icon: 'fork', label: '8-Course Tasting Menu for Two' },
      { icon: 'wine', label: 'Sommelier-curated Wine Pairings' },
      { icon: 'chef', label: 'Private Masterclass with our Executive Chef' },
    ],
  },
];

export default function Offers() {
  const navigate = useNavigate();
  const reserve = () => navigate('/rooms');

  return (
    <main className="offers">
      <div className="container">
        <header className="offers-header">
          <span className="eyebrow">Exclusive Invitations</span>
          <h1>Curated Moments<br />of Distinction</h1>
          <p>
            Discover a collection of refined escapes designed for the discerning traveler.
            From heritage explorations to culinary mastery, each offer is a gateway to an
            unparalleled stay at Luxe Reserve.
          </p>
        </header>

        <div className="offers-list">
          {OFFERS.map((offer) => (
            <article key={offer.id} className={`offer-row offer-${offer.side}`}>
              <div className="offer-image" style={{ backgroundImage: `url('${offer.image}')` }} />
              <div className="offer-body">
                <span className="offer-eyebrow">{offer.eyebrow}</span>
                <h2>{offer.title}</h2>
                <p>{offer.description}</p>
                <ul className="offer-bullets">
                  {offer.bullets.map((b, i) => (
                    <li key={i}>
                      <span className="offer-icon">{iconMap[b.icon]}</span>
                      <span>{b.label}</span>
                    </li>
                  ))}
                </ul>
                <button className="btn btn-dark reserve-btn" onClick={reserve}>
                  Reserve Offer
                </button>
              </div>
            </article>
          ))}
        </div>

        <section className="bespoke">
          <h2>Bespoke Inquiries</h2>
          <p>
            Our concierge team is available to tailor any of our packages to your specific
            requirements, ensuring a stay that is uniquely yours.
          </p>
          <a className="bespoke-link" href="mailto:concierge@luxereserve.com">
            Speak with a Specialist
          </a>
        </section>
      </div>
    </main>
  );
}
