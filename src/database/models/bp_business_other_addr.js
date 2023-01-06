const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Business_Other_Addr extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            Business_Other_Addr.belongsTo(model.Business_Address, { foreignKey: 'address_id' });
            Business_Other_Addr.belongsTo(model.Business, { foreignKey: 'business_id' });
        }
    }
    Business_Other_Addr.init(
        {
            bp_business_other_addr_id: {
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            business_other_addr_id: {
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
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            business_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            address_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
        },
        {
            sequelize,
            modelName: Business_Other_Addr.name,
            tableName: 'bp_business_other_addr',
            paranoid: true,
            timestamps: true,
        }
    );

    return Business_Other_Addr;
};
