import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput) {
    login(input: $input) {
      success

      access_token
      user {
        id
        firstName
        email
        password
      }
    }
  }
`;
