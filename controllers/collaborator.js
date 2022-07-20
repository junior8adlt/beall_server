const { slugify } = require('../libs/utils');
const {
  collaborator: CollaboratorModel,
  consultancies: ConsultanciesModel,
  collaborator_consultancies: CollaboratorConsultanciesModel,
} = require('../models');

const consultancieInclude = [
  {
    model: ConsultanciesModel,
    as: 'consultancies',
    required: false,
  },
];

class Collaborator {
  static async getCollaborators() {
    const conditional = {
      where: {},
      include: consultancieInclude,
    };
    const collaboratorModel = await CollaboratorModel.findAll(conditional);
    return collaboratorModel;
  }

  static async getCollaboratorById(id) {
    const collaborator = await CollaboratorModel.findOne({
      where: { id },
      include: consultancieInclude,
    });
    if (!collaborator) {
      throw notFound();
    }
    return collaborator;
  }

  static async getCollaboratorBySlug(slug) {
    const collaborator = await CollaboratorModel.findOne({
      where: { slug },
    });
    if (!collaborator) {
      throw notFound();
    }
    return collaborator;
  }

  static async createCollaborator(data, t) {
    const parseSlugData = {
      ...data,
      slug: slugify(`${data.name} ${data.lastName}`),
    };
    const collaborators = await CollaboratorModel.findAll({
      where: {
        slug: parseSlugData.slug,
      },
    });
    if (collaborators.length > 0) {
      throw new Error('Slug already exists');
    }
    return CollaboratorModel.create(parseSlugData, {
      transaction: t,
    });
  }

  static async deleteCollaborator(id) {
    try {
      await CollaboratorModel.destroy({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error(error, '--------------error');
      return false;
    }
  }
  static async updateCollaborator(id, data) {
    const parseSlugData = {
      ...data,
      slug: slugify(`${data.name} ${data.lastName}`),
    };
    const collaborator = await CollaboratorModel.findOne({ where: { id } });
    if (!collaborator.deleted_at && collaborator.slug !== parseSlugData.slug) {
      const collaborators = await CollaboratorModel.findAll({
        where: {
          slug: parseSlugData.slug,
        },
      });
      if (collaborators.length > 0) {
        throw new Error('Slug already exists');
      }
    }
    if (!collaborator) {
      throw notFound();
    }
    return collaborator.update(parseSlugData);
  }
  static async assignManyConsultanciesToCollaborator(arrayData, t) {
    return CollaboratorConsultanciesModel.bulkCreate(arrayData, {
      transaction: t,
    });
  }
  static async deleteManyConsultanciesFromCollaborator(arrayData, collaboratorId) {
    const consultanciesIds = arrayData.map((consultancy) => consultancy);
    return CollaboratorConsultanciesModel.destroy({
      where: {
        consultancieId: consultanciesIds,
        collaboratorId: collaboratorId,
      },
    });
  }
}

module.exports = Collaborator;
