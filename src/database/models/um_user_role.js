const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User_Role extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(models) {
            // define association here
            User_Role.belongsTo(models.Roles, { foreignKey: 'role_id' });
            User_Role.belongsTo(models.Business, { foreignKey: 'business_id' });
            User_Role.belongsTo(models.User, { foreignKey: 'user_id' });
        }
    }
    User_Role.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            um_user_role_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            is_active: {
                type: DataTypes.STRING,
            },
            role_comment: {
                type: DataTypes.STRING,
            },
            user_id: {
                type: DataTypes.INTEGER,
            },
            role_id: {
                type: DataTypes.INTEGER,
            },
            business_id: {
                type: DataTypes.INTEGER,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            createdBy: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
            updatedBy: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: User_Role.name,
            tableName: 'um_user_role',
            paranoid: true,
            timestamps: true,
        }
    );

    return User_Role;
};
