const { animes } = require('../data');
const { offsetPaginate, cursorPaginate} = require('./utils/pagination')

let animeList = [...animes];

const resolvers = {
    Query: {
    animes: () => animeList,
    anime: (_, { id }) => animeList.find((a) => a.id === id),

    offsetAnimes: (_, { offset, limit }) => {
      return offsetPaginate(animeList, offset, limit);
    },

    cursorAnimes: (_, { after, limit }) => {
      return cursorPaginate(animeList, after, limit);
    }
  },

  Mutation:{
   addAnime: (_, { title, description }) => {
        const newAnime = {
            id: String(Date.now()), 
            title,
            description
        };
        animeList.push(newAnime);
      return newAnime;
    },

    updateAnime: (_,{id,title,description}) =>{
        const anime = animeList.find((a) => a.id === id)
        if(!anime) return null;
        if (title !== undefined) anime.title = title;
        if (description !== undefined) anime.description = description;
        return anime;
    },
    deleteAnime: (_, { id }) => {
    const index = animeList.findIndex((a) => a.id === id)
        if (index === -1) throw new Error('Anime not found')
        const deleted = animeList.splice(index, 1)[0]
        return deleted
    }

  }
}

module.exports = { resolvers };
