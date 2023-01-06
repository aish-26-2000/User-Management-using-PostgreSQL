const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Business_License extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            Business_License.belongsTo(model.Business, { foreignKey: 'business_id' });
            Business_License.belongsTo(model.bp_license_type, { foreignKey: 'license_type_id' });
            Business_License.belongsTo(model.bt_region, { foreignKey: 'bp_license_state_bt_region_id' });
        }
    }
    Business_License.init(
        {
            bp_business_license_id: {
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            business_license_id: {
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
            business_id: {
                type: DataTypes.BIGINT,
            },
            license_no: {
                type: DataTypes.STRING,
            },
            license_type_id: {
                type: DataTypes.BIGINT,
            },
            license_type_comment: {
                type: DataTypes.STRING,
            },
            bp_license_state_bt_region_id: {
                type: DataTypes.BIGINT,
            },
        },
        {
            sequelize,
            modelName: Business_License.name,
            tableName: 'bp_business_license',
            paranoid: true,
            timestamps: true,
        }
    );

    return Business_License;
};
