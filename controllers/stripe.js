const env = require('../config/env');
const { NODE_ENV } = env;
const stripe = require('stripe')(env[NODE_ENV].STRIPE_SECRET_KEY);

class Stripe {
  static async checkout(req, res) {
    const { title, price } = req.body;
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'mxn',
              product_data: {
                name: title,
              },
              unit_amount: price * 100,
            },
            quantity: 1,
          },
        ],

        // req.body.map((item) => {
        //   const img = item.image[0].asset._ref;
        //   const newImage = img
        //     .replace(
        //       'image-',
        //       'https://cdn.sanity.io/images/fdxmj5ti/production/'
        //     )
        //     .replace('-webp', '.webp');
        //   return {
        //     price_data: {
        //       currency: 'mxn',
        //       product_data: {
        //         name: item.name,
        //       },
        //       unit_amount: item.price * 100,
        //     },
        //     quantity: 1,
        //   };
        // }),

        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cursos`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
}

module.exports = Stripe;
