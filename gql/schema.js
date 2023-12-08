export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!] # will be resolved in chaining as we declared in resolver 
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game! # chained
    author: Author! # chained
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!] # chained
  }
  type Query {
    reviews: [Review]
    games: [Game]
    authors: [Author]

    review(id: ID!): Review
    game(id: ID!): Game
    author(id: ID!): Author
  }

  input AddGameInput {
    title: String!
    platform: [String!]!
  }

  input EditGameInput {
    title: String!
    platform: [String!]
  }

  type Mutation {
    addGame(game: AddGameInput!): Game
    editGame(id: ID!, game: EditGameInput!): Game
    deleteGame(id: ID!): [Game]
  }
`;
