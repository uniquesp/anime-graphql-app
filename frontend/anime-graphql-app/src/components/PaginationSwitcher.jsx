function PaginationSwitcher({ setView }) {
  return (
    <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
      <button
        style={{ padding: '6px 12px', border: '1px solid #28a745', color: '#28a745', background: 'white', borderRadius: '4px', cursor: 'pointer' }} 
        onClick={() => setView('loadAll')}>Load All
      </button>
      <button 
        style={{ padding: '6px 12px', border: '1px solid #28a745', color: '#28a745', background: 'white', borderRadius: '4px', cursor: 'pointer' }} 
        onClick={() => setView('offset')}>Offset Pagination
      </button>
      <button 
        style={{ padding: '6px 12px', border: '1px solid #28a745', color: '#28a745', background: 'white', borderRadius: '4px', cursor: 'pointer' }} 
        onClick={() => setView('cursor')}>Cursor Pagination
      </button>
      <button
        style={{ padding: '6px 12px', border: '1px solid #28a745', color: '#28a745', background: 'white', borderRadius: '4px', cursor: 'pointer' }}  
        onClick={() => setView('relay')}>Prev/Next (Relay Cursor)
      </button>
      <button 
        style={{ padding: '6px 12px', border: '1px solid #28a745', color: '#28a745', background: 'white', borderRadius: '4px', cursor: 'pointer' }} 
        onClick={() => setView('infinite')}>Infinite Scroll
      </button>
    </div>
  );
}

export default PaginationSwitcher;
