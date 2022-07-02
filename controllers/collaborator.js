const { slugify } = require('../libs/utils');
const { collaborator: CollaboratorModel } = require('../models');

class Collaborator {
  static async getCollaborators() {
    const conditional = { where: {} };
    const collaboratorModel = await CollaboratorModel.findAll(conditional);
    console.log(collaboratorModel);

    return collaboratorModel;
  }

  static async getCollaboratorById(id) {
    const collaborator = await CollaboratorModel.findOne({ where: { id } });
    if (!collaborator) {
      throw notFound();
    }
    return collaborator;
  }

  static async getCollaboratorBySlug(slug) {
    const collaborator = await CollaboratorModel.findOne({ where: { slug } });
    if (!collaborator) {
      throw notFound();
    }
    return collaborator;
  }

  static async createCollaborator(data) {
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
    return CollaboratorModel.create(parseSlugData);
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
    if (collaborator.slug !== parseSlugData.slug) {
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
}

module.exports = Collaborator;
