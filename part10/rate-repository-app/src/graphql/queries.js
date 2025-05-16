import { gql } from '@apollo/client';

const REPOSITORY_DETAILS = gql`
 fragment RepositoryDetails on Repository {
    id
    description
    forksCount
    fullName
    language
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    url
 }
`
export const GET_REPOSITORIES = gql`
  query ($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories (orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`
export const GET_REPOSITORY = gql`
  query getRepository($id: ID!) {
    repository(id: $id){
      ...RepositoryDetails
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
${REPOSITORY_DETAILS}
`
export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            text
            createdAt
            repositoryId
            user {
              username
            }
            repository {
              fullName
            }
          }
        }
      }
    }
  }
`

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`