import { gql, useQuery,useMutation } from '@apollo/client'
import { useState } from 'react'
import EditAnimeModal from './EditAnimeModal'

const GET_ANIMES = gql`
  query GetAnimes {
    animes {
      id
      title
      description
    }
  }
`
const DELETE_ANIME = gql`
  mutation DeleteAnime($id: ID!) {
    deleteAnime(id: $id) {
      id
    }
  }
`

function AnimeList() {
  const { loading, error, data } = useQuery(GET_ANIMES)
  const [editingAnime, setEditingAnime] = useState(null) 
  const [deleteAnime] = useMutation(DELETE_ANIME, {
    refetchQueries: ['GetAnimes'] 
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginTop: '20px'
      }}>
        {data.animes.map((anime) => (
          <div
            key={anime.id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              borderRadius: '8px'
            }}
          >
            <h2 style={{ margin: '0 0 10px 0' }}>{anime.title}</h2>
            <p style={{ margin: '0 0 15px 0' }}>{anime.description}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                style={{
                  padding: '6px 12px',
                  border: '1px solid #007bff',
                  borderRadius: '4px',
                  background: 'white',
                  color: '#007bff',
                  cursor: 'pointer'
                }}
                onClick={() => setEditingAnime(anime)} // ✅ open edit modal
              >
                Edit
              </button>
              <button
                style={{
                  padding: '6px 12px',
                  border: '1px solid #dc3545',
                  borderRadius: '4px',
                  background: 'white',
                  color: '#dc3545',
                  cursor: 'pointer'
                }}
                 onClick={() => {
                    if (window.confirm('Are you sure you want to delete this anime?')) {
                      deleteAnime({ variables: { id: anime.id } })
                    }
                  }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingAnime && (
        <EditAnimeModal
          anime={editingAnime}
          closeModal={() => setEditingAnime(null)}
        />
      )}
    </>
  )
}

export default AnimeList
