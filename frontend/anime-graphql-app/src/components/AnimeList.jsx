import { gql, useQuery } from '@apollo/client'

const GET_ANIMES = gql`
  query GetAnimes {
    animes {
      id
      title
      description
    }
  }
`

function AnimeList() {
  const { loading, error, data } = useQuery(GET_ANIMES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
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
          <p style={{ margin: '0' }}>{anime.description}</p>
        </div>
      ))}
    </div>
  )
}

export default AnimeList