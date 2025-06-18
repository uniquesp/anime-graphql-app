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
}

module.exports = { typeDefs, resolvers };