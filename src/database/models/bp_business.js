const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Business extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            Business.hasMany(model.Business_Stage_Status, { foreignKey: 'business_id' });
            Business.hasMany(model.Business_User_Assoc, { foreignKey: 'business_id' });
            Business.hasMany(model.Business_License, { foreignKey: 'business_id' });
            Business.hasMany(model.Business_Phone, { foreignKey: 'business_id' });
            Business.hasMany(model.Business_Other_Addr, { foreignKey: 'business_id' });
            Business.belongsTo(model.bt_region, { foreignKey: 'incorp_state_bt_region_id' });
            Business.hasMany(model.User_Role, { foreignKey: 'business_id' });
        }
    }
    Business.init(
        {
            bp_business_id: {
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            business_id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.BIGINT,
            },
            bp_group_shortcode: {
                type: DataTypes.ENUM('MEMBZ', 'MEMFI'),
                allowNull: false,
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
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            dba: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            incorp_state_bt_region_id: {
                type: DataTypes.BIGINT,
            },
            is_approved: {
                type: DataTypes.ENUM('Y', 'N'),
                defaultValue: 'N',
            },
            is_approved_vendor: {
                type: DataTypes.ENUM('Y', 'N'),
                defaultValue: 'N',
            },
            is_cannabis_business: {
                type: DataTypes.ENUM('Y', 'N'),
                defaultValue: 'Y',
            },
            is_createdby_stdc: {
                type: DataTypes.ENUM('Y', 'N'),
                defaultValue: 'N',
            },
        },
        {
            sequelize,
            modelName: Business.name,
            tableName: 'bp_business',
            paranoid: true,
            timestamps: true,
        }
    );

    return Business;
};
