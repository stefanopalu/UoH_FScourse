import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials)  {
      accessToken
      expiresAt
      user {
        id
        username
      }
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      user {
        username
      }
      repositoryId
      rating
      text
      createdAt
    }
  }
`

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user)  {
        id
        username
        createdAt
    }
  }
`