import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import { Beers, Users } from "./data.js";

const typeDefs = readFileSync("./schema.graphql").toString("utf-8");
const resolvers = {
  Query: {
    user: (_, { id }) => Users.find((user) => user.id === id),
    users: () => Users,
    beer: (_, { id }) => Beers.find((beer) => beer.id == id),
    beers: () => Beers,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
