import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_INFINITE_ANIMES } from '../../graphql/queries';
import { DELETE_ANIME } from '../../graphql/mutation';
import AnimeCard from '../AnimeCard';
import EditAnime from '../AnimeModal/EditAnime';

const LIMIT = 4;

const RelayInfiniteScroll = () => {
  const [animes, setAnimes] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [editingAnime, setEditingAnime] = useState(null);

  const { data, loading, error, fetchMore } = useQuery(GET_INFINITE_ANIMES, {
    variables: { first: LIMIT, after: cursor },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const [deleteAnime] = useMutation(DELETE_ANIME, {
    onCompleted: () => {
      // Refresh list after deletion
      setAnimes([]);
      setCursor(null);
    },
  });

  useEffect(() => {
    if (data?.infiniteAnimes?.edges?.length) {
      setAnimes((prev) => [...prev, ...data.infiniteAnimes.edges]);
    }
  }, [data]);

  const loadMore = async () => {
    if (!data?.infiniteAnimes?.pageInfo?.hasNextPage) return;

    const res = await fetchMore({
      variables: {
        first: LIMIT,
        after: data.infiniteAnimes.pageInfo.endCursor,
      },
    });

    const newEdges = res.data.infiniteAnimes.edges;
    const newCursor = res.data.infiniteAnimes.pageInfo.endCursor;

    if (newEdges.length) {
      setCursor(newCursor);
    }
  };

  if (error) return <p className="text-red-600">Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Infinite Scroll with Load More (Relay-style Cursor)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {animes.map(({ node }) => (
          <AnimeCard
            key={node.id}
            anime={node}
            onEdit={setEditingAnime}
            onDelete={(id) => deleteAnime({ variables: { id } })}
          />
        ))}
      </div>

      <div className="mt-6 text-center">
        {data?.infiniteAnimes?.pageInfo?.hasNextPage ? (
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        ) : (
          <p className="text-gray-500 mt-2">No more results</p>
        )}
      </div>

      {editingAnime && (
        <EditAnime anime={editingAnime} closeModal={() => setEditingAnime(null)} />
      )}
    </div>
  );
};

export default RelayInfiniteScroll;
