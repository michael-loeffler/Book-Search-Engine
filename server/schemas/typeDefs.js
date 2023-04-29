const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: Int
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
  }

  input SaveBookInput {
    authors: [String]
    description: String
    title: String
    image: String
    link: String
    bookId: Int!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(criteria: SaveBookInput): User
    removebook(bookId: Int): User
  }
`;

module.exports = typeDefs;