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
mutation createUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
        _id
        username
    }
  }
}
`
//need to update it to say password, not score

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
        _id
        username
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
