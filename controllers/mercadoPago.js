const mercadopago = require("mercadopago");
const env = require("../config/env");

class MercadoPago {
  static async createPreference(items, payer) {
    const { NODE_ENV } = env;
    const enviroment = env[NODE_ENV];
    const preference = {
      items,
      payer,
      back_urls: {
        success: enviroment.successUrl,
        failure: enviroment.failureUrl,
        pending: enviroment.pendingUrl,
      },
      auto_return: "approved",
      notification_url: "https://www.your-site.com/api/mercadoPago",
    };
    try {
      const preferenceCreated = await mercadopago.preferences.create(
        preference
      );
      return preferenceCreated;
    } catch (error) {
      console.error(error, "-------------------error");
      throw error;
    }
    // await mercadopago.preferences
    //   .create(preference)
    //   .then(function (response) {
    //     res.json({
    //       id: response.body.id,
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }
  static async isPayed(req, res) {
    const { topic, id } = req.query;
    let merchantOrder = null;
    let payment = null;
    switch (topic) {
      case "payment":
        payment = await mercadopago.payment.findById(id);

        // MercadoPago\Payment::find_by_id($_GET["id"]);
        // Get the payment and the corresponding merchantOrder reported by the IPN.
        merchantOrder = await mercadopago.merchant_orders.findById(
          payment.order.id
        );
        // MercadoPago\MerchantOrder::find_by_id($payment->order->id);
        break;
      case "merchantOrder":
        merchantOrder = await mercadopago.merchant_orders.findById(id);
        // MercadoPago\MerchantOrder::find_by_id($_GET["id"]);
        break;
    }

    let paidAmount = 0;
    merchantOrder.payments.forEach((element) => {
      if (element["status"] == "approved") {
        paidAmount += Number(element["transaction_amount"]);
      }
    });

    // If the payment's transaction amount is equal (or bigger) than the merchantOrder's amount you can release your items
    if (paidAmount >= merchantOrder.total_amount) {
      console.log("Totally paid. Release your item.");
    } else {
      console.log("Not paid yet. Do not release your item.");
    }
    res.send();
  }
}

module.exports = MercadoPago;
