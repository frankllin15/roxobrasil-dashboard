import { gql } from "@apollo/client";

export const PRODUCTS_QUERY = gql`
  query Products($input: GetListInput) {
    products(input: $input) {
      items {
        id
        name
        slug
        description
        variants {
          id
          name
          assets {
            height
            width
            source
          }
          price
          SKU
          size
          color
        }
      }
    }
  }
`;
