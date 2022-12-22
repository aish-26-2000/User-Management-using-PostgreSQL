const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Business_Phone extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            Business_Phone.belongsTo(model.Business, { foreignKey: 'business_id' });
            Business_Phone.belongsTo(model.bt_phone_type, { foreignKey: 'phone_type_id' });
        }
    }
    Business_Phone.init(
        {
            bp_business_phone_id: {
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            business_phone_id: {
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
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            business_id: {
                type: DataTypes.BIGINT,
            },
            phone_type_id: {
                type: DataTypes.BIGINT,
            },
        },
        {
            sequelize,
            modelName: Business_Phone.name,
            tableName: 'bp_business_phone',
            paranoid: true,
            timestamps: true,
        }
    );

    return Business_Phone;
};
