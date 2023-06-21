import { gql } from '@apollo/client';


export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      email
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  query GetUserByUsername($username: String!) {
    user(username: $username) {
      id
      username
      email
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks($username: String) {
    books(username: $username) {
      id
      username
      email
    savedBooks {
        _id
        authors
        description
        bookId 
        image
        link 
        title 
    }
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
  query GetBookById($bookId: ID!) {
    book(bookId: $bookId) {
      id
      authors
      description 
      bookId 
      image 
      link 
      ttitle
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email 
      books {
        _id 
        authors 
        descriptuib 
        bookId 
        image 
        link 
        title
      }
     
    }
  }
`;

