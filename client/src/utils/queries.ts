import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

// Placeholder for MEAP-related queries
// e.g., export const QUERY_EQUIPMENT_STATUS = gql`...`;
