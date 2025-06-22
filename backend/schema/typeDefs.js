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

    offsetAnimes(offset: Int!, limit: Int!): OffsetAnimeResult!
    cursorAnimes(after: ID, limit: Int!): CursorAnimeResult!
}

type OffsetAnimeResult {
    items: [Anime!]!
    totalCount: Int!
    hasMore: Boolean!
}

type CursorAnimeResult {
    items: [Anime!]!
    pageInfo: PageInfo!
}

type PageInfo {
    endCursor: ID
    hasMore: Boolean!
}

type Mutation{
    addAnime(title: String!, description: String!): Anime
    updateAnime(id: ID!, title: String, description: String): Anime
    deleteAnime(id: ID!): Anime
}`

module.exports = { typeDefs };