'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class bp_license_type_desig extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // static associate(models) {
        // define association here
        // }
    }
    bp_license_type_desig.init(
        {
            bp_license_type_desig_id: DataTypes.UUID,
            isactive: DataTypes.STRING,
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            created: DataTypes.DATE,
            createdby: DataTypes.STRING,
            updated: DataTypes.DATE,
            updatedby: DataTypes.STRING,
            shortcode: DataTypes.STRING,
            sequenceno: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: bp_license_type_desig.name,
            tableName: 'bp_license_type_desig',
            timestamps: false,
        }
    );
    return bp_license_type_desig;
};
