'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class bt_region extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // static associate(models) {
        // define association here
        // bt_region.belongsTo(models.bt_country, { foreignKey: 'bt_country_id' });
        // }
    }
    bt_region.init(
        {
            bt_region_id: DataTypes.UUID,
            isactive: DataTypes.STRING,
            name: DataTypes.STRING,
            created: DataTypes.DATE,
            createdby: DataTypes.STRING,
            updated: DataTypes.DATE,
            updatedby: DataTypes.STRING,
            bt_country_id: DataTypes.UUID,
            short_name: DataTypes.STRING,
            sequenceno: DataTypes.INTEGER,
            is_supported: DataTypes.STRING,
            is_license_internal_search: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: bt_region.name,
            tableName: 'bt_region',
            timestamps: false,
        }
    );
    return bt_region;
};
