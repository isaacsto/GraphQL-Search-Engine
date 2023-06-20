const { gql } = require('apollo-server-express');

const typeDefs = gql `
type User {
    _id: ID
    username: String
    email: String
    passwords: String
    savedBooks: [bookSchema]
}

type bookSchema {
    _id: ID
    authors: String 
    description: String 
    bookId: String 
    image: String 
    link: String
    title: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    user(username: String!) : User
    books(username: String) : [bookSchema]
    book(bookId: ID!) : bookSchema
    me: User
}

type Mutation {
    addUser(username: String! email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(bookId: String!): bookSchema
    removeBook(bookId: ID!): bookSchema
}
`
;

module.exports = typeDefs;
