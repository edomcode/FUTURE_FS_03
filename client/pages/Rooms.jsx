import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSidebar, { DEFAULT_FILTERS } from '../components/FilterSidebar.jsx';
import RoomCard from '../components/RoomCard.jsx';
import Pagination from '../components/Pagination.jsx';
import { getRooms } from '../services/roomService.js';
import './Rooms.css';

const PAGE_SIZE = 4;

export default function Rooms() {
  const [searchParams] = useSearchParams();
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState('recommended');
  const [page, setPage] = useState(1);
  const guestsParam = Number(searchParams.get('guests')) || 0;

  useEffect(() => {
    let active = true;
    getRooms().then((rooms) => {
      if (active) {
        setAllRooms(rooms);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    let list = allRooms.filter((r) => r.price <= filters.price);
    const typeKeys = Object.keys(filters.types).filter((k) => filters.types[k]);
    const amenityKeys = Object.keys(filters.amenities).filter((k) => filters.amenities[k]);
    if (typeKeys.length) list = list.filter((r) => typeKeys.includes(r.type));
    if (amenityKeys.length) {
      list = list.filter((r) =>
        amenityKeys.every((a) => (r.amenities || []).includes(a))
      );
    }
    if (guestsParam) list = list.filter((r) => (r.capacity || 2) >= guestsParam);
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [allRooms, filters, sort, guestsParam]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [filters, sort, guestsParam]);

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
          <FilterSidebar value={filters} onChange={setFilters} />

          <div className="rooms-main">
            <div className="rooms-toolbar">
              <span className="rooms-count">
                Showing <strong>{filtered.length}</strong> luxury accommodation{filtered.length === 1 ? '' : 's'}
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

            {loading ? (
              <div className="rooms-empty">Loading sanctuaries…</div>
            ) : pageItems.length === 0 ? (
              <div className="rooms-empty">
                No sanctuaries match your filters. Try widening the price range or
                clearing your selections.
              </div>
            ) : (
              <div className="rooms-grid">
                {pageItems.map((r) => (
                  <RoomCard key={r.id} room={r} variant="list" />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="rooms-footer">
                <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
