const { recovery_code: RecoveryCodeModel } = require("../models");

class RecoveryCode {
  static async create(data) {
    const { code, userId, used = false } = data;
    const recoveryCodeData = {
      code, userId, used
    }
    return RecoveryCodeModel.create(recoveryCodeData);
  }
}

module.exports = RecoveryCode;
