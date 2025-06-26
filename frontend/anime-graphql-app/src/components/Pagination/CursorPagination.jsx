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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Forward Cursor Pagination</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((anime) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            onEdit={setEditingAnime}
            onDelete={(id) => deleteAnime({ variables: { id } })}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!pageInfo.hasMore}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {editingAnime && (
        <EditAnime anime={editingAnime} closeModal={() => setEditingAnime(null)} />
      )}
    </div>
  );
};

export default CursorPagination;
