import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import DestinationCard from '../components/DestinationCard.jsx';
import RoomCard from '../components/RoomCard.jsx';
import { destinations, featuredRooms } from '../services/mockData.js';
import { getRooms } from '../services/roomService.js';
import './Home.css';

export default function Home() {
  const [featured, setFeatured] = useState(featuredRooms);

  useEffect(() => {
    getRooms().then((list) => {
      if (list?.length) setFeatured(list.slice(0, 3));
    });
  }, []);

  return (
    <main>
      <Hero />

      <section className="home-section">
        <div className="container">
          <div className="home-section-head">
            <div>
              <h2>Curated Destinations</h2>
              <p>
                Discover a handpicked collection of the world's most breathtaking retreats,
                where heritage meets modern sophistication.
              </p>
            </div>
            <Link to="/rooms" className="explore-link">Explore All</Link>
          </div>

          <div className="destinations-grid">
            <DestinationCard {...destinations[0]} />
            <DestinationCard {...destinations[1]} />
          </div>
          <div className="destinations-row" style={{ marginTop: '16px' }}>
            <DestinationCard {...destinations[2]} />
            <DestinationCard {...destinations[3]} />
          </div>
        </div>
      </section>

      <div className="featured-wrap">
        <div className="container">
          <div className="featured-head">
            <span className="eyebrow">The Selection</span>
            <h2>Editor's Choice Rooms</h2>
          </div>
          <div className="featured-grid">
            {featured.map((r) => (
              <RoomCard key={r.id} room={r} variant="featured" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
