import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
mutation updateUser($id: ID!, $username: String, $email: String, $score: Int) {
    updateUser(id: $id, username: $username, email: $email, score: $score) {
        id
        username
        email
        score
        enemiesKilled
        timeSurvived
        createdAt
        lastModified
    }
}
`
export const CREATE_USER = gql`
mutation addUser($username: String!, $email: String!, $score: Int!) {
    addUser(username: $username, email: $email, score: $score) {
        id
        username
        email
        score
        createdAt
        lastModified
    }
}
`

export const REMOVE_USER = gql`
mutation removeUser($id: ID!) {
    removeUser(id: $id)
}
`
