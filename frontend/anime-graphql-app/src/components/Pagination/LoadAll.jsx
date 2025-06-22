import {useQuery,useMutation } from '@apollo/client'
import { useState } from 'react'
import AnimeCard from '../AnimeCard'
import EditAnime from '../AnimeModal/EditAnime'
import { GET_ANIMES } from '../../graphql/queries';
import { DELETE_ANIME } from '../../graphql/mutation';


function AnimeList() {
 const { loading, error, data } = useQuery(GET_ANIMES);
  const [editingAnime, setEditingAnime] = useState(null);

  const [deleteAnime] = useMutation(DELETE_ANIME, {
    refetchQueries: ['GetAnimes'],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
        {data.animes.map((anime) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            onEdit={setEditingAnime}
            onDelete={(id) => deleteAnime({ variables: { id } })}
          />
        ))}
      </div>
      {editingAnime && (
        <EditAnime anime={editingAnime} closeModal={() => setEditingAnime(null)} />
      )}
    </>
  );
}
export default AnimeList
