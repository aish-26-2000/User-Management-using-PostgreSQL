const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class userActivity extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            userActivity.belongsTo(model.User, { foreignKey: 'UserId' });
        }
    }
    userActivity.init(
        {
            user_activity_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            user_name: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            is_active: {
                type: DataTypes.ENUM('Y', 'N'),
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            createdBy: {
                type: DataTypes.STRING,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
            updatedBy: {
                type: DataTypes.STRING,
            },
            UserId: {
                type: DataTypes.BIGINT,
            },
        },
        {
            sequelize,
            modelName: userActivity.name,
            tableName: 'User History',
            paranoid: true,
            timestamps: true,
        }
    );

    return userActivity;
};
