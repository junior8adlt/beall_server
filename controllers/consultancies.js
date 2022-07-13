const {
  consultancies: ConsultancieModel,
  collaborator: CollaboratorModel,
} = require('../models');

class Consultancie {
  static async getConsultancies() {
    const conditional = { where: {} };
    const consultancieModel = await ConsultancieModel.findAll(conditional);
    return consultancieModel;
  }

  static async getConsultancieById(id) {
    const consultancie = await ConsultancieModel.findOne({
      where: { id },

      include: [
        {
          model: CollaboratorModel,
          as: 'collaborators',
          required: false,
        },
      ],
    });
    if (!consultancie) {
      throw notFound();
    }
    return consultancie;
  }

  static async createConsultancie(data) {
    return ConsultancieModel.create(data);
  }

  static async deleteConsultancie(id) {
    try {
      await ConsultancieModel.destroy({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error(error, '--------------error');
      return false;
    }
  }
  static async updateConsultancie(id, data) {
    const consultancie = await ConsultancieModel.findOne({ where: { id } });
    if (!consultancie) {
      throw notFound();
    }
    return consultancie.update(data);
  }
}

module.exports = Consultancie;
