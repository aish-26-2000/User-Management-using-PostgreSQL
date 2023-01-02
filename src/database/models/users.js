const { Model } = require('sequelize');
const { getAccessURL } = require('../../utils/s3helper');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            User.hasMany(model.Activity, { foreignKey: 'UserId' });
            User.hasMany(model.userActivity, { foreignKey: 'UserId' });
            User.hasMany(model.user_consent, { foreignKey: 'UserId' });
            User.hasMany(model.user_cred, { foreignKey: 'UserId' });
            User.hasMany(model.Business_User_Assoc, { foreignKey: 'UserId' });
            User.hasMany(model.User_Preference, { foreignKey: 'UserId' });
            User.hasMany(model.User_Role, { foreignKey: 'user_id' });
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
                allowNull: true,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            fullName: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `${this.firstName} ${this.lastName}`;
                },
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            phone: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            imageKey: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            agreements: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.VIRTUAL,
                async get() {
                    const key = this.getDataValue('imageKey');
                    const result = await getAccessURL(key);
                    return result;
                },
            },
            pass_changetime: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            passChangeInterval: {
                type: DataTypes.VIRTUAL,
                get() {
                    const date = this.getDataValue('pass_changetime');
                    const oneday = 1000 * 60 * 60 * 24;
                    const diff = new Date() - new Date(date);
                    return Math.floor(diff / oneday);
                },
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
