const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    upgrades: [Upgrade]
    score: [Score]
  }
  type Score {
    _id: ID
    newScore: Int
    userScore: [User]
    createdAt: String
  }
  type Upgrade {
    _id: ID
    upgradeName: String
    userAcquired: Boolean
    upgradeUser: [User]
    upgradeDescription: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]
    user(username: String!): User
    me: User
    userUpgrades(username: String, upgrades: String): User
    allUpgrades(upgradeName: String): [Upgrade]
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
   
    addScore(userId: ID, newScore: Int): Score
  }
`;

module.exports = typeDefs;