const typeDefs = `
  scalar Date

  type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type LiveReading {
    _id: ID!
    equipmentId: String!
    timestamp: Date!
    temperature: Float!
    flowRate: Float!
    vibration: Float!
    motorStatus: Boolean!
  }

  type HistoricalReading {
    _id: ID!
    equipmentId: String!
    timestamp: Date!
    averageTemperature: Float!
    averageFlowRate: Float!
    averageVibration: Float!
    motorStatus: Boolean!
  }

  type EquipmentProfile {
    _id: ID!
    equipmentId: String!
    type: String!
    location: String!
    installDate: Date!
    tagsTracked: [String!]!
  }

  type EquipmentFault {
    _id: ID!
    equipmentId: String!
    timestamp: Date!
    faultType: String!
    severity: String!
    resolved: Boolean!
    notes: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    role: String!
  }

  input FaultInput {
    equipmentId: String!
    faultType: String!
    severity: String!
    notes: String
  }

  type Query {
    me: User
    equipmentProfiles: [EquipmentProfile]
    liveReadings(equipmentId: String!): [LiveReading]
    historicalReadings(equipmentId: String!, from: String!, to: String!): [HistoricalReading]
    equipmentFaults(equipmentId: String!): [EquipmentFault]
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addEquipmentFault(input: FaultInput!): EquipmentFault
    resolveFault(faultId: ID!): EquipmentFault
  }
`;

export default typeDefs;
