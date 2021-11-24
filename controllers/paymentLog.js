const { payment_log: PaymentLogModel } = require("../models");

class PaymentLog {
  static async create(data) {
    try {
      const { status, payload, mercadoPagoId = null } = data;
    const PaymentLogData = {
      status,
      payload,
      mercadoPagoId,
    };
    return PaymentLogModel.create(PaymentLogData);
    } catch (error) {
      console.error(error,"-----------")
      throw error;
    }
  }
}

module.exports = PaymentLog;
