import './Pagination.css';

export default function Pagination({ page, totalPages, onChange }) {
  const prev = () => page > 1 && onChange(page - 1);
  const next = () => page < totalPages && onChange(page + 1);

  return (
    <div className="pagination">
      <button onClick={prev} disabled={page === 1} aria-label="Previous">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <span className="pagination-info">
        <strong>{page}</strong> of {totalPages}
      </span>
      <button onClick={next} disabled={page === totalPages} aria-label="Next">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
