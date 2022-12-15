'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class bp_entity_type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // static associate(models) {
        // define association here
        // }
    }
    bp_entity_type.init(
        {
            bp_entity_type_id: DataTypes.UUID,
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
            modelName: bp_entity_type.name,
            tableName: 'bp_entity_type',
            timestamps: false,
        }
    );
    return bp_entity_type;
};
