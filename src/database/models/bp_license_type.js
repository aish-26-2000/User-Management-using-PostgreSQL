'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class bp_license_type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            bp_license_type.hasMany(models.Business_License, { foreignKey: 'license_type_id' });
        }
    }
    bp_license_type.init(
        {
            bp_license_type_id: DataTypes.UUID,
            isactive: DataTypes.STRING,
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            created: DataTypes.DATE,
            createdby: DataTypes.STRING,
            updated: DataTypes.DATE,
            updatedby: DataTypes.STRING,
            shortcode: DataTypes.STRING,
            sequenceno: DataTypes.INTEGER,
            is_accredited: DataTypes.STRING,
            keyword: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: bp_license_type.name,
            tableName: 'bp_license_type',
            timestamps: false,
        }
    );
    return bp_license_type;
};
