import { gql } from '@apollo/client';

export const GET_ANIMES = gql`
  query GetAnimes {
    animes {
      id
      title
      description
    }
  }
`;

export const GET_OFFSET_ANIMES = gql`
  query GetOffsetAnimes($offset: Int!, $limit: Int!) {
    offsetAnimes(offset: $offset, limit: $limit) {
      items {
        id
        title
        description
      }
      totalCount
      hasMore
    }
  }
`;

export const GET_CURSOR_ANIMES = gql`
  query GetCursorAnimes($after: ID, $limit: Int!) {
    cursorAnimes(after: $after, limit: $limit) {
      items {
        id
        title
        description
      }
      pageInfo {
        endCursor
        hasMore
      }
    }
  }
`;

export const GET_RELAY_ANIMES = gql`
  query GetRelayAnimes($first: Int, $after: String, $last: Int, $before: String) {
    relayAnimes(first: $first, after: $after, last: $last, before: $before) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          title
          description
        }
      }
    }
  }
`;