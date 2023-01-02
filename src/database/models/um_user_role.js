'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User_Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User_Role.belongsTo(models.Roles, { foreignKey: 'role_id' });
            User_Role.belongsTo(models.Business, { foreignKey: 'business_id' });
            User_Role.belongsTo(models.User, { foreignKey: 'user_id' });
        }
    }
    User_Role.init(
        {
            um_user_role_id: DataTypes.UUID,
            is_active: DataTypes.STRING,
            role_comment: DataTypes.STRING,
            user_id: DataTypes.BIGINT,
            role_id: DataTypes.INTEGER,
            business_id: DataTypes.BIGINT,
            created: DataTypes.DATE,
            createdby: DataTypes.STRING,
            updated: DataTypes.DATE,
            updatedby: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: User_Role.name,
            tableName: 'um_user_role',
            paranoid: true,
            timestamps: false,
        }
    );
    return User_Role;
};
