import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand">LUXE RESERVE</div>
            <p>
              Redefining the art of luxury travel through curated experiences and
              impeccable service across the globe's most exclusive destinations.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Share">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>
              </a>
              <a href="#" aria-label="Mail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
              </a>
              <a href="#" aria-label="Call">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h5>Company</h5>
            <a href="#">About Us</a>
            <a href="#">Sustainability</a>
            <a href="#">Contact Us</a>
          </div>

          <div className="footer-col">
            <h5>Reservations</h5>
            <a href="#">Bookings</a>
            <a href="#">Offers</a>
            <a href="#">Gift Cards</a>
          </div>

          <div className="footer-col">
            <h5>Legal</h5>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2024 Luxe Reserve Hospitality Group. All rights reserved.</span>
          <div className="footer-cards">
            <div className="pay-card">AMERICAN<br/>EXPRESS</div>
            <div className="pay-card">MASTERCARD</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
