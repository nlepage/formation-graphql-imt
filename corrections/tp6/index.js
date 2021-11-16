import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import BeersAPI from "./beerService.js";
import { Users } from "./data.js";

const typeDefs = readFileSync("./schema.graphql").toString("utf-8");
const resolvers = {
  Query: {
    user: (_, { id }) => Users.find((user) => user.id === id),
    users: () => Users,
    beer: async (_, { id }, { dataSources }) =>
      dataSources.beersAPI.getBeerById(id),
    beers: async (_, __, { dataSources }) => dataSources.beersAPI.getBeers(),
    search: async (_, { queryString }, { dataSources }) => {
      const beers = dataSources.beersAPI.getBeersByName(queryString);
      const users = Users.filter((user) => user.name.includes(queryString));

      return [...beers, ...users];
    },
  },
  Entity: {
    __resolveType: (root) => {
      return root.tagline ? "Beer" : "User";
    },
  },
  User: {
    likedBeers: async (root, _, { dataSources }) =>
      root.likedBeers ? dataSources.beersAPI.getBeersById(root.likedBeers) : [],
  },
  Mutation: {
    toggleLike: (_, { userId, beerId }) => {
      const currentUser = Users.find((user) => user.id === userId);

      if (!currentUser.likedBeers) {
        currentUser.likedBeers = [];
      }

      const indexOfBeer = currentUser.likedBeers.indexOf(beerId);

      if (indexOfBeer >= 0) {
        currentUser.likedBeers.splice(indexOfBeer, 1);

        return currentUser;
      }

      currentUser.likedBeers.push(beerId);
      return currentUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    beersAPI: new BeersAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Sever ready at ${url}`);
});
