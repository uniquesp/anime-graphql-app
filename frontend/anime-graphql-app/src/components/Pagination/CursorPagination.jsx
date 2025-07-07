import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURSOR_ANIMES } from '../../graphql/queries';
import { DELETE_ANIME } from '../../graphql/mutation';
import AnimeCard from '../AnimeCard';
import EditAnime from '../AnimeModal/EditAnime';

const LIMIT = 4;

const CursorPagination = () => {
  const [cursor, setCursor] = useState(null);
  const [editingAnime, setEditingAnime] = useState(null);

  const { data, loading, error } = useQuery(GET_CURSOR_ANIMES, {
    variables: { after: cursor, limit: LIMIT },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteAnime] = useMutation(DELETE_ANIME, {
    refetchQueries: [
      {
        query: GET_CURSOR_ANIMES,
        variables: { after: cursor, limit: LIMIT },
      },
    ],
  });

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { items, pageInfo } = data.cursorAnimes;

  const handleNext = () => {
    if (pageInfo.hasMore) {
      setCursor(pageInfo.endCursor);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px' }}>Forward Cursor Pagination</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {items.map((anime) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            onEdit={setEditingAnime}
            onDelete={(id) => deleteAnime({ variables: { id } })}
          />
        ))}
      </div>

      <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '12px', border: '1px solid #e5e7eb' }}>
          <button
            onClick={handleNext}
            disabled={!pageInfo.hasMore}
            style={{
              padding: '8px 16px',
              backgroundColor: !pageInfo.hasMore ? '#d1d5db' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: !pageInfo.hasMore ? 'not-allowed' : 'pointer',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
          >
            Next
          </button>
        </div>
      </div>

      {editingAnime && (
        <EditAnime anime={editingAnime} closeModal={() => setEditingAnime(null)} />
      )}
    </div>
  );
};

export default CursorPagination;