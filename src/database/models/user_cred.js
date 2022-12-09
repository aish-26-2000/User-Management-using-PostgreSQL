const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class user_cred extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            user_cred.belongsTo(model.User, { foreignKey: 'UserId' });
        }
    }
    user_cred.init(
        {
            user_cred_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            UserId: {
                type: DataTypes.BIGINT,
            },
        },
        {
            sequelize,
            modelName: user_cred.name,
            tableName: 'user_cred',
            paranoid: true,
            timestamps: true,
        }
    );

    return user_cred;
};
