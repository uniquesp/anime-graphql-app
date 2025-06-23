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
    relayAnimes(first: Int, after: String, last: Int, before: String): RelayAnimeConnection!
    infiniteAnimes(first: Int, after: ID): InfiniteAnimeResult!

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

type RelayAnimeConnection {
  edges: [RelayAnimeEdge!]!
  pageInfo: RelayPageInfo!
  totalCount: Int!
}

type RelayAnimeEdge {
  node: Anime!
  cursor: ID!
}

type RelayPageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type InfiniteAnimeResult {
    edges: [RelayAnimeEdge!]!
    pageInfo: RelayPageInfo!
    totalCount: Int!
}

type Mutation{
    addAnime(title: String!, description: String!): Anime
    updateAnime(id: ID!, title: String, description: String): Anime
    deleteAnime(id: ID!): Anime
}`

module.exports = { typeDefs };