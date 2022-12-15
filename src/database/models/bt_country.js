'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class bt_country extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // static associate(models) {
        // define association here
        // bt_country.hasMany(models.bt_region, { foreignKey: 'bt_country_id' });
        // }
    }
    bt_country.init(
        {
            bt_country_id: DataTypes.UUID,
            isactive: DataTypes.STRING,
            name: DataTypes.STRING,
            created: DataTypes.DATE,
            createdby: DataTypes.STRING,
            updated: DataTypes.DATE,
            updatedby: DataTypes.STRING,
            short_name: DataTypes.STRING,
            sequenceno: DataTypes.INTEGER,
            is_supported: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: bt_country.name,
            tableName: 'bt_country',
            timestamps: false,
        }
    );
    return bt_country;
};
