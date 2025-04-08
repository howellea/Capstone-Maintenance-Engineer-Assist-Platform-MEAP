import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      role
    }
  }
`;


export const QUERY_LIVE_READINGS = gql`
  query GetLiveReadings($equipmentId: String!) {
    liveReadings(equipmentId: $equipmentId) {
      _id
      timestamp
      temperature
      flowRate
      vibration
      motorStatus
    }
  }
`;
