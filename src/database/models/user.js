const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            User.hasMany(model.Activity,{ foreignKey: 'UserId' });
        }
    }
    User.init(
        {
            UserId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: true

            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true

            },
            phone: {
                type: DataTypes.INTEGER,
                allowNull: true

            },
            imageKey: {
                type: DataTypes.STRING,
                allowNull: true

            },
        },
        {
            sequelize,
            modelName: User.name,
            tableName: 'Users',
            paranoid: true,
            timestamps: true,
        }
    );

    return User;
};
