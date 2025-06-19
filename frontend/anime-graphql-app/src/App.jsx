import { useState } from 'react'
import AnimeList from './components/AnimeList'
import AddAnimeModal from './components/AddAnimeModal'

function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Anime List</h1>
      <button style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                background: '#007bff',
                color: 'white',
                cursor: 'pointer'
              }}
              onClick={() => setShowModal(true)}> + Anime</button>

      <AnimeList />

      {showModal && <AddAnimeModal closeModal={() => setShowModal(false)} />}
    </div>
  )
}

export default App
