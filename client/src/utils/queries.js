import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
query users {
    user {
        _id
        username
        score
        createdAt
        lastModified
    }
}`

export const LEADERBOARD_QUERY = gql`
    query leaderboarders {
        leaderboard {
            username
            score
        }
    }
`