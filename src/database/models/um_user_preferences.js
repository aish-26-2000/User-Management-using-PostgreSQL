const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User_Preference extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            User_Preference.belongsTo(model.User, { foreignKey: 'UserId' });
        }
    }
    User_Preference.init(
        {
            um_user_preferences_id: {
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            user_preferences_id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.BIGINT,
            },
            is_active: {
                type: DataTypes.ENUM('Y', 'N'),
                defaultValue: 'Y',
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
            },
            UserId: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            pref_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            pref_key: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            pref_value: {
                type: DataTypes.ARRAY(DataTypes.STRING),
            },
            pref_operator: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: User_Preference.name,
            tableName: 'um_user_preferences',
            paranoid: true,
            timestamps: true,
        }
    );

    return User_Preference;
};
