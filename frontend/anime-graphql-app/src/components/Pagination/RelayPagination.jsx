import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_RELAY_ANIMES } from '../../graphql/queries';
import { DELETE_ANIME } from '../../graphql/mutation';
import AnimeCard from '../AnimeCard';
import EditAnime from '../AnimeModal/EditAnime';

const LIMIT = 4;

const RelayPagination = () => {
  const [after, setAfter] = useState(null);
  const [before, setBefore] = useState(null);
  const [editingAnime, setEditingAnime] = useState(null);

  const variables = after ? { first: LIMIT, after }
                 : before ? { last: LIMIT, before }
                 : { first: LIMIT };

  const { data, loading, error } = useQuery(GET_RELAY_ANIMES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const [deleteAnime] = useMutation(DELETE_ANIME, {
    refetchQueries: [{ query: GET_RELAY_ANIMES, variables }],
  });

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { edges, pageInfo } = data.relayAnimes;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Relay-style Pagination</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {edges.map(({ node }) => (
          <AnimeCard
            key={node.id}
            anime={node}
            onEdit={setEditingAnime}
            onDelete={(id) => deleteAnime({ variables: { id } })}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => {
            setBefore(pageInfo.startCursor);
            setAfter(null);
          }}
          disabled={!pageInfo.hasPreviousPage}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600 self-center">
          Showing {edges.length} results
        </span>

        <button
          onClick={() => {
            setAfter(pageInfo.endCursor);
            setBefore(null);
          }}
          disabled={!pageInfo.hasNextPage}
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

export default RelayPagination;
