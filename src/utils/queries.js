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

