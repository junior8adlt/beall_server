const { notFound } = require('../libs/errors');
const {
  consultancies: ConsultancieModel,
  collaborator: CollaboratorModel,
  collaborator_consultancies: CollaboratorConsultanciesModel,
} = require('../models');

const collaboratorInclude = [
  {
    model: CollaboratorModel,
    as: 'collaborators',
    required: false,
  },
];

class Consultancie {
  static async getConsultancies() {
    const conditional = { where: {}, include: collaboratorInclude };
    const consultancieModel = await ConsultancieModel.findAll(conditional);
    return consultancieModel;
  }

  static async getConsultancieById(id) {
    const consultancie = await ConsultancieModel.findOne({
      where: { id },
      include: collaboratorInclude,
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
  static async deleteManyCollaboratorsFromConsultancy(arrayData, consultancieId) {
    const collaboratorsIds = arrayData.map((collaboratorId) => collaboratorId);
    return CollaboratorConsultanciesModel.destroy({
      where: {
        collaboratorId: collaboratorsIds,
        consultancieId: consultancieId,
      },
    });
  }
}

module.exports = Consultancie;
