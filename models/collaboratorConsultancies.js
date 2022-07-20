'use strict';
module.exports = (sequelize, DataTypes) => {
    const CollaboratorConsultancies = sequelize.define(
        'collaborator_consultancies',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            collaboratorId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'collaborator',
                        schema: 'public',
                    },
                    key: 'id',
                },
            },
            consultancieId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'consultancies',
                        schema: 'public',
                    },
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE,
            },
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true,
            freezeTableName: true,
        }
    );
    CollaboratorConsultancies.associate = function (models) {
        // CollaboratorConsultancies have many collaborators and consultancies
        // CollaboratorConsultancies.belongsTo(models.collaborator, {
        //   foreignKey: 'id',
        // });
        // CollaboratorConsultancies.belongsTo(models.consultancies, {
        //   foreignKey: 'id',
        // });
    };
    return CollaboratorConsultancies;
};
