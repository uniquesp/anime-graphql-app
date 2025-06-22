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