const typeDef = `
    type RecoveryCode {
        id: ID
        code: String
        userId: Int
        used: Boolean
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
    }
`;

const resolvers = {
  Query: {
    
  },
};

module.exports = {
    typeDef,
    resolvers
}
