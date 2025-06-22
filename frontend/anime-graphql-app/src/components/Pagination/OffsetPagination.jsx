import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_OFFSET_ANIMES } from '../../graphql/queries';
import { DELETE_ANIME } from '../../graphql/mutation';
import AnimeCard from '../AnimeCard';
import EditAnime from '../AnimeModal/EditAnime';

const LIMIT = 4;

const OffsetPagination = () => {
  const [offset, setOffset] = useState(0);
  const [editingAnime, setEditingAnime] = useState(null);

  const { data, loading, error } = useQuery(GET_OFFSET_ANIMES, {
    variables: { offset, limit: LIMIT },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteAnime] = useMutation(DELETE_ANIME, {
    refetchQueries: [{ query: GET_OFFSET_ANIMES, variables: { offset, limit: LIMIT } }],
  });

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { items, totalCount } = data.offsetAnimes;

  const totalPages = Math.ceil(totalCount / LIMIT);
  const currentPage = Math.floor(offset / LIMIT) + 1;

  const handlePageChange = (page) => {
    setOffset((page - 1) * LIMIT);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Offset-Based Pagination</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(anime => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            onEdit={setEditingAnime}
            onDelete={(id) => deleteAnime({ variables: { id } })}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
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

export default OffsetPagination;
