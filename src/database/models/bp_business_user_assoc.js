const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Business_User_Assoc extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            Business_User_Assoc.belongsTo(model.bp_user_association, { foreignKey: 'user_assoc_id' });
            Business_User_Assoc.belongsTo(model.Business, { foreignKey: 'business_id' });
            Business_User_Assoc.belongsTo(model.User, { foreignKey: 'UserId' });
            Business_User_Assoc.belongsTo(model.bp_investor_type, { foreignKey: 'investor_type_id' });
        }
    }
    Business_User_Assoc.init(
        {
            bp_business_user_assoc_id: {
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            business_user_assoc_id: {
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
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ownership_percent: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            UserId: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            business_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            investor_type_id: {
                type: DataTypes.BIGINT,
            },
            investor_type_comment: {
                type: DataTypes.STRING,
            },
            user_assoc_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            is_contact_person: {
                type: DataTypes.STRING,
                defaultValue: 'N',
            },
        },
        {
            sequelize,
            modelName: Business_User_Assoc.name,
            tableName: 'bp_business_user_assoc',
            paranoid: true,
            timestamps: true,
        }
    );

    return Business_User_Assoc;
};
