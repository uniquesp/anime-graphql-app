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