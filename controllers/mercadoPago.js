const mercadopago = require("mercadopago");
const env = require("../config/env");
const PaymentLogController = require("./paymentLog"); 

class MercadoPago {
  static async createPreference(items, payer) {
    const { NODE_ENV, HOST } = env;
    const enviroment = env[NODE_ENV];
    // const notification_url = `${HOST}/api/mercadoPago`
    const notification_url = `https://12e6732bbce1.ngrok.io/api/mercadoPago`
    const preference = {
      items,
      payer,
      back_urls: {
        success: enviroment.successUrl,
        failure: enviroment.failureUrl,
        pending: enviroment.pendingUrl,
      },
      auto_return: "approved",
      notification_url,
    };
    try {
      const preferenceCreated = await mercadopago.preferences.create(
        preference
      );
      const paymentLogParams = {
        status: 'pending',
        payload: JSON.stringify(preferenceCreated),
        mercadoPagoId: null,
      }
      await PaymentLogController.create(paymentLogParams)
      return preferenceCreated;
    } catch (error) {
      console.error(error, "-------------------error");
      const paymentLogErrorParams = {
        status: 'failed_creating_preference',
        payload: JSON.stringify(error),
        mercadoPagoId: null,
      }
      await PaymentLogController.create(paymentLogErrorParams)
      throw error;
    }
  }
  static async isPayed(req, res) {
    const { topic, id } = req.query;
    try {
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
      const paymentLogParams = {
        status: 'not_paid_yet',
        payload: JSON.stringify(merchantOrder),
        mercadoPagoId: id,
      }
      // If the payment's transaction amount is equal (or bigger) than the merchantOrder's amount you can release your items
      if (paidAmount >= merchantOrder.total_amount) {
        paymentLogParams.status = 'paid'
        await PaymentLogController.create(paymentLogParams)
        console.log("Totally paid. Release your item.");
      } else {
        await PaymentLogController.create(paymentLogParams)
        console.log("Not paid yet. Do not release your item.");
      }

      res.send();
    } catch (error) {
      const paymentLogErrorParams = {
        status: 'failed_ipn',
        payload: JSON.stringify(error),
        mercadoPagoId: id,
      }
      await PaymentLogController.create(paymentLogErrorParams)
      console.error(error,"------------------error")
      res.status(500).send()
    }
  }
}

module.exports = MercadoPago;
