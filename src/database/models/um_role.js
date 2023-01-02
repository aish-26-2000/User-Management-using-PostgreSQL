'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Roles extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Roles.hasMany(models.User_Role, { foreignKey: 'role_id' });
        }
    }
    Roles.init(
        {
            um_role_id: DataTypes.UUID,
            is_active: DataTypes.STRING,
            name: DataTypes.STRING,
            created: DataTypes.DATE,
            createdby: DataTypes.STRING,
            updated: DataTypes.DATE,
            updatedby: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: Roles.name,
            tableName: 'um_role',
            timestamps: false,
        }
    );
    return Roles;
};
