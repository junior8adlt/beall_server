const typeDef = `
    enum Modality {
      OFFLINE
      ONLINE
      PRESENTIAL
    }
    enum Category {
      PERSONAL
      FAMILY
      MARRIAGE
    }
    type Course {
        id: ID
        title: String
        description: String
        shortDescription: String
        isFree: Boolean
        coverImageUrl: String
        price: Int
        urlVideos: String
        category: Category
        modality: Modality
        averageRate: Int
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
    }
`;

const resolvers = {
  Query: {
    course: (_, { id }, context) => {
      return {
        id: id,
      };
    },
    courses: (_, { title, category }, context) => {
      if (title && category) {
        return [{ title, category: { id: category } }];
      }
      if (title) {
        return [{ title, category: { id: 1 } }];
      }
      if (category) {
        return [{ title: "course 1", category: { id: category } }];
      }
      return [{ title: "course 1", category: { id: 1 } }];
    },
    categories: () => {
      return [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ];
    },
  },
};

module.exports = {
    typeDef,
    resolvers
}
