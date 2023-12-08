import gql from "graphql-tag";

export const getSongs = gql`
  {
    songs {
      id
      title
    }
  }
`;

export const getDetails = gql`
  query getSongs($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
