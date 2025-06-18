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

function App() {
  const { loading, error, data } = useQuery(GET_ANIMES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>Anime List</h1>
      {data.animes.map((anime) => (
        <div key={anime.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h2>{anime.title}</h2>
          <p>{anime.description}</p>
        </div>
      ))}
    </div>
  )
}

export default App
