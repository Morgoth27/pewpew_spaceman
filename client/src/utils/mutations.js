import { gql } from '@apollo/client';

// export const UPDATE_USER = gql`
// mutation updateUser($id: ID!, $username: String, $email: String, $score: Int) {
//     updateUser(id: $id, username: $username, email: $email, score: $score) {
//         id
//         username
//         email
//         score
//         enemiesKilled
//         timeSurvived
//         createdAt
//         lastModified
//     }
// }
// `
export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    user {
      _id
      username
    }
  }
}
`
//need to update it to say password, not score

export const LOGIN = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      username
      _id
    }
  }
}
`

export const REMOVE_USER = gql`
mutation removeUser($id: ID!) {
    removeUser(id: $id)
}
`

export const SUBMIT_SCORE = gql`
mutation submitScore($username: String!, $score: Int!) {
    submitScore(username: $username, score: $score) {
        username
        score
    }
}
`
