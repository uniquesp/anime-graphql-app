const {gpl, gql} = require ('apollo-server')
const {animes} =  require ('./data')

let animeList = [...animes];

const typeDefs = gql `
type Anime {
    id: ID!
    title: String!
    description: String!
}

type Query{
    animes: [Anime!]!
    anime(id: ID!): Anime
}

type Mutation{
    addAnime(title: String!, description: String!): Anime
    updateAnime(id: ID!, title: String, description: String): Anime
    deleteAnime(id: ID!): Anime
}`

const resolvers = {
    Query: {
    animes: () => animeList,
    anime: (_, { id }) => animeList.find((a) => a.id === id),
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
  }
}

module.exports = { typeDefs, resolvers };