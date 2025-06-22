function AnimeCard({ anime, onEdit, onDelete }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
      <h2 style={{ margin: '0 0 10px 0' }}>{anime.title}</h2>
      <p style={{ margin: '0 0 15px 0' }}>{anime.description}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => onEdit(anime)}
          style={{ padding: '6px 12px', border: '1px solid #007bff', color: '#007bff', background: 'white', borderRadius: '4px', cursor: 'pointer' }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (window.confirm('Are you sure?')) onDelete(anime.id)
          }}
          style={{ padding: '6px 12px', border: '1px solid #dc3545', color: '#dc3545', background: 'white', borderRadius: '4px', cursor: 'pointer' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AnimeCard;
