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

  if (error) return <p style={{ color: '#dc2626' }}>Error: {error.message}</p>;

  return (
    <div style={{ padding: '16px' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px' }}>Infinite Scroll with Load More (Relay-style Cursor)</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {animes.map(({ node }) => (
          <AnimeCard
            key={node.id}
            anime={node}
            onEdit={setEditingAnime}
            onDelete={(id) => deleteAnime({ variables: { id } })}
          />
        ))}
      </div>

      <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
        {data?.infiniteAnimes?.pageInfo?.hasNextPage ? (
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '12px', border: '1px solid #e5e7eb' }}>
            <button
              onClick={loadMore}
              disabled={loading}
              style={{
                padding: '8px 16px',
                backgroundColor: loading ? '#d1d5db' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '500',
                transition: 'background-color 0.2s'
              }}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        ) : (
          <p style={{ color: '#6b7280', marginTop: '8px' }}>No more results</p>
        )}
      </div>

      {editingAnime && (
        <EditAnime anime={editingAnime} closeModal={() => setEditingAnime(null)} />
      )}
    </div>
  );
};

export default RelayInfiniteScroll;