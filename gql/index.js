import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// data
import db from "./_db.js";

// types queries, mutations
import { typeDefs } from "./schema.js";

// resolvers
const resolvers = {
  // simple queries and its resolvers
  Query: {
    games() {
      return db.games;
    },
    authors() {
      return db.authors;
    },
    reviews() {
      return db.reviews;
    },
    review(_, args, context) {
      // resolvers are passed with 3 params (parent, args, context)
      return db.reviews.find((r) => r.id === args.id);
    },
    author(_, args, context) {
      return db.authors.find((r) => r.id === args.id);
    },
    game(_, args, context) {
      return db.games.find((r) => r.id === args.id);
    },
  },

  // resolver chaining after main resolver resolves each game if the field mentioned in below resolver is required then it will be called
  Game: {
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    game(parent) {
      return db.games.find((r) => r.id === parent.game_id);
    },
    author(parent) {
      return db.authors.find((r) => r.id === parent.author_id);
    },
  },

  // mutations
  Mutation: {
    addGame(_, args) {
      const { game } = args;
      return { id: 6, title: game.title, platform: game.platform };
    },
    editGame(_, args) {
      const { game, id } = args;
      return {
        id,
        title: game.title,
        platform: game.platform,
      };
    },
    deleteGame(_, args) {
      return db.games.filter((g) => g.id !== args.id);
    },
  },
};

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
