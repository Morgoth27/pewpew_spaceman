const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    upgrades: [Upgrade]
  }
  type Score {
    _id: ID
    username: String!
    score: Int!
  }
  type Upgrade {
    _id: ID
    upgradeName: String
    userAcquired: Boolean
    upgradeUser: [User]
    upgradeDescription: String
  }
  type Leaderboard {
    username: String!
    score: Int!
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
    leaderboard: [Score]
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(userId: ID!): User
    submitScore(username: String!, score: Int!): String
  }
`;

module.exports = typeDefs;