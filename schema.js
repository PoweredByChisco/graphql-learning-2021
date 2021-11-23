import { gql, UserInputError } from 'apollo-server';
import { users } from './db.js';
import { v1 as uuid } from 'uuid';
import { PersistedQueryNotSupportedError } from 'apollo-server-errors';

export const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }

  enum weekdays {
    MONDAY
    TUESDAY
    WEDNESDAY
  }

  type User {
    id: ID!
    name: String!
    username: String!
    age: String
    email: String!
    address: Address
    phone: String
    website: String
    company: Company
    contact: String
    check: String
    isAdult: Boolean
  }

  type Address {
    street: String!
    suite: String!
    city: String!
    zipcode: String!
    geo: Geo
  }

  type Geo {
    lat: String!
    lng: String!
  }

  type Company {
    name: String!
    catchPhrase: String!
    bs: String!
  }

  type Query {
    usersCount: Int!
    allUsers(phone: YesNo): [User]!
    findUser(name: String!): User
  }

  type Mutation {
    addUser(
      name: String!
      username: String!
      age: String
      email: String!
      phone: String
      website: String
    ): User
  }
`;

export const resolvers = {
  Query: {
    usersCount: () => users.length,
    allUsers: (root, args) => {
      if (!args.phone) return users;

      const byPhone = (user) => (args.phone === "YES" ? user.phone : !user.phone)

      return users.filter(byPhone);
    },

    findUser: (root, args) => {
      const { name } = args;
      return users.find((user) => user.name === name);
    },
  },

  Mutation: {
    addUser: (root, args) => {
      if (users.find((user) => user.name === args.name)) {
        throw new UserInputError('User already exists', {
          invalidArgs: args.name,
        });
      }
      const user = { ...args, id: uuid() };
      users.push(user);
      return user;
    },
  },

  User: {
    isAdult: (root) => root.age >= 18,
    contact: (root) => `${root.phone}, ${root.email}`,
    check: () => 'check',
  } /* Now we can request the de data contact and check on the query FindUser */,
};
