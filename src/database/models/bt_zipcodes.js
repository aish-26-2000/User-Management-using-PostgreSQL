'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class bt_zipcodes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            bt_zipcodes.hasMany(models.Business_Address, { foreignKey: 'zipcodes_id' });
        }
    }
    bt_zipcodes.init(
        {
            bt_zipcodes_id: DataTypes.UUID,
            isactive: DataTypes.STRING,
            created: DataTypes.DATE,
            createdby: DataTypes.STRING,
            updated: DataTypes.DATE,
            updatedby: DataTypes.STRING,
            zipcode: DataTypes.STRING,
            bt_country_id: DataTypes.UUID,
            city: DataTypes.STRING,
            county: DataTypes.STRING,
            bt_region_id: DataTypes.UUID,
        },
        {
            sequelize,
            modelName: bt_zipcodes.name,
            tableName: 'bt_zipcodes',
            timestamps: false,
        }
    );
    return bt_zipcodes;
};
