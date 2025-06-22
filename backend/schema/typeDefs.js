const {gql} = require ('apollo-server')

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

module.exports = { typeDefs };