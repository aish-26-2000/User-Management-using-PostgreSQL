const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Business_Address extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            Business_Address.hasMany(model.Business_Other_Addr, { foreignKey: 'address_id' });
            Business_Address.belongsTo(model.bt_zipcodes, { foreignKey: 'zipcodes_id' });
        }
    }
    Business_Address.init(
        {
            bt_address_id: {
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            address_id: {
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
            address1: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address2: {
                type: DataTypes.STRING,
            },
            zipcodes_id: {
                type: DataTypes.BIGINT,
            },
            street_no: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: Business_Address.name,
            tableName: 'bt_address',
            paranoid: true,
            timestamps: true,
        }
    );

    return Business_Address;
};
