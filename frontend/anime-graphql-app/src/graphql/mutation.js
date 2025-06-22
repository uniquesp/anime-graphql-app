import { gql } from '@apollo/client';

export const ADD_ANIME = gql`
  mutation AddAnime($title: String!, $description: String!) {
    addAnime(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

export const UPDATE_ANIME = gql`
  mutation UpdateAnime($id: ID!, $title: String!, $description: String!) {
    updateAnime(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

export const DELETE_ANIME = gql`
  mutation DeleteAnime($id: ID!) {
    deleteAnime(id: $id) {
      id
    }
  }
`;