import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'

const ADD_ANIME = gql`
  mutation AddAnime($title: String!, $description: String!) {
    addAnime(title: $title, description: $description) {
      id
      title
      description
    }
  }
`

function AddAnimeModal({ closeModal }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [addAnime] = useMutation(ADD_ANIME, {
    onCompleted: () => {
      setTitle('')
      setDescription('')
      closeModal()
    },
    refetchQueries: ['GetAnimes']
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addAnime({ variables: { title, description } })
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '90vw'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ margin: 0 }}>Add New Anime</h2>
          <button
            onClick={closeModal}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Title
            </label>
            <input
              type="text"
              placeholder="Enter anime title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Description
            </label>
            <textarea
              placeholder="Enter anime description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={closeModal}
              style={{
                padding: '8px 16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                background: '#007bff',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Add Anime
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddAnimeModal