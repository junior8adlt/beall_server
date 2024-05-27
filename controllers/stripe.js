const env = require('../config/env');
const { NODE_ENV } = env;
const stripe = require('stripe')(env[NODE_ENV].STRIPE_SECRET_KEY);

class Stripe {
  static async checkout(req, res) {
    const { title, price, courseId, isProduct, products, shippingPrice, isDigital } = req.body;
    console.log(isDigital, 'isDigital____________');
    try {
      let lineItems;
      if (isProduct) {
        lineItems = products.map((product) => ({
          price_data: {
            currency: 'mxn',
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: product.quantity,
        }));
        if (!isDigital) {
          lineItems.push({
            price_data: {
              currency: 'mxn',
              product_data: {
                name: 'Envío',
              },
              unit_amount: shippingPrice * 100,
            },
            quantity: 1,
          });
        }
      } else {
        lineItems = [
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
        ];
      }

      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: lineItems,
        success_url:
          isProduct && !isDigital
            ? `${req.headers.origin}/paymentSuccess`
            : isProduct && isDigital
            ? `${req.headers.origin}/digitalSuccess`
            : `${req.headers.origin}/success?courseId=${courseId}&isPaid=true`,
        cancel_url: isProduct
          ? `${req.headers.origin}/paymentFailed`
          : `${req.headers.origin}/formacion`,
      };

      // Crear sesiones de pago (Checkout Sessions) con los parámetros del cuerpo.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
}

module.exports = Stripe;
