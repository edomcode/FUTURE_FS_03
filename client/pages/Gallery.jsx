import { useMemo, useState } from 'react';
import './Gallery.css';

const TABS = [
  { id: 'all', label: 'All Work' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'interiors', label: 'Interiors' },
  { id: 'atmosphere', label: 'Atmosphere' },
];

const IMAGES = [
  { id: 1, category: 'architecture', url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80', alt: 'Curved infinity pool architecture' },
  { id: 2, category: 'interiors', url: 'https://images.unsplash.com/photo-1618219740975-d40978bb7378?auto=format&fit=crop&w=900&q=80', alt: 'Wooden corridor lounge' },
  { id: 3, category: 'atmosphere', url: 'https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?auto=format&fit=crop&w=900&q=80', alt: 'Wine glass golden hour' },
  { id: 4, category: 'atmosphere', url: 'https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1400&q=80', alt: 'Ocean view terrace' },
  { id: 5, category: 'interiors', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80', alt: 'Designer chair interior' },
  { id: 6, category: 'atmosphere', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', alt: 'Mountain sunset' },
  { id: 7, category: 'architecture', url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80', alt: 'Modern facade' },
  { id: 8, category: 'interiors', url: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80', alt: 'Modern lounge' },
  { id: 9, category: 'atmosphere', url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80', alt: 'Sunlit dining' },
  { id: 10, category: 'architecture', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80', alt: 'Geometric facade' },
  { id: 11, category: 'interiors', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80', alt: 'Bedroom suite' },
  { id: 12, category: 'atmosphere', url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80', alt: 'Misty mountains' },
];

const PATTERN = [2, 1, 1, 2, 3, 3];
const sizeFor = (i) => PATTERN[i % PATTERN.length];

export default function Gallery() {
  const [tab, setTab] = useState('all');
  const [batches, setBatches] = useState(1);

  const filtered = useMemo(() => {
    const list = tab === 'all' ? IMAGES : IMAGES.filter((i) => i.category === tab);
    return list.slice(0, batches * 6);
  }, [tab, batches]);

  const totalForTab = tab === 'all' ? IMAGES.length : IMAGES.filter((i) => i.category === tab).length;
  const canLoadMore = filtered.length < totalForTab;

  return (
    <main className="gallery container">
      <header className="gallery-header">
        <h1>The Visual Narrative</h1>
        <p>
          A curated collection of moments, spaces, and perspectives that define the
          Luxe Reserve experience.
        </p>
      </header>

      <div className="gallery-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`gallery-tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => { setTab(t.id); setBatches(1); }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="gallery-empty">No imagery in this collection yet.</div>
      ) : (
        <div className="gallery-grid">
          {filtered.map((img, i) => (
            <figure key={img.id} className={`gi gi-${sizeFor(i)}`}>
              <img src={img.url} alt={img.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      )}

      <div className="gallery-footer">
        {canLoadMore ? (
          <button className="btn btn-light view-more" onClick={() => setBatches((b) => b + 1)}>
            View More Collection
          </button>
        ) : (
          <span className="gallery-end">End of collection</span>
        )}
      </div>
    </main>
  );
}
