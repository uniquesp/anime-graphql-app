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

  const handlePrevious = () => {
    setBefore(pageInfo.startCursor);
    setAfter(null);
  };

  const handleNext = () => {
    setAfter(pageInfo.endCursor);
    setBefore(null);
  };

  return (
    <div style={{ padding: '16px' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px' }}>Relay-style Pagination</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {edges.map(({ node }) => (
          <AnimeCard
            key={node.id}
            anime={node}
            onEdit={setEditingAnime}
            onDelete={(id) => deleteAnime({ variables: { id } })}
          />
        ))}
      </div>

      <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '12px', border: '1px solid #e5e7eb', gap: '16px' }}>
          <button
            onClick={handlePrevious}
            disabled={!pageInfo.hasPreviousPage}
            style={{
              padding: '8px 16px',
              backgroundColor: !pageInfo.hasPreviousPage ? '#d1d5db' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: !pageInfo.hasPreviousPage ? 'not-allowed' : 'pointer',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
          >
            Previous
          </button>
          
          <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Showing {edges.length} results
          </span>
          
          <button
            onClick={handleNext}
            disabled={!pageInfo.hasNextPage}
            style={{
              padding: '8px 16px',
              backgroundColor: !pageInfo.hasNextPage ? '#d1d5db' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: !pageInfo.hasNextPage ? 'not-allowed' : 'pointer',
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

export default RelayPagination;