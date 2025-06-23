function PaginationSwitcher({ setView }) {
  return (
    <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
      <button onClick={() => setView('loadAll')}>Load All</button>
      <button onClick={() => setView('offset')}>Offset Pagination</button>
      <button onClick={() => setView('cursor')}>Cursor Pagination</button>
      <button onClick={() => setView('relay')}>Prev/Next (Relay Cursor)</button>
      <button onClick={() => setView('infinite')}>Infinite Scroll</button>
    </div>
  );
}

export default PaginationSwitcher;
