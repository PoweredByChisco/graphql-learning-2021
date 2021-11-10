import { gql, ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { person } from "./person";



const resolvers = {
  Query: {
    usersCount: () => person.length,
    allUsers: () => person,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
