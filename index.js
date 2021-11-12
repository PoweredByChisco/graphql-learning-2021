import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
