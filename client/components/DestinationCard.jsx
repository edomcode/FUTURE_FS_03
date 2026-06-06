import './DestinationCard.css';

export default function DestinationCard({ country, name, image, size = 'sm' }) {
  return (
    <article
      className={`destination-card destination-${size}`}
      style={{ backgroundImage: `url('${image}')` }}
    >
      <div className="destination-overlay" />
      <div className="destination-content">
        <span className="destination-country">{country}</span>
        <h3 className="destination-name">{name}</h3>
      </div>
    </article>
  );
}
