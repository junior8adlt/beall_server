const { MercadoPagoController, UserController } = require("../controllers");
const { validateAuth } = require("../libs/auth");

const typeDef = `
  enum CurrencyMercadoPago {
    MXN
    USD
  }
  enum CategoryMercadoPago {
    others
    learnings
    services
  }
  input PreferenceItemsInput {
    courseId: Int!
    title: String!
    currency_id: CurrencyMercadoPago!
    picture_url: String!
    description: String!
    category_id: CategoryMercadoPago!
    quantity: Int!
    unit_price: Int!
  }
`;
// createPreference probar
const resolvers = {
  Mutation: {
    createPreference: async (_, { referenceItemsInput }, context) => {
      validateAuth(context);
      const { user } = context;
      try {
        const cleanedItems = [...referenceItemsInput].map(
          ({ courseId, ...rest }) => rest
        );
        const preference = await MercadoPagoController.createPreference(
          cleanedItems,
          {
            name: user.name,
            surname: user.lastName,
            email: user.email,
          }
        );
        const {
          body: { id },
        } = preference;
        const manyUserCourses = referenceItemsInput.map((item) => ({
          courseId: item.courseId,
          userId: user.id,
          isPay: false,
          preferenceMercadoPagoId: id,
        }));
        await UserController.createManyUserCourse(manyUserCourses);
        return id;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = {
  typeDef,
  resolvers,
};
