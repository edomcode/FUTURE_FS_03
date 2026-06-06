import { useState } from 'react';
import FilterSidebar from '../components/FilterSidebar.jsx';
import RoomCard from '../components/RoomCard.jsx';
import Pagination from '../components/Pagination.jsx';
import { sanctuaryRooms } from '../services/mockData.js';
import './Rooms.css';

export default function Rooms() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('recommended');

  return (
    <main className="rooms-page">
      <div className="container">
        <header className="rooms-header">
          <h1>Available Sanctuaries</h1>
          <p>
            Curated living spaces designed for the discerning explorer. Select your retreat
            from our heritage-inspired collection.
          </p>
        </header>

        <div className="rooms-layout">
          <FilterSidebar />

          <div className="rooms-main">
            <div className="rooms-toolbar">
              <span className="rooms-count">
                Showing <strong>12</strong> luxury accommodations
              </span>
              <label className="sort-control">
                Sort by:
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </label>
            </div>

            <div className="rooms-grid">
              {sanctuaryRooms.map((r) => (
                <RoomCard key={r.id} room={r} variant="list" />
              ))}
            </div>

            <div className="rooms-footer">
              <Pagination page={page} totalPages={3} onChange={setPage} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
